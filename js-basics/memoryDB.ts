// main generic data type: => all db records need an ID
// note that we do not check for duplicates here
abstract class DBData {
    id: number;
}

// ============================================================
// first db definition: => records stored as array
export class InMemoryDB<T extends DBData> {
    private data: T[] = [];

    // setter functions can carry arguments
    set setData(data: T[]) {
        this.data = data;
    }

    set addEntry(data: T) {
        this.data.push(data);
    }

    // get methods cannot carry arguments
    get allData(): T[] {
        return this.data;
    }

    // Note that you cannot use a get method with arguments. Below will fail.
    // get oneEntry(id: number) {
    //     return this.data.find((item) => item.id === id);
    // }

    public getById(id: number): T {
        return this.data.find((item: T): boolean => item.id === id);
    }
}

// ===========================================================
// create instance of DB and test it out a bit
// interface for using the db
interface SampleDataInterface extends DBData {
    name: string;
}

// alternate
// interface SampleDataInterface {
//     id: number;
//     name: string;
// }

const db = new InMemoryDB<SampleDataInterface>();

db.setData = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
];
db.addEntry = { id: 3, name: "Jack" };
db.allData; //?

db.getById(1); //?

// ============================================================
// sample data as an array
const sampleData: SampleDataInterface[] = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
];

// to convert it to a record. Note that we have had to create / invoke a function
// to do this
const record: Record<number, SampleDataInterface> = sampleData.reduce(
    (acc, item) => {
        acc[item.id] = item;
        return acc;
    },
    {} as Record<number, SampleDataInterface>
);

record; //?

// ============================================================
// db using records

export class RecordDB<T extends DBData> {
    private data: Record<number, T> = {};

    set setData(data: Record<number, T>) {
        this.data = data;
    }

    set addEntry(data: T) {
        this.data[data.id] = data;
    }

    get allData(): Record<number, T> {
        return this.data;
    }

    public getById(id: number): T {
        return this.data[id];
    }
}

// ============================================================
// create instance of DB and test it out a bit

const db2 = new RecordDB<SampleDataInterface>();

db2.allData; //?
db2.setData = record;
db2.allData; //?
db2.getById(1); //?
db2.addEntry = { id: 3, name: "Jack" };
db2.allData; //?
