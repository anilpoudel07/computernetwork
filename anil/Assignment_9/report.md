# URL Handling and Hostname Conversion

## Explanation

### Is it a URL or a Search Term?

When you type something into a web browser's address bar, the browser needs to determine whether you are entering a URL (Uniform Resource Locator) or a search term. 

1. **Default Web Search Engine**:
    - If no protocol (like `http://` or `https://`) or a valid domain name is given, the browser assumes you might be entering a search term rather than a URL.
    - The browser then sends this text to its default web search engine (e.g., Google, Bing).
    - Often, a special piece of text is appended to the search query to indicate that the search originated from the browser's URL bar.

### Convert Non-ASCII Unicode Characters in the Hostname

When dealing with URLs, the browser checks the hostname (the part of the URL that specifies the domain, like `facebook.com`) for characters that fall outside the basic ASCII character set:

- **Valid Characters in Hostnames**:
    - ASCII letters (`a-z`, `A-Z`)
    - Digits (`0-9`)
    - Hyphens (`-`)
    - Dots (`.`)

- **Punycode Encoding**:
    - If the hostname contains any characters outside this set (non-ASCII Unicode characters), the browser uses Punycode encoding to convert these characters.
    - Punycode is a way to represent Unicode with the limited character subset of ASCII supported by the Domain Name System (DNS).
    - This ensures that internationalized domain names (IDNs) can be correctly interpreted and accessed by the DNS.

For example, if your enter a domain `bücher.de` , PunyCode convert into `xn--bcher-kva.de`, the browser will convert this to its Punycode equivalent to ensure proper handling.

### Example Scenario

- **Scenario**: You type `example.com` into the address bar.
    - The browser sees that `example.com` is a valid domain and tries to access it directly.
- **Scenario**: You type `search term` into the address bar.
    - The browser does not recognize a valid domain or protocol and sends the term to the default search engine.
- **Scenario**: You type `münchen.de` into the address bar.
    - The browser detects non-ASCII characters (`ü`) and converts `münchen.de` to its Punycode equivalent before processing.

This explanation provides a detailed understanding of how browsers handle URL entries and convert non-ASCII characters in hostnames.

# Understanding HSTS and the Preloaded HSTS List

## Explanation

### What is HSTS?

HTTP Strict Transport Security (HSTS) is a web security policy mechanism that helps to protect websites against certain types of attacks, such as protocol downgrade attacks and cookie hijacking. HSTS ensures that browsers only communicate with the server over HTTPS, not HTTP.

### Preloaded HSTS List

Modern web browsers include a "preloaded HSTS list," which is a list of websites that have requested to always be contacted via HTTPS. This list helps to enforce the use of HTTPS from the first connection, providing additional security.

### How It Works

1. **Browser Checks the HSTS List**:
   - When a user enters a URL, the browser first checks its preloaded HSTS list.
   - This list contains websites that have explicitly requested to be contacted via HTTPS only.

2. **HTTPS Request**:
   - If the website is in the HSTS list, the browser automatically sends the request via HTTPS.
   - If the website is not in the list, the initial request is sent via HTTP.

3. **HSTS Policy Without Preloading**:
   - Websites not in the HSTS list can still use the HSTS policy.
   - The first HTTP request to such a website will receive a response that instructs the browser to use HTTPS for future requests.
   - However, this initial HTTP request can leave the user vulnerable to a downgrade attack, which is why the preloaded HSTS list is beneficial.

### Example Scenario

1. **Website in HSTS List**:
   - User enters `facebook.com`.
   - Browser checks the HSTS list and finds `facebook.com`.
   - Browser sends the request via HTTPS: `https://facebook.com`.

2. **Website Not in HSTS List**:
   - User enters `newsite.com`.
   - Browser does not find `newsite.com` in the HSTS list.
   - Browser sends the initial request via HTTP: `http://newsite.com`.
   - The server responds with an HSTS header, instructing the browser to use HTTPS for future requests.

### Why HSTS List Matters

- **Security**: The preloaded HSTS list helps protect users by ensuring the first connection to a website is secure.
- **Mitigation of Attacks**: It mitigates the risk of downgrade attacks and other types of attacks that exploit the initial insecure connection.

### DNS lookup
- When a browser needs to resolve a domain name into an IP address, it follows a specific process. Here's a detailed breakdown:


**Browser Cache Check:**

-The browser first checks if the domain is in its cache.
To see the DNS Cache in Chrome, go to chrome://net-internals/#dns.


**gethostbyname Library Function:**

If the domain is not found in the browser cache, the browser calls the gethostbyname library function (which varies by OS) to do the lookup.

**Hosts File Check:**

gethostbyname checks if the hostname can be resolved by reference in the local hosts file (whose location varies by OS) before trying to resolve the hostname through DNS.

**DNS Server Request:**

If gethostbyname does not have it cached nor can find it in the hosts file, it makes a request to the DNS server configured in the network stack. This is typically the local router or the ISP's caching DNS server.

**ARP Process for DNS Server:**

If the DNS server is on the same subnet, the network library follows the ARP process for the DNS server.

**ARP Process for Default Gateway:**

If the DNS server is on a different subnet, the network library follows the ARP process for the default gateway IP.


### ARP Process and DNS Lookup Continuation


 **ARP (Address Resolution Protocol) Process**
 
In order to send an ARP (Address Resolution Protocol) broadcast, the network stack library needs the target IP address to lookup. It also needs to know the MAC address of the interface it will use to send out the ARP broadcast.

### **ARP Cache Check

**ARP Cache Lookup:

The ARP cache is first checked for an ARP entry for the target IP.
If it is in the cache, the library function returns the result: Target IP = MAC.

**Route Table Lookup:**

If the entry is not in the ARP cache:
The route table is looked up to see if the target IP address is on any of the subnets on the local route table.
If it is, the library uses the interface associated with that subnet.
If it is not, the library uses the interface that has the subnet of the default gateway.

**MAC Address Lookup:**

The MAC address of the selected network interface is looked up.

**ARP Request**

The network library sends a Layer 2 (data link layer of the OSI model) ARP request:

**ARP Request Format:**

Sender MAC: interface:mac:address:here
Sender IP: interface.ip.goes.here
Target MAC: FF:FF:FF:FF:FF:FF (Broadcast)
Target IP: target.ip.goes.here
Handling ARP Requests
Directly Connected:

If the computer is directly connected to the router, the router responds with an ARP Reply.

**Hub:**

If the computer is connected to a hub, the hub will broadcast the ARP request out of all other ports. If the router is connected on the same "wire", it will respond with an ARP Reply.

**Switch:**

If the computer is connected to a switch, the switch will check its local CAM/MAC table to see which port has the MAC address we are looking for.
If the switch has no entry for the MAC address, it will rebroadcast the ARP request to all other ports.
If the switch has an entry in the MAC/CAM table, it will send the ARP request to the port that has the MAC address we are looking for.
If the router is on the same "wire", it will respond with an ARP Reply.

ARP Reply
ARP Reply Format:
Sender MAC: target:mac:address:here
Sender IP: target.ip.goes.here
Target MAC: interface:mac:address:here
Target IP: interface.ip.goes.here
DNS Process Continuation
Now that the network library has the MAC address of either the DNS server or the default gateway, it can resume its DNS process:

**Establish Socket to DNS Server:**

The DNS client establishes a socket to UDP port 53 on the DNS server, using a source port above 1023.
Handle Large Responses:

If the response size is too large, TCP will be used instead.

**Recursive Search:**

If the local/ISP DNS server does not have the answer, a recursive search is requested, and that request flows up the hierarchy of DNS servers until the SOA (Start of Authority) is reached. If found, an answer is returned.

### Opening a Socket and TCP Connection

Once the browser receives the IP address of the destination server, it initiates a TCP connection by opening a socket. Here's a summary of the process:

### **Opening a Socket**

**Socket Creation:**

The browser calls the system library function socket to request a TCP socket stream.
Parameters: AF_INET/AF_INET6 for IP address family and SOCK_STREAM for TCP.

**Transport Layer:**

A TCP segment is created with the destination port (e.g., port 80 for HTTP, port 443 for HTTPS).
The source port is chosen from the kernel's dynamic port range.


**Network Layer:**

The segment is wrapped in an IP header with both the source and destination IP addresses to form a packet.

**Link Layer:**

A frame header is added with the MAC addresses of the source machine and the local router (gateway).
If the MAC address of the gateway is unknown, an ARP query is broadcasted.

**Transmission:**

The packet is transmitted through various mediums:
**Ethernet**
**WiFi**
**Cellular data network**
For home or small business connections, the packet may pass through a modem that converts digital signals to analog for transmission.
For businesses or newer connections, data may remain digital and pass directly to the next network node.

**Routing:**

The packet travels through routers and autonomous system (AS) border routers.
Each router extracts the destination address and forwards the packet to the next hop.
The TTL (Time to Live) field is decremented by one at each router. The packet is dropped if TTL reaches zero or if the router’s queue is full.
### **TCP Connection Flow**

**Connection Establishment:**

SYN: The client sends a packet with the SYN flag set and an initial sequence number (ISN).
SYN-ACK: The server responds with its own ISN, and both SYN and ACK flags set.
ACK: The client acknowledges the server’s response with an ACK flag set.

**Data Transfer:**

Data is sent in packets with sequence numbers (SEQ).
The receiving side acknowledges packets with ACK values corresponding to the last received sequence number.

**Connection Termination:**

FIN: The side closing the connection sends a FIN packet.
ACK-FIN: The other side acknowledges the FIN packet and sends its own FIN.
Final ACK: The initial closer acknowledges the second FIN with an ACK.




### TLS Handshake Process

The TLS (Transport Layer Security) handshake establishes a secure connection between a client and a server. Here’s a step-by-step summary of the TLS handshake:

## **1. ClientHello**

**Client Sends:**

A ClientHello message to the server.
Includes:
TLS version supported
List of cipher algorithms available
List of compression methods supported

## **2. ServerHello**

**Server Replies:** 

A ServerHello message to the client.
Includes:
. TLS version selected
. List Cipher algorithm Compression
. List of comppression  methods selected
. Server’s public certificate signed by a Certificate Authority (CA)



**The certificate contains a public key used by the client to encrypt further handshake communications.**
## 3. Certificate Verification


## **Client Verifies:**
The server’s digital certificate against its list of trusted CAs.
If trusted, the client generates a string of pseudo-random bytes.
 ## **4. Key Exchange**


**Client Encrypts:**
The random bytes with the server's public key.
Server Decrypts:
The random bytes using its private key.
Uses these bytes to generate the symmetric master key for encryption.

## **5. Finished Messages**

**Client Sends:**

A Finished message encrypted with the symmetric key.
Includes a hash of the transmission up to this point.

**Server Verifies:**

The client’s hash by generating its own hash and decrypting the client’s hash.
If hashes match, the server sends its own Finished message to the client, also encrypted with the symmetric key.


**6. Secure Data Transmission**
Data Encryption:
From this point, the TLS session transmits application (HTTP) data encrypted with the agreed symmetric key.



### if Packet is dropped ?
**Sometimes due to the network congestion ,TLS packet is dropped before the final destination .Then sender has to decide how to react .This 
is done by TLS algorithm

### TCP Congestion Conrol

## **Common Algorithms**

**Cubic**: Used in newer operating systems for managing congestion.
**New Reno**: Widely used in various systems, especially older ones.

## **Congestion Window Management**

**Initialization**:

The client determines a congestion window size based on the Maximum Segment Size (MSS) of the connection.

**Slow-Start Phase:**

For each packet acknowledged, the congestion window size doubles until it reaches a threshold known as the 'slow-start threshold'. This threshold may be adaptive in some implementations.

**Congestion Avoidance Phase**:

After reaching the slow-start threshold, the congestion window increases linearly (additively) for each packet acknowledged.
Packet Loss Handling:

If a packet is dropped, the congestion window size reduces exponentially. It will only increase again when subsequent packets are acknowledged.


