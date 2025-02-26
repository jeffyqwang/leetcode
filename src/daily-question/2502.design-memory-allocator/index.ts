/*
 * @lc app=leetcode.cn id=2502 lang=typescript
 * @lcpr version=30204
 *
 * [2502] 设计内存分配器
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
class Allocator {
  private memory: number[];

  constructor(n: number) {
    // 初始化内存数组，-1表示空闲
    this.memory = new Array(n).fill(-1);
  }

  allocate(size: number, mID: number): number {
    // 参数验证
    if (size <= 0 || mID < 0 || size > this.memory.length) {
      return -1;
    }

    let start = -1;
    let consecutiveFree = 0;

    // 寻找最左侧的连续空闲内存块
    for (let i = 0; i < this.memory.length; i++) {
      // 如果当前内存单元是空闲的
      if (this.memory[i] === -1) {
        consecutiveFree++;

        // 记录连续空闲块的起始位置
        if (consecutiveFree === 1) {
          start = i;
        }

        // 找到足够大的连续空闲块
        if (consecutiveFree === size) {
          // 分配内存，标记为mID
          for (let j = start; j < start + size; j++) {
            this.memory[j] = mID;
          }
          return start;
        }
      } else {
        // 重置连续空闲计数
        consecutiveFree = 0;
      }
    }

    // 没有找到足够大的连续空闲块
    return -1;
  }

  freeMemory(mID: number): number {
    // 参数验证
    if (mID < 0) {
      return 0;
    }

    let freed = 0;

    // 释放所有mID对应的内存单元
    for (let i = 0; i < this.memory.length; i++) {
      if (this.memory[i] === mID) {
        this.memory[i] = -1; // 标记为空闲
        freed++;
      }
    }

    return freed;
  }
}

/**
 * Your Allocator object will be instantiated and called as such:
 * var obj = new Allocator(n)
 * var param_1 = obj.allocate(size,mID)
 * var param_2 = obj.freeMemory(mID)
 */
// @lc code=end
