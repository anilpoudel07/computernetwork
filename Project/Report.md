## What happens when you type google.com into your browser's address box and press enter?

### Application Layer (Layer 7)

1. **URL Parsing**: When you type `google.com` into the browser and press enter, the browser parses the URL to identify the protocol (`http` or `https`), the domain name (`google.com`), and the path (if any).
2. **DNS Query**:
   - **Cache Check**: The browser first checks its local cache for a DNS record of `google.com`.
   - **Operating System Cache**: If not found, the browser queries the OS cache.
   - **Router Cache**: If still not found, the query is sent to the local router, which may have its own DNS cache.
   - **ISP DNS Server**: The router forwards the query to the ISP’s DNS server.
   - **Recursive Query**: If the ISP’s DNS server doesn’t have the record, it performs a recursive query, querying other DNS servers (root, TLD, authoritative servers) to resolve the domain to an IP address (e.g., 172.217.16.206).

### Presentation Layer (Layer 6)

- **SSL/TLS Handshake**: For an HTTPS request:
  - **ClientHello**: The browser sends a `ClientHello` message to the Google server, proposing SSL/TLS version and cipher suites.
  - **ServerHello**: The server responds with a `ServerHello` message, selecting the SSL/TLS version and cipher suite.
  - **Certificate**: The server sends its digital certificate to the browser for verification.
  - **Key Exchange**: Both parties exchange keys to establish a secure encrypted connection.
  - **Finished**: Both parties send a `Finished` message to confirm the handshake is complete, and encrypted communication begins.

### Session Layer (Layer 5)

- **Session Management**: Manages the sessions between the browser and server. This includes setting up the session, maintaining it, and tearing it down after the communication ends.

### Transport Layer (Layer 4)

- **TCP Connection**:
  - **Three-Way Handshake**: To establish a connection:
    - **SYN**: The browser sends a SYN packet to the Google server.
    - **SYN-ACK**: The server responds with a SYN-ACK packet.
    - **ACK**: The browser sends an ACK packet, establishing the connection.
  - **Port Numbers**: The browser typically uses a random ephemeral port, while the server listens on port 80 (HTTP) or 443 (HTTPS).

### Network Layer (Layer 3)

- **IP Addressing and Routing**:
  - **Packet Creation**: The browser encapsulates the data into IP packets with the source and destination IP addresses.
  - **Routing**: Routers along the path read the IP address, determine the best route using routing tables, and forward the packets to the destination.

### Data Link Layer (Layer 2)

- **Framing and MAC Addressing**:
  - **Frame Creation**: Each packet is encapsulated into frames with source and destination MAC addresses.
  - **Switching**: Switches use MAC addresses to forward frames within the local network.

### Physical Layer (Layer 1)

- **Transmission**:
  - **Signal Conversion**: Data is converted into electrical signals (over Ethernet), optical signals (over fiber), or radio signals (over Wi-Fi).
  - **Transmission**: These signals are transmitted over the physical medium to the next network device.

### Detailed Network Flow Example:

1. **DNS Resolution**:

   - **Browser Cache**: Check if `google.com` is cached.
   - **OS Cache**: Check the local host file or OS DNS cache.
   - **Router Cache**: Check the router’s DNS cache.
   - **ISP DNS Server**: Query the ISP’s DNS server.
   - **Recursive Query**: If necessary, query root DNS servers, TLD DNS servers, and finally, the authoritative DNS server for `google.com`.

2. **TCP Three-Way Handshake**:

   - **SYN**: Source: Client IP, Source Port: Ephemeral; Destination: Google IP, Destination Port: 443 (HTTPS).
   - **SYN-ACK**: Source: Google IP, Source Port: 443; Destination: Client IP, Destination Port: Ephemeral.
   - **ACK**: Source: Client IP, Source Port: Ephemeral; Destination: Google IP, Destination Port: 443.

3. **SSL/TLS Handshake**:

   - **ClientHello**: Source: Client IP, Source Port: Ephemeral; Destination: Google IP, Destination Port: 443.
   - **ServerHello**: Source: Google IP, Source Port: 443; Destination: Client IP, Destination Port: Ephemeral.
   - **Certificate**: Source: Google IP, Source Port: 443; Destination: Client IP, Destination Port: Ephemeral.
   - **Key Exchange**: Secure key exchange mechanisms.
   - **Finished**: Both parties confirm the handshake.

4. **HTTP Request**:

   - **GET Request**: `GET / HTTP/1.1 Host: google.com`.

5. **Server Processing**:

   - **Web Server**: Receives the request, processes it, and queries any necessary backend systems.
   - **Response**: Generates the HTTP response.

6. **HTTP Response**:
   - **Response Packets**: Sent back to the client.
   - **Reassembly**: Browser reassembles the packets.
   - **Rendering**: Browser renders the webpage.

By understanding each of these layers and steps, you get a comprehensive view of what happens behind the scenes when you type `google.com` into your browser and press enter.
