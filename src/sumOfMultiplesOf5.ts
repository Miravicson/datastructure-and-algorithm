function sumMultiplesOf5Below1000() {
  let multiples =  new Set<number>()
  
  for (let i = 3; i < 1000; i+=3) {
    multiples.add(i)
  }

  for (let i = 5; i < 1000; i+=5) {
    multiples.add(i)
  }

  let result = 0;
  multiples.forEach((val) => {
    result += val;
  })

  return result
}
console.log(sumMultiplesOf5Below1000())