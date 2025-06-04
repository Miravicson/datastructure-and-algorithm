
/**
 * Reverses a string
 * @param str string
 */
export function reverseString(str: string): string {
  const stringArr = str.split('');
  
  const indexComplement = (idx: number, arrLength: number): number => {
    return arrLength - idx -1;
  }

  const swapElementsAtIdx = (arr: unknown[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }

  for (let i = 0; i < Math.floor(stringArr.length) / 2; i++) {
    const iComp = indexComplement(i, stringArr.length);
    swapElementsAtIdx(stringArr, i, iComp)
  }

  return stringArr.join();
}

function palindrome(word: string): boolean {
  const wordArr = word.split('');
  const indexComplement = (idx: number, arrLength: number): number => {
    return arrLength - idx -1;
  }

  for (let i = 0; i < Math.floor(wordArr.length / 2); i++) {
    const icomp = indexComplement(i, wordArr.length);
    if (wordArr[i] !== wordArr[icomp]) {
      return false
    }
  }

  return true;
}



const test =  ['madam', 'racecar', 'sass', 'flop', 'noon'];

const result = test.map(palindrome);

console.log(`Here are the test strings\n${JSON.stringify(test)}\nHere are the results:\n${JSON.stringify(result)}`)





function reverseNum(num: number): number | string {
  if (num > Number.MAX_SAFE_INTEGER) {
    return "Cannot work"
  }
  // console.log('Maximum integer allowed by JS', Number.MAX_SAFE_INTEGER)
  const maxExp = Math.floor(Math.log10(num));
  let rem = num;
  const parts = []
  for (let i = 2; i>= 0; i--){
    const currentBase10Exp = Math.pow(10, i)
    const part = Math.floor(rem / currentBase10Exp);
    parts.push(part)
    rem = rem % currentBase10Exp
  }
  
  let result = 0;
  for (let i = 0; i <= maxExp; i++) {
    result = result +  parts[i] * Math.pow(10, i)
  }


  return result;
}


const numbers = [123, 456, 789, 2335353535235235]

const results = numbers.map(reverseNum);

console.log(`Here are the numbers to be reversed; ${JSON.stringify(numbers)}`)
console.log(`Here are the numbers reversed: ${JSON.stringify(results)}`)

