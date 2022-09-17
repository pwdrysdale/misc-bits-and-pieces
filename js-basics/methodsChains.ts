class Person {
    constructor({ name, age }: { name: string; age: number }) {
        this.name = name
        this.age = age
    }

    private name: string
    private age: number

    sayHello() {
        console.log(`Hello, my name is ${this.name}`)
        return this
    }

    sayAge() {
        console.log(`I am ${this.age} years old`)
        return this
    }

    birthday() {
        console.log("Happy birthday to me!")
        this.age += 1
        return this
    }
}

const person = new Person({ name: "John", age: 30 })

person.sayHello().sayAge().birthday().sayAge()

const person2 = {
    name: "Pete",
    age: 33,
    sayHello() {
        console.log(`Hello, my name is ${this.name}`)
        return this
    },
    sayAge() {
        console.log(`I am ${this.age} years old`)
        return this
    },
    birthday() {
        console.log("Happy birthday to me!")
        this.age += 1
        return this
    },
}

person2.sayHello().sayAge().birthday().sayAge()
