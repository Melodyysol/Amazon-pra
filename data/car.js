class Car{
  brand;
  model;
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor(carDetails) {
    this.brand = carDetails.brand;
    this.model = carDetails.model;

    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed'

    console.log(`${this.#brand} ${this.#model} speed: ${this.speed} Km/h Trunk: ${trunkStatus}`)
  }

  go() {
    if(!this.isTrunkOpen){
      this.speed += 5
    }

    if(this.speed > 200) {
      this.speed = 200
    }
  }
  brake() {
    this.speed -= 5;

    if(this.speed < 0) {
      this.speed = 0
    }
  }

  openTrunk() {
    if(this.speed === 0) {
     this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car{
  acceleration;



  go() {
    this.speed += this.acceleration;

    if(this.speed > 300) {
      this.speed = 300
    }
  }
  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  openTrunk() {
    console.log('Race cars do not have a trunk');
  }

  closeTrunk() {
    console.log('Race cars do not have a trunk');
  }
}

  const car1 = new Car({
    brand: 'Toyota',
    model: 'corolla'
  })

  const car2 = new Car({
    brand: 'Tesla',
    model: 'Model 3'
  })

  const raceCar = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20
  })

  raceCar.openTrunk()
  raceCar.closeTrunk()
  raceCar.go()
  raceCar.go()
  raceCar.go()
  raceCar.displayInfo()

  // console.log(car1)
  // console.log(car2)



  // car1.go()
  // car1.go()
  // car1.go()
  // car1.go()
  // car1.go()
  // car1.openTrunk()
  // car1.displayInfo()

  // not open when go!
  // car2.go()
  // car2.go()
  // car2.go()
  // car2.go()
  // car2.openTrunk()
  // car2.brake()
  // car2.displayInfo()

