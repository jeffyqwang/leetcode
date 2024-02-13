export const recordFunctionExecutionTime = (fn: Function, title?: string) => {
  const start = new Date().getTime();
  fn();
  const end = new Date().getTime();
  console.log(`${title ?? ''}耗时：`, end - start, 'ms');
};
