function evenOddBitBitWise(n: number): number[] {
  let even = 0,
    odd = 0
  for (let i = 0; i <= 10; i++) {
    if (((n >> i) & 1) === 1) {
      if ((i & 1) === 0) {
        even++
      } else odd++
    }
  }
  return [even, odd]
}
