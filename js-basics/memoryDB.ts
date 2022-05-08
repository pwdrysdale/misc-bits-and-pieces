export class InMemoryDB {
    private data: any = [];

    public getData() {
        return this.data;
    }

    public setData(data: any) {
        this.data = data;
    }
}

const db = new InMemoryDB();
