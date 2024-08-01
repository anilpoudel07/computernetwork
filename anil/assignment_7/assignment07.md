## 1. What is the size of UDP header?

Size of UDP header is 8 bytes(64 bits).

The different fields are:

a. **Source Port**: The 16-bit number used to identify the sender's port. This is necessary for the recipient to know where to send a response, if needed.

b. **Destination Port**: The 16-bit number specifying the recipient's port, directing the datagram to the correct application.

c. **Length**: The length of the entire UDP datagram (header + data) in bytes. This value helps the receiver know where the datagram ends.

d. **Checksum**: A 16-bit checksum value computed over the entire datagram plus a pseudo-header of fields from the IP header. This helps in detecting errors in the header and data.

## 2. What is the size of TCP header?

Size of TCP header is minimum of 20 bytes and maximum of 60 bytes.

The different fields are:
a. **Source Port** (16 bits):

This field specifies the port number of the application on the sending device.

b. **Destination Port** (16 bits):

This field specifies the port number of the application on the receiving device.

c. **Sequence Number** (32 bits):

This field indicates the sequence number of the first byte of data in this segment. It is used for data ordering and ensuring that packets are received in the correct sequence.

d. **Acknowledgment Number** (32 bits):

This field contains the sequence number of the next byte that the sender of the segment is expecting to receive. It is used for acknowledging the receipt of data.

e. **Data Offset** (4 bits):

This field specifies the size of the TCP header in 32-bit words. The minimum value is 5, which corresponds to 20 bytes. This field indicates where the data begins.

f. **Reserved** (3 bits):

These bits are reserved for future use and must be set to zero.

g. **Flags** (9 bits):

1. NS (1 bit): ECN-nonce concealment protection.

2. CWR (1 bit): Congestion Window Reduced flag is set by the sending host to indicate that it received a TCP segment with the ECE flag set.

3. ECE (1 bit): ECN-Echo indicates that the TCP peer is ECN capable during the three-way handshake or that it has received a packet with a CE (Congestion Experienced) mark.

4. URG (1 bit): Urgent pointer field significant.

5. ACK (1 bit): Acknowledgment field significant.

6. PSH (1 bit): Push function.

7. RST (1 bit): Reset the connection.

8. SYN (1 bit): Synchronize sequence numbers (used to initiate a connection).

9. FIN (1 bit): No more data from sender (used to terminate a connection).

h. **Window Size** (16 bits):

This field specifies the size of the sender’s receive window, which is the amount of data (in bytes) that the sender is willing to accept. It is used for flow control.

i. **Checksum** (16 bits):

This field is used for error-checking the header and data. It is computed as the 16-bit one's complement of the one's complement sum of the TCP header, the payload, and a pseudo-header.

j. **Urgent Pointer** (16 bits):

This field is used if the URG flag is set. It indicates the end of the urgent data and is an offset from the sequence number.

k. **Options** (0 to 40 bytes):

This field can contain various options for extending the protocol, such as maximum segment size, window scale factor, and timestamps. The options field is variable in length and must end on a 32-bit boundary, which might require padding.

l. **Padding**:

This field is used to ensure that the TCP header ends on a 32-bit boundary. The padding is composed of zeros.
