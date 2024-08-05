from heapq import heappop, heappush
from typing import List

class Solution:
    def minimumEffortPath(self, heights: List[List[int]]) -> int:
        # Number of rows and columns
        n = len(heights)
        m = len(heights[0])

        # Priority queue for Dijkstra's algorithm, using a min-heap.
        pq = []
        heappush(pq, (0, 0, 0))  # (effort, x, y)

        # 2D list to store minimum effort to reach each cell, initialized with large values.
        dis = [[float('inf')] * m for _ in range(n)]
        dis[0][0] = 0

        # Directions for moving in the grid: up, down, left, right.
        directions = [(-1, 0), (1, 0), (0, 1), (0, -1)]

        while pq:
            diff, x, y = heappop(pq)

            # If we reached the bottom-right corner, return the effort.
            if x == n - 1 and y == m - 1:
                return diff

            # Explore all four possible directions.
            for dx, dy in directions:
                newx, newy = x + dx, y + dy

                # Check if the new position is within bounds.
                if 0 <= newx < n and 0 <= newy < m:
                    # Calculate the effort required to move to the new cell.
                    w = max(abs(heights[x][y] - heights[newx][newy]), diff)

                    # If the new effort is less than the previously recorded effort, update and push to the queue.
                    if w < dis[newx][newy]:
                        dis[newx][newy] = w
                        heappush(pq, (w, newx, newy))

        return 0
