// =======================================
// 1: Closures vs classes
// Closures can be used to create private variables and functions.
// Syntactically, they are just functions and do save us a learning curve
// however, you do lose some of the benefits of classes, like inheritance.
// =======================================
// 1.1: Closure emulating a class
const creator = (initialValue: number = 0) => {
  let value = initialValue

  const getValue = () => value

  const increment = () => {
    value += 1
  }

  const decrement = () => {
    value -= 1
  }

  return { getValue, increment, decrement }
}

const counter = creator()
counter.increment()
counter.increment()
counter.decrement()

counter.getValue() //?

// =======================================
// 1.2: The equivalent as a class
// On a side note, just to re-hash class variables,

// private means that the variable is only accessible
// within the class - and is not accessible when extending
// the class.

// public means that the variable is accessible from
// outside the class. This is the default

// protected means that the variable is accessible from
// outside the class, and also from any classes that extend
// the class. It cannot be changed directly, like public
// variables.

class Counter {
  protected value: number = 0

  constructor(value: number = 0) {
    this.value = value
  }

  getValue = () => this.value

  increment = () => {
    this.value += 1
  }

  decrement = () => {
    this.value -= 1
  }
}

const classCounter = new Counter(5)
classCounter.increment()
classCounter.increment()
classCounter.decrement()

classCounter.value //?

classCounter.getValue() //?

// =======================================
// 1.3 Extending classes - Classes with extra methods
// This is a common pattern in JavaScript, where you want to
// add extra methods to a class, but you don't want to change
// the class itself.
// Note that you cannot access the private variables of the
// class, but you can access the public and protected variables.

class MultiplyCounter extends Counter {
  constructor(value: number = 0) {
    super(value)
  }

  multiply = (n: number) => {
    this.value *= n
  }
}

const multiplyCounter = new MultiplyCounter(5)
multiplyCounter.multiply(2)

multiplyCounter.value //?

multiplyCounter.getValue() //?

// =======================================
// 1.4 - Implementing
// Classes can implement interfaces

interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  dueDate: Date
}

interface TodosClass {
  getTodos: () => Todo[]
  addTodo: (todo: Todo) => void
  removeTodo: (id: string) => void
}

class Todos implements TodosClass {
  protected todos: Todo[] = []

  getTodos = () => this.todos

  addTodo = (todo: Todo) => {
    this.todos.push(todo)
  }

  removeTodo = (id: string) => {
    this.todos = this.todos.filter((todo) => todo.id !== id)
  }
}

const todosList = new Todos()

todosList.addTodo({
  id: "1",
  title: "Learn TypeScript",
  description: "Learn TypeScript",
  completed: false,
  dueDate: new Date(),
})

todosList.addTodo({
  id: "2",
  title: "Learn JavaScript",
  description: "Learn JavaScript",
  completed: false,
  dueDate: new Date(),
})

todosList.getTodos() //?

todosList.removeTodo("1") //?

todosList.getTodos() //?

// =======================================
// 1.5 - Implementing using closures
// note that this is an anonymous function so it self
// calls and means that there is only a single instance

const todos = ((): TodosClass => {
  let todos: Todo[] = []

  const getTodos = () => todos

  const addTodo = (todo: Todo) => {
    todos.push(todo)
  }

  const removeTodo = (id: string) => {
    todos = todos.filter((todo) => todo.id !== id)
  }

  return { getTodos, addTodo, removeTodo }
})()

todos.addTodo({
  id: "1",
  title: "Learn TypeScript",
  description: "Learn TypeScript",
  completed: false,
  dueDate: new Date(),
})

todos.addTodo({
  id: "2",
  title: "Learn JavaScript",
  description: "Learn JavaScript",
  completed: false,
  dueDate: new Date(),
})

todos.getTodos() //?

todos.removeTodo("1") //?

todos.getTodos() //?

// =======================================
// 1.6 - Singleton class
// This is a common pattern in JavaScript, where you want to
// create a single instance of a class, and then use that instance
// to access the class's methods. We want this class to keep data

class SingletonTodosClass implements TodosClass {
  private static instance: SingletonTodosClass

  private todos: Todo[] = []

  private constructor() {}

  static getInstance = () => {
    if (!SingletonTodosClass.instance) {
      SingletonTodosClass.instance = new SingletonTodosClass()
    }

    return SingletonTodosClass.instance
  }

  getTodos = () => this.todos

  addTodo = (todo: Todo) => {
    this.todos.push(todo)
  }

  removeTodo = (id: string) => {
    this.todos = this.todos.filter((todo) => todo.id !== id)
  }
}

const singletonTodos = SingletonTodosClass.getInstance()
singletonTodos.getTodos() //?
singletonTodos.addTodo({
  id: "1",
  title: "Learn TypeScript",
  description: "Learn TypeScript",
  completed: false,
  dueDate: new Date(),
})
singletonTodos.getTodos() //?
const moreTodos = SingletonTodosClass.getInstance()
moreTodos.getTodos() //?
moreTodos.removeTodo("1") //?
singletonTodos.getTodos() //?

// =======================================
// 1.7 - Abstract classes
// This is a common pattern in JavaScript, where you want to
// create a class that can be extended, but you don't want to
// create an instance of the class.

abstract class AbstractTodosClass implements TodosClass {
  protected todos: Todo[] = []

  getTodos = () => this.todos

  addTodo = (todo: Todo) => {
    this.todos.push(todo)
  }

  removeTodo = (id: string) => {
    this.todos = this.todos.filter((todo) => todo.id !== id)
  }
}

class NonAbstract extends AbstractTodosClass {
  constructor() {
    super()
  }
}

const nonAbstractTodos = new NonAbstract()
nonAbstractTodos.getTodos() //?
nonAbstractTodos.addTodo({
  id: "1",
  title: "Learn TypeScript",
  description: "Learn TypeScript",
  completed: false,
  dueDate: new Date(),
})
nonAbstractTodos.getTodos() //?

// =======================================
// 2.0 Generics
// Generics are a way to create a class that can be used
// with any type. This is useful when you want to create
// a class that can be used with any type, but you don't
// want to create an instance of the class.

interface ItemId {
  id: string | number
}

interface NewTodosClass extends ItemId {
  title: string
  description: string
  completed: boolean
  dueDate: Date
}

// class example
class Generics<T extends ItemId> {
  protected items: T[] = []

  add = (item: T) => {
    this.items.push(item)
  }

  getItems = () => this.items

  remove = (id: string | number) => {
    this.items = this.items.filter((item) => item.id !== id)
  }

  // edit method
  edit = (newItem: T) => {
    this.items = this.items.map((item) =>
      item.id === newItem.id ? newItem : item
    )
  }
}

const genericTodos = new Generics<NewTodosClass>()

genericTodos.getItems() //?
genericTodos.add({
  id: "1",
  title: "Learn TypeScript",
  description: "Learn TypeScript",
  completed: false,
  dueDate: new Date(),
})
genericTodos.getItems() //?
genericTodos.edit({
  id: "1",
  title: "Learn More TypeScript",
  description: "Learn TypeScript",
  completed: false,
  dueDate: new Date(),
})

genericTodos.getItems() //?
genericTodos.remove("1") //?
genericTodos.getItems() //?

// function examples
function genericFunction<T extends ItemId>(items: T[]) {
  return items.map((item) => item.id)
}

genericFunction<HasId & { nothing: number }>([{ id: 1, nothing: 1 }]) //?

// note that the types are not available at compile time, so this works fine
// but it is not type safe
const arrowFn = <T extends ItemId>(items: T[]): T["id"][] =>
  items.map((item) => item.id.toString())

arrowFn<{ id: number; nothing: number }>([{ id: 1, nothing: 1 }]) //?

const arrowFn2: <T extends ItemId>(items: T[]) => T["id"][] = (items) =>
  items.map((item) => item.id)

arrowFn2<{ id: number; nothing: number }>([{ id: 1, nothing: 1 }]) //?

// =======================================
// 2.1 Generics with extends

interface Types {
  type: string
}

// extend a class that already uses generics
class GenericsExtend<T extends Types & ItemId> extends Generics<T> {
  constructor() {
    super()
  }

  removeType = (type: string) => {
    this.items = this.items.filter((item) => item.type !== type)
  }
}

class TypesTodos extends GenericsExtend<Types & NewTodosClass> {
  constructor() {
    super()
  }
}

const madTodo = {
  id: "1",
  title: "Learn TypeScript",
  description: "Learn TypeScript",
  completed: false,
  dueDate: new Date(),
  type: "mad",
}

const madClass = new TypesTodos()
madClass.getItems() //?
madClass.add(madTodo)
madClass.edit({ ...madTodo, type: "madness" })
madClass.getItems() //?
madClass.removeType("madness") //?
madClass.getItems() //?

// =======================================
// 2.2 Multiple Generics

// exmaple of a class that uses multiple generics
class MultipleGenerics<T extends ItemId, U extends ItemId> {
  protected items: T[] = []
  protected items2: U[] = []

  // less strong => allows for a push of a non T item to an array of T
  add = (item) => {
    this.items.push(item)
  }

  // best
  add2 = (item: U): void => {
    this.items2.push(item)
  }

  // unrelated items coming in
  add3: <S extends T>(item: S) => void = (item) => {
    const newItem: T = item
    this.items.push(newItem)
  }

  getItems = () => this.items
  getItems2 = () => this.items2
}

const strongState = new MultipleGenerics<NewTodosClass, ItemId>()
strongState.getItems() //?
strongState.getItems2() //?
strongState.add({
  id: "1",
  title: "Learn TypeScript",
  description: "Learn TypeScript",
  completed: false,
  dueDate: new Date(),
})
strongState.add({ id: 2 })
// strongState.add2({ id: 3, color: "red" }) // errors
strongState.getItems() //?
strongState.add2({
  id: "1",
})
strongState.getItems2() //?

const looseState = new MultipleGenerics()
looseState.add({ id: 1 })
looseState.add({ id: 2, type: "loose" })
looseState.getItems() //?
