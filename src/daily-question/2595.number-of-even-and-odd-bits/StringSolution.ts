function evenOddBitString(n: number): number[] {
  let even = 0 ,odd = 0;
  n.toString(2).split('').reverse().forEach((v,i)=>{
    if(v==='1'){
      if((i&1) ===0){
        even++;
      }else{
        odd++;
      }
    }
  })
  return [even,odd]
};
