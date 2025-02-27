export const BubbleSort = (arr: number[]) => {
  for (let i = 0; i < arr.length; i++) {
    let swapped = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let c = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = c;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
};
//Swap 传入的number是原值不是引用，导致无法操作arr item！
const Swap = (a: number, b: number) => {
  let c = a;
  a = b;
  b = c;
};
