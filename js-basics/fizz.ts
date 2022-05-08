// fizzbuzz output a list

const fizzbuzz = (n: number) => {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      result.push("FizzBuzz");
    } else if (i % 3 === 0) {
      result.push("Fizz");
    } else if (i % 5 === 0) {
      result.push("Buzz");
    } else {
      result.push(i.toString());
    }
  }
  // return result as string with new lines
  return result.join("\n");
};

fizzbuzz(15); //?

// const output = process.stdout.write(result.join("\n"));

// return output;

// =======================================================
// Given an array of distinct integers, determine the minimum absolute difference between any two integers in the array. Print all element pairs with that difference in ascending order
// Example:
// Input: [6,2,4,10]
// OutputL 2 4, 4, 6
const closestNumbers = (arr: number[]) => {
  const sorted = arr.sort((a, b) => a - b);
  // find the min difference
  const differences = sorted.slice(1).map((num, i) => num - sorted[i]);
  const minDiff = differences.sort((a, b): number => a - b)[0];

  const result = [];

  // find all elements with the min difference and push to result
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i + 1] - sorted[i] === minDiff) {
      result.push(sorted[i] + " " + sorted[i + 1]);
    }
  }

  if (result.length === 0) {
    process.stdout.write("NONE");
    return "NONE";
  }

  const output = process.stdout.write(result.join("\n"));

  return output;
};

closestNumbers([6, 2, 4, 10]); //?

// =======================================================
// PASSED

const countTeams = (
  skills: number[],
  minPlayers: number,
  minLevel: number,
  maxLevel: number
) => {
  const factorial = (n: number) => {
    if (n === 0) {
      return 1;
    }
    return n * factorial(n - 1);
  };

  const combos = (n: number, k: number) => {
    return factorial(n) / (factorial(k) * factorial(n - k));
  };

  const players = skills.filter(
    (skill) => skill >= minLevel && skill <= maxLevel
  );

  const pickFrom = players.length;

  let result = 0;

  for (let i = minPlayers; i <= pickFrom; i++) {
    result += combos(pickFrom, i);
  }

  return result;
};

countTeams([12, 4, 6, 13, 5, 10], 3, 4, 10); //?
