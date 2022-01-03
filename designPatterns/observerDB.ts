// =======================================================
// Observer setup

class DBObserver<T> {
    private subscribers: ((data: T) => void)[] = [];

    public subscribe(cb: (data: T) => void) {
        this.subscribers.push(cb);
    }

    public unsubscribe(cb: (data: T) => void) {
        this.subscribers = this.subscribers.filter(
            (subscriber) => subscriber !== cb
        );
    }

    public publish(data: T) {
        this.subscribers.forEach((subscriber) => subscriber(data));
    }
}

// =======================================================
// create the instance of the observer
const addObserver = new DBObserver<DBData>();
const deleteObserver = new DBObserver<DBData>();

// =======================================================
// DB setup

// =======================================================
// interface and helper functions
interface DBData {
    id: number;
}

// convert array to records
const convertArrayToRecords = <T extends DBData>(
    data: T[]
): Record<number, T> => {
    return data.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {} as Record<number, T>);
};

// convert records to array
const convertRecordsToArray = <T extends DBData>(
    data: Record<number, T>
): T[] => {
    return Object.values(data);
};

// console log to add a person
const addConsoleLog = (data: DBData) => {
    console.log(`Added with an id of ${data.id}`);
};

// console log to delete a person
const deleteConsoleLog = (data: DBData) => {
    console.log(`Id of ${data.id} has left the building`);
};

// =======================================================
// DB class
class DB<T extends DBData> {
    constructor(
        addObserverFn: (data: DBData) => void,
        deleteObserverFn: (data: DBData) => void
    ) {
        addObserver.subscribe(addObserverFn);
        deleteObserver.subscribe(deleteObserverFn);
    }

    private data: any = {};

    set setData(data: T[]) {
        convertRecordsToArray(this.data).forEach((item) => {
            deleteObserver.publish(item);
        });
        data.map((item) => addObserver.publish(item));
        this.data = convertArrayToRecords(data);
    }

    set addEntry(data: T) {
        addObserver.publish(data);
        this.data[data.id] = data;
    }

    get allData(): any {
        return convertRecordsToArray(this.data);
    }

    public getById(id: number): T {
        return this.data[id];
    }

    public deleteById(id: number): void {
        deleteObserver.publish(this.data[id]);
        delete this.data[id];
    }
}

// =======================================================
// implementation and test
interface UsingDataType extends DBData {
    name: string;
}

const db = new DB<UsingDataType>(addConsoleLog, deleteConsoleLog);

db.setData = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
];
db.addEntry = { id: 3, name: "Jack" };
db.allData; //?
addObserver.unsubscribe(addConsoleLog);
db.addEntry = { id: 4, name: "Jill" };
db.getById(1); //?
db.deleteById(1);
db.getById(1); //?
db.allData; //?
db.setData = [
    { id: 5, name: "John" },
    { id: 6, name: "Jane" },
];
// (no logs, as we have unsubscribed)
db.allData; //?
