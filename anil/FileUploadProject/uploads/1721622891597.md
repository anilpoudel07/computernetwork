## QN) How many byte is IPV6 header and Describe all it's field ?

## -> The IPv6 header is 40 bytes long and consists of eight fields. Let’s delve into each field:

## ->  Version (4 bits): Always set to 6 for IPv6, indicating the protocol version.

## -> Traffic Class (8 bits): Similar to the IPv4 Type of Service field, it prioritizes packets for routers. It helps manage traffic based on priority.


## -> Flow Label (20 bits): Used to label packets belonging to the same flow, allowing for special handling by intermediate routers.

## -> Payload Length (16 bits): Specifies the total payload length in bytes, including extension headers.
## -> Next Header: Indicates the type of the first extension header.
## -> Hop Limit: Limits the number of hops a packet can traverse.
## -> Source Address: The sender’s IPv6 address.
## -> Destination Address: The recipient’s IPv6 address.
