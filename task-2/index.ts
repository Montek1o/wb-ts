interface Car {
    brand: string;
    model: string;
    year: number;
    mileage: number;
    fuelLevel: number;
    engineStatus: boolean;
    lights: boolean;
}

interface Engine {
    start: () => void;
    stop: () => void;
}

interface Lights {
    turnOn: () => void;
    turnOff: () => void;
}

interface Fuel {
    refuel: (count: number) => void;
}

const myCar: Car = {
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    mileage: 30_000,
    fuelLevel: 50,
    engineStatus: false,
    lights: false,
};

const engine: Engine = {
    start() {
        myCar.engineStatus = true;
        console.log("Engine started");
    },
    stop() {
        myCar.engineStatus = false;
        console.log("Engine stopped");
    },
};

const lights: Lights = {
    turnOn() {
        myCar.lights = true;
        console.log("Lights turned on");
    },
    turnOff() {
        myCar.lights = false;
        console.log("Lights turned off");
    },
};

const fuel: Fuel = {
    refuel(count: number) {
        myCar.fuelLevel += count;
        console.log(`Refueled by ${count} liters. Current fuel level: ${myCar.fuelLevel}`);
    },
};

console.log("Car information:");
console.log(myCar);

engine.start();
lights.turnOn();
fuel.refuel(10);

console.log("Updated car information:");
console.log(myCar);