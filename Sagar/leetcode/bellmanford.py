from typing import List
import sys

class Solution:
    def minimumEffortPath(self, heights: List[List[int]]) -> int:
        rows = len(heights)
        cols = len(heights[0])
        dp = [[sys.maxsize] * cols for _ in range(rows)]
        dir = [(0, 1), (1, 0), (0, -1), (-1, 0)]

        dp[0][0] = 0
        relax_atleast_one_edge = True

        for e in range(rows * cols - 1):
            if not relax_atleast_one_edge:
                break
            relax_atleast_one_edge = False

            for i in range(rows):
                for j in range(cols):
                    for d in dir:
                        new_i, new_j = i + d[0], j + d[1]

                        if new_i < 0 or new_i >= rows or new_j < 0 or new_j >= cols:
                            continue

                        abs_diff = abs(heights[new_i][new_j] - heights[i][j])

                        if dp[new_i][new_j] > max(dp[i][j], abs_diff):
                            dp[new_i][new_j] = max(dp[i][j], abs_diff)
                            relax_atleast_one_edge = True

        return dp[rows - 1][cols - 1]
