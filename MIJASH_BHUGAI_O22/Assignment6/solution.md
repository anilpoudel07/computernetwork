# IPv6 Header Structure

The IPv6 header is 40 bytes in length and consists of the following fields:

- **Version (4 bits)**
- **Traffic Class (8 bits)**
- **Flow Label (20 bits)**
- **Payload Length (16 bits)**
- **Next Header (8 bits)**
- **Hop Limit (8 bits)**
- **Source Address (128 bits)**
- **Destination Address (128 bits)**

## Field Descriptions

### a) Version (4 bits)
- **Purpose**: Indicates the version of the Internet Protocol in use.
- **Value for IPv6**: `0110`
- **Comparison**: IPv4 uses `0100`.

### b) Traffic Class (8 bits)
- **Purpose**: Used to differentiate and prioritize packets for Quality of Service (QoS).
- **Structure**:
  - **Differentiated Services (DS) field (6 bits)**: Classifies packets for priority and QoS.
  - **Explicit Congestion Notification (ECN) field (2 bits)**: Provides feedback on network congestion to the sender.

### c) Flow Label (20 bits)
- **Purpose**: Identifies and manages packets belonging to the same flow for special handling, such as reduced latency or increased bandwidth.
- **Use Case**: Essential for real-time applications like VoIP, online gaming, and video conferencing.

### d) Payload Length (16 bits)
- **Purpose**: Specifies the length of the payload (data and extension headers) in the IPv6 packet.
- **Measurement**: Length is given in bytes.

### e) Next Header (8 bits)
- **Purpose**: Indicates the type of the next header following the IPv6 header, which can be a transport layer protocol (such as TCP or UDP) or an extension header.
- **Function**: Allows correct processing of the packet by subsequent protocols or headers.

### f) Hop Limit (8 bits)
- **Purpose**: Limits the number of routers (hops) a packet can pass through.
- **Mechanism**: Each router decrements this value by 1. When the value reaches zero, the packet is discarded to prevent infinite loops.

### g) Source Address (128 bits)
- **Purpose**: Contains the IPv6 address of the packet's originator.
- **Function**: Specifies where the packet is coming from.

### h) Destination Address (128 bits)
- **Purpose**: Contains the IPv6 address of the intended recipient of the packet.
- **Function**: Specifies where the packet is going.

