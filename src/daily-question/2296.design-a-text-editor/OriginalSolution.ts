export class TextEditor {
  ptr = 0;
  str = '';
  constructor() {}

  addText(text: string): void {
    const left = this.str.slice(0, this.ptr);
    const right = this.str.slice(this.ptr, this.str.length);

    this.str = left + text + right;
    this.ptr = this.ptr + text.length;
  }

  deleteText(k: number): number {
    const start = this.ptr;
    const left = this.str.slice(0, Math.max(0, this.ptr - k));
    const right = this.str.slice(this.ptr, this.str.length);
    this.str = left + right;
    this.ptr = Math.max(this.ptr - k, 0);
    return Math.min(k, start);
  }

  cursorLeft(k: number): string {
    this.ptr = Math.max(0, this.ptr - k);
    return this.ptr >= 10
      ? this.str.slice(this.ptr - 10, this.ptr)
      : this.str.slice(0, this.ptr);
  }

  cursorRight(k: number): string {
    this.ptr = Math.min(this.str.length, this.ptr + k);
    return this.ptr >= 10
      ? this.str.slice(this.ptr - 10, this.ptr)
      : this.str.slice(0, this.ptr);
  }
  print(str?: string) {
    console.log(str + ' str', this.str, 'cursor', this.ptr);
  }
}
