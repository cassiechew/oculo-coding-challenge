/**
 *  An algorithm for getting the combinatorial sum.
 */
export const combinationSum = (
  candidates: number[],
  target: number,
): number[][] => {
  const result: number[][] = [];

  // Backtracking function to create permutations
  function permute(arr: number[] = [], sum = 0, idx = 0) {
    if (sum > target) return;
    if (sum === target) result.push(arr);

    // Start i at idx to avoid using the same combination of numbers but in a different order
    for (let i = idx; i < candidates.length; i++) {
      permute([...arr, candidates[i]], sum + candidates[i], i);
    }
  }
  permute();
  return result;
};
