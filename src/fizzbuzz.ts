// Write a program that prints the numbers from 1 to 100.
// * For multiples of three print "Fizz" instead of the number.
// * For multiples of five print "Buzz".
// * For numbers which are multiples of both three and five print "FizzBuzz".

const fizzbuzz = (i: number): string => {
  if (i % 15 === 0) {
    return "FizzBuzz";
  }
  if (i % 3 === 0) {
    return "Fizz";
  }
  if (i % 5 === 0) {
    return "Buzz";
  }
  return String(i);
};

// number 1 to 100
const numbers = Array(100)
  .fill(0)
  .map((_x, i) => i + 1);

const result = numbers.map(fizzbuzz).join("\n");

console.log(result);
