const arr = [
  { name: "A", age: 20 },
  { name: "B", age: 18 },
  { name: "C", age: 26 },
];

minBy(arr, "age"); // { name: 'B', age: 18 }

// get min by property from an array
function minBy<T>(arr: T[], prop: keyof T): T {
  return arr.reduce(
    (acc: T, current: T): T => (current[prop] < acc[prop] ? current : acc)
  );
}

minBy(arr, "age"); //?

// js primitive types
// 1. boolean
// 2. number
// 3. string
// 4. bigint
// 5. null
// 6. undefined
// 7. symbol => must be created using the Symbol keyword: const foo = Symbol("bar")

const equalsBoolean: boolean = false === false; //?
const equalsNumber: boolean = 5 === 5; //?
const equalsString: boolean = "React" === "React"; //?
const equalsBigInt: boolean = BigInt(1) === BigInt(1); //?
const equalsNull: boolean = null === null; //?
const equalsUndefined: boolean = undefined === undefined; //?
const equalsSymbol: boolean = Symbol("Ezra") === Symbol("Ezra"); //?
const equalsObject: boolean = { foo: "bar" } === { foo: "bar" }; //?

// truthy and falsy values
// 1. falsy values: undefined, null, 0, "", NaN, false
// 2. truthy values: all other values
