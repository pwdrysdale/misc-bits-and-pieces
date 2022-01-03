// basic factory pattern
class Factory {
  private constructor() {}

  static create(name: string) {
    return new Factory();
  }

  public doSomething() {
    return "something";
  }
}

const factory = Factory.create("test");
factory.doSomething(); //?
// factory.name ; //? undefined

// =======================================================
// factory pattern with props
class FactoryWithProps {
  private constructor(public name: string) {}

  static create(name: string) {
    return new FactoryWithProps(name);
  }

  public getName() {
    return this.name;
  }

  public doSomething() {
    return "something";
  }
}

// test factory with props
const propFactory = FactoryWithProps.create("test");
propFactory.doSomething(); //?
propFactory.name; //?

// =======================================================
// note that in the factory pattern, the class is not
// instantiated until the factory is called.

// methods are set in the factory itself and can be called
// from the factory or the class itself.
