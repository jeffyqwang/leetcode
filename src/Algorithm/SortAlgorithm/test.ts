import { BubbleSort } from './On^2/BubbleSort';
const simpleCase = (algorithm: (arr: number[]) => number[]) => {
  const arr = [4, 5, 6, 1, 2, 3];
  algorithm(arr);
  arr.forEach((i) => console.log(i));
};

const longCase = (algorithm: (arr: number[]) => number[]) => {
  console.time('inOrder');
  const arr1 = Array.from({ length: 100000 }, (_, i) => i);
  algorithm(arr1);
  console.timeEnd();
  console.time('OutOrder');
  const arr2 = Array.from({ length: 100000 }, (_, i) => 100000 - i);
  algorithm(arr2);
  console.timeEnd();
};
simpleCase(BubbleSort);
