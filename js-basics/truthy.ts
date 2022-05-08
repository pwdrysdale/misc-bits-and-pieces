const isTruthy = (value: any): boolean => {
  return !!value
}

// isTruthy with generics
const isTruthyWithGenerics = <T>(value: T): value is T => {
  return !!value
}

isTruthyWithGenerics(1) //?
isTruthyWithGenerics("1") //?
isTruthyWithGenerics(true) //?
isTruthyWithGenerics(false) //?
isTruthyWithGenerics(undefined) //?
isTruthyWithGenerics(null) //?
isTruthyWithGenerics({}) //?
isTruthyWithGenerics([]) //?
isTruthyWithGenerics(() => {}) //?
isTruthyWithGenerics(new Date()) //?

const isPrimitive: <T>(value: T) => boolean = (value) => {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "symbol" ||
    typeof value === "bigint" ||
    value === null ||
    value === undefined
  )
}

isPrimitive(1) //?
isPrimitive("1") //?
isPrimitive(true) //?
isPrimitive(false) //?
isPrimitive(undefined) //?
isPrimitive(null) //?
isPrimitive({}) //?
isPrimitive([]) //?
isPrimitive(() => {}) //?
isPrimitive(new Date()) //?
isPrimitive(Symbol("1")) //?
isPrimitive(BigInt(1)) //?
isPrimitive(NaN) //?
isPrimitive(Infinity) //?
isPrimitive(-Infinity) //?
isPrimitive(Number.MAX_VALUE) //?
