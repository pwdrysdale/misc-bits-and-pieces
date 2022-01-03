// =======================================================
// basic singleton
class Singleton {
  private static instance: Singleton;

  private constructor() {}

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public doSomething() {
    return "something";
  }
}

const single = Singleton.getInstance(); //?

const out = Singleton.getInstance().doSomething(); //?

// =======================================================
// singleton with props
class SingletonWithProps {
  private static instance: SingletonWithProps;

  private constructor(public name: string) {}
  static getInstance(name: string) {
    if (!SingletonWithProps.instance) {
      SingletonWithProps.instance = new SingletonWithProps(name);
    }
    return SingletonWithProps.instance;
  }
}

SingletonWithProps.getInstance("test"); //?
SingletonWithProps.getInstance("test2").name; //?

// =======================================================
// singleton with private constructor
class SingletonWithPrivateConstructor {
  private static instance: SingletonWithPrivateConstructor;

  private constructor(private name: string) {}

  static getInstance(name: string) {
    if (!SingletonWithPrivateConstructor.instance) {
      SingletonWithPrivateConstructor.instance =
        new SingletonWithPrivateConstructor(name);
    }
    return SingletonWithPrivateConstructor.instance;
  }

  public doSomething() {
    return this.name;
  }
}

SingletonWithPrivateConstructor.getInstance("pete").doSomething(); //?

// =======================================================
// class that takes props
class ConstructorWork {
  constructor(private name: string) {}

  public doSomething() {
    return this.name;
  }
}

const constructorWork = new ConstructorWork("pete"); //?
