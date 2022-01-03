abstract class Product {
  id: number;
  name: string;
  price: number;
  numberOfLegs: number;
}

// note that you could use implements on this call signature
class Chair extends Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public numberOfLegs: number
  ) {
    super();
  }
}

// abstract factory class
// this seems to be the point, that the abstract factory
// outlines that these things are coming
abstract class AbstractFactory {
  abstract createProduct(name: string, price: number): Product;
}

class ChairFactory implements AbstractFactory {
  private id: number = 0;
  createProduct(name: string, price: number): Product {
    this.id++;
    return new Chair(this.id, name, price, 4);
  }
}

const cf = new ChairFactory(); //?
const bigGreen = cf.createProduct("Big Green", 100); //?
const littleRed = cf.createProduct("Little Red", 20); //?
bigGreen.name; //?
bigGreen instanceof Chair; //?
bigGreen instanceof Product; //?

// =======================================================

// you could not use implements here, as you have added a feature!
class Bed extends Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public numberOfLegs: number,
    public numberOfPillows: number
  ) {
    super();
  }
}

class BedFactory implements AbstractFactory {
  private id: number = 0;
  createProduct(name: string, price: number): Product {
    this.id++;
    return new Bed(this.id, name, price, 8, 2);
  }
}

const bf = new BedFactory(); //?
const bigBlue = bf.createProduct("Big Blue", 200); //?
const littleGreen = bf.createProduct("Little Green", 30); //?
bigBlue.name; //?
bigBlue instanceof Bed; //?
bigBlue instanceof Product; //?

// =======================================================

// throws an error - the create Product method is not defined
// class DogFactory implements AbstractFactory {
//   private id: number = 0;

// }
