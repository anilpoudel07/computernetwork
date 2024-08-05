## Q) Capture an ID packet on wireshark. What is the value of each of the header fields ? Explain why the value is what it is .

## -> Version: IPv4 (indicated by “0100”)

The version field indicates the version of the IP protocol. The value 4 indicates that this is an IPv4 packet.

## -> Header Length: 20 bytes (5 words)

Indicates that the length of header in IPV4 is of 20 bytes.

## -> Differentiated Services Field: DSCP: AF41, ECN: Not-ECT 0x000

ECN (Explicit Congestion Notification): Not-ECT
This indicates whether the packet is capable of using ECN for congestion control. Not-ECT means the packet is not using ECN.

## -> Total Length: 40 bytes

This field specifies the total length of the IP packet, including both the header and the data. Here, the total length is 40 bytes.

## -> Identification: 0x43b6 (17334) (fragment identification)

This field is used to uniquely identify the fragments of an original IP packet. In this case, the identification value is 0x43b6.

## -> Flags: Don’t fragment (DF)

This field contains control flags. The Don’t Fragment (DF) flag, when set, indicates that the packet should not be fragmented. If a router cannot forward the packet without fragmenting it, the packet will be dropped.

## -> Fragment Offset: 0

This field is used to indicate the position of a fragment in the original packet. Since the offset is 0, it means this packet is not fragmented.

## -> Time to Live (TTL): 56

This field specifies the maximum number of hops (routers) that the packet can pass through before being discarded. It is used to prevent packets from circulating indefinitely. The initial value is set by the sender, and each router that forwards the packet decreases the TTL by one. Here, the TTL is set to 56.

## -> Protocol: TCP (6)

This field indicates the protocol used in the data portion of the IP packet. The value 6 corresponds to the TCP (Transmission Control Protocol).

## -> Header Checksum: 0x7253 (with validation disabled)

This field is used for error-checking the header. The checksum ensures that the header's data has not been corrupted during transmission. The value 0x7253  is the computed checksum for the header, although it is mentioned that validation is disabled in this case.

## -> Source Address: 192.168.1.254

This is the IP address of the device that sent the packet.

## -> Destination Address: 192.168.1.72

This is the IP address of the device that is supposed to receive the packet.
