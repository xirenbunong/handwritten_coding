// 88. 合并两个有序数组
// 时间复杂度为 O(m+n)
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  // 双指针
  let p1 = 0, p2 = 0;
  const sorted = new Array(m + n).fill(0);
  var cur;
  // 两个指针都没有结束
  while (p1 < m || p2 < n) {
    // 第一个指针结束了
    if (p1 === m) {
      cur = nums2[p2++];
    } else if (p2 === n) { // 第二个指针结束了
      cur = nums1[p1++];
    } else if (nums1[p1] < nums2[p2]) { // 对比
      cur = nums1[p1++];
    } else {
      cur = nums2[p2++];
    }
    sorted[p1 + p2 - 1] = cur;
  }
  for (let i = 0; i != m + n; ++i) {
      nums1[i] = sorted[i];
  }
  return nums1;
};

merge([1,2,3,0,0,0], 3, [2, 5, 6], 3);
