// 1. Maps and generics

// create hashmap with key and value
const hashMap = (arr) => new Map(arr)

const mapped = hashMap([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]) //?

mapped.get("a") //?
mapped.set("a", 5) //?

interface HasId {
  id: number
}

// function which takes an array of objects which have an id property
// and returns a map with the id as the key and the object as the value

const hashed: <T extends HasId>(arr) => Map<T["id"], T> = (arr) =>
  new Map(arr.map((item) => [item.id, item]))

// using the hashed function without the use of a generic
// this will create issues down the line
const exampleData = [
  { id: 1, thing: 2 },
  { id: 2, thing: 2 },
  { id: 3, thing: 2 },
]

const hashSansGeneric = hashed(exampleData) //?

hashSansGeneric.get(1) //?
hashSansGeneric.set(1, { id: 1, thing: 3 }) //?
hashSansGeneric.get(1) //?
hashSansGeneric.set(1, { id: 1, thingo: 3 }) //?

// using the hashed function with the use of a generic
// this seems more robust
const genericHashed = hashed<HasId & { thing: number }>(exampleData) //?

genericHashed.set(1, { id: 1, thing: 3 }) //?
genericHashed.set(1, { id: 1, thingo: 3 }) //?

// =======================================
// 2. Records

// Record<K, V> is a generic type that represents a record of known keys K and values V.
// It is a subtype of Record<K, V> and is used to create a record type that has a known set of keys.

type roles = "admin" | "user" | "guest"

const permissions: Record<roles, string> = {
  admin: "all areas",
  user: "their own",
  guest: "none",
}

permissions.admin //?
