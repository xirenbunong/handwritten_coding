// 53. 最大子序和
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let cur = nums[0];
  let max = nums[0];
  for (let i = 0; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    max = Math.max(cur, max);
  }
  return max;
};
