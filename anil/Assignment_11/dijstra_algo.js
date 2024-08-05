function networkDelayTime(times, n, k) {
  // Create the adjacency list
  const graph = new Map();
  for (const [u, v, w] of times) {
    if (!graph.has(u)) graph.set(u, []);
    graph.get(u).push([v, w]);
  }

  // Initialize distances and priority queue
  const dist = Array(n + 1).fill(Infinity);
  dist[k] = 0;
  const minHeap = [[0, k]]; // [distance, node]

  while (minHeap.length > 0) {
    // Extract the node with the smallest distance
    const [currentDist, u] = minHeap.shift();

    // Skip if we have already found a shorter path
    if (currentDist > dist[u]) continue;

    // Update distances for neighbors
    if (graph.has(u)) {
      for (const [v, weight] of graph.get(u)) {
        const newDist = currentDist + weight;
        if (newDist < dist[v]) {
          dist[v] = newDist;
          minHeap.push([newDist, v]);
          // Maintain heap property
          minHeap.sort((a, b) => a[0] - b[0]);
        }
      }
    }
  }

  // Find the maximum distance
  const maxDist = Math.max(...dist.slice(1));

  // If any node is unreachable, return -1
  return maxDist === Infinity ? -1 : maxDist;
}

// Example usage
const times = [
  [2, 1, 1],
  [3, 1, 1],
  [1, 4, 2],
];
const n = 4;
const k = 2;
console.log(networkDelayTime(times, n, k)); // Output: 4
