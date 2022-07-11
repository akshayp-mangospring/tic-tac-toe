// Fibonacci series: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
const calcFibonacciIterative = (limit) => {
  let first = 0;
  let second = 1;
  let temp = null;
  const series = [];

  series.push(first);

  for (let i = 0; i < limit; i += 1) {
    series.push(second);
    temp = second;
    second = first + second;
    first = temp;
  }

  return series;
};

console.log(calcFibonacciIterative(15));
