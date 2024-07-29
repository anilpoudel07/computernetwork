# TCP Packet Analysis

## Questions
- In the programming language of your choice, write a web application that allows you to upload a file.
- Capture traffic in Wireshark while uploading a file. Follow the TCP stream and explain connection initialization, connection maintenance, and connection termination.

## Tasks Done
### 1. Made a simple PNG uploader in Go
- Captured the TCP Streams while uploading the file in `WIRESHARK`
- Understood the TCP `Connection-Initialization`, `Connection-Maintenance`, and `Connection-Termination`
- Captured the TCP Packets in `WIRESHARK`

### 2. Made a simple TCPClient to understand TCP in `GO` for `FUN`
- To run TCPClient on your local machine, just read the `README` in the TCPClient directory

## TCP Packet Analysis

This is my explanation of the TCP packet capture file and the analysis of the connection initialization, maintenance, and termination processes. The capture file was analyzed using Wireshark, and the key steps and packets involved in these processes are outlined below. Please note that here I have only highlighted the request-response cycle of client and server with SYN number. Here `SYN`, `SYN-ACK`, `ACK` have the major role in depicting the `TCP connection`. There might be some technical errors since I'm a noobie. Just ignore the errors.

## Overview

The TCP packet capture file contains packets exchanged between a client and a server. There are mainly 3 steps involved in TCP:
1. Connection Initialization
2. Connection Maintenance
3. Connection Termination

## 1. Connection Initialization

This is the initial step where a TCP connection is established between a client and a server. It involves a handshake procedure known as the **three-way handshake**.

**Packets Involved:**
- **SYN Packet**: The client (source port 50666) initiates the connection by sending a SYN packet to the server (destination port 5500).
  - `No. 13 - 50666 → 5500 [SYN] Seq=0 Win=65535 Len=0 MSS=65495 WS=256 SACK_PERM`

- **SYN-ACK Packet**: The server responds with a SYN-ACK packet, acknowledging the SYN request and sending its own SYN to the client.
  - `No. 14 - 5500 → 50666 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0 MSS=65495 WS=256 SACK_PERM`

- **ACK Packet**: The client acknowledges the server’s response with an ACK packet.
  - `No. 15 - 50666 → 5500 [ACK] Seq=1 Ack=1 Win=327424 Len=0`

## 2. Connection Maintenance

Once the connection is established, data can be transferred between the client and server. This phase includes sending and receiving data packets, maintaining the connection’s state.

**Packets Involved:**
- **Data Transfer**: Actual data being transferred between the client and server.
  - `No. 17 - 50666 → 5500 [ACK] Seq=1 Ack=531 Win=2160640 Len=0`
  - `No. 18 - 50666 → 5500 [ACK] Seq=531 Ack=130 Win=327168 Len=0`
  - `No. 434 - 50666 → 5500 [ACK] Seq=141 Ack=539 Win=327168 Len=0`
  - `No. 436 - 5500 → 50666 [ACK] Seq=539 Ack=141 Win=327168 Len=0`

- **HTTP Requests and Responses**: Exchange of HTTP requests and responses.
  - `No. 56 - POST /upload HTTP/1.1 (PNG)`
  - `No. 58 - HTTP/1.1 200 OK (text/plain)`

## 3. Connection Termination

When the data transfer is complete, the connection is closed using a termination procedure known as the **four-way handshake**.

**Packets Involved:**
- **FIN Packet**: One side initiates the connection termination by sending a FIN (Finish) packet.
  - `No. 437 - 50666 → 5500 [FIN, ACK] Seq=539 Ack=141 Win=327168 Len=0`

- **ACK Packet**: The other side acknowledges the FIN packet with an ACK.
  - `No. 438 - 5500 → 50666 [ACK] Seq=141 Ack=540 Win=327168 Len=0`

- **FIN Packet**: The other side sends its own FIN packet to complete the termination process.
  - `No. 439 - 5500 → 50666 [FIN, ACK] Seq=141 Ack=540 Win=327168 Len=0`

- **Final ACK**: The initial side acknowledges the final FIN packet.
  - `No. 440 - 50666 → 5500 [ACK] Seq=540 Ack=145 Win=327168 Len=0`

### Note: The sequence (SEQ) and acknowledgment (ACK) numbers in TCP packets are incremented accordingly to ensure reliable and ordered data transmission. This is the underlying principle of TCP.



      
      
 
