export class TextEditor {
  // 使用两个数组分别表示光标前后的文本
  private beforeCursor: string[] = []; // 光标前的字符
  private afterCursor: string[] = []; // 光标后的字符

  constructor() {}

  // 在光标位置添加文本 - O(k)复杂度，k是添加文本的长度
  addText(text: string): void {
    // 将文本拆分为字符并添加到光标位置
    const chars = text.split('');
    this.beforeCursor.push(...chars);
  }

  // 删除光标前的k个字符 - O(k)复杂度
  deleteText(k: number): number {
    const deletedCount = Math.min(k, this.beforeCursor.length);
    this.beforeCursor.splice(
      this.beforeCursor.length - deletedCount,
      deletedCount
    );
    return deletedCount;
  }

  // 光标左移k位 - O(k)复杂度
  cursorLeft(k: number): string {
    const moveCount = Math.min(k, this.beforeCursor.length);

    // 将字符从光标前移到光标后
    for (let i = 0; i < moveCount; i++) {
      const char = this.beforeCursor.pop();
      if (char !== undefined) {
        this.afterCursor.unshift(char);
      }
    }

    // 返回光标前的最后10个字符
    return this.beforeCursor.slice(-10).join('');
  }

  // 光标右移k位 - O(k)复杂度
  cursorRight(k: number): string {
    const moveCount = Math.min(k, this.afterCursor.length);

    // 将字符从光标后移到光标前
    for (let i = 0; i < moveCount; i++) {
      const char = this.afterCursor.shift();
      if (char !== undefined) {
        this.beforeCursor.push(char);
      }
    }

    // 返回光标前的最后10个字符
    return this.beforeCursor.slice(-10).join('');
  }

  // 获取完整文本 - O(n)复杂度
  getText(): string {
    return this.beforeCursor.join('') + this.afterCursor.join('');
  }

  // 打印当前状态
  print(str?: string): void {
    console.log(
      str + ' str',
      this.getText(),
      'cursor',
      this.beforeCursor.length
    );
  }
}
