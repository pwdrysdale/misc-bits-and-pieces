class Person {
  constructor(public name: string, public age: number) {}
}

// define a sample map
const mp = new Map<number, Person>();

// add a person to the mp
mp.set(1, new Person("John", 30));
mp.set(2, new Person("Sally", 25));

mp; //?
mp.get(1); //?
mp.get(2); //?

mp.set(2, new Person("Tim", 35));

mp.get(2); //?

mp.size; //?
mp.has(2); //?
mp.has(3); //?
mp.keys(); //?
// get the keys from mp
Array.from(mp.keys()); //?
// get the values from mp
const values = Array.from(mp.values()); //?
mp.forEach((value, key) => {
  console.log(`${key}: ${value.name}`);
});

typeof mp; //?
Object.keys(mp); //?
Object.values(mp); //?

// =======================================================
// records

// function to convert map to a record
const convertMapToRecord = (mp: Map<number, Person>) => {
  const record = {};
  mp.forEach((value, key) => {
    record[key] = value;
  });
  return record;
};

// convert mp to a record
const record = convertMapToRecord(mp); //?
// record keys
Object.keys(record); //?
// record values
Object.values(record); //?

// convert record to an array of objects
const convertRecordToArray = (record: any) => {
  return Object.values(record);
};

convertRecordToArray(record); //?
