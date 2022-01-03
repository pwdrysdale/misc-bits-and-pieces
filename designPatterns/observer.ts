// create an observer class
class Observer<T> {
    // the list of all the subcribers (a list of functions) to
    // be called on a publish event
    public subscribers: ((data: T) => void)[] = [];

    // method to add a subscriber: adds a function to the list of subscribers
    public subscribe(cb: (data: T) => void) {
        this.subscribers.push(cb);
    }

    // method to remove a subscriber: removes a function from the list of subscribers
    public unsubscribe(cb: (data: T) => void) {
        this.subscribers = this.subscribers.filter(
            (subscriber) => subscriber !== cb
        );
    }

    // let the world know: calls each of the functions
    public publish(data: T) {
        this.subscribers.forEach((subscriber) => subscriber(data));
    }
}

// create the instance of the observer
const observer = new Observer<number>();

// set a function to be called when the observer is called
// in this case it is just a console.log function
const observerSubscribeFn1 = (data) => console.log(data);
const observerSubscribeFn2 = (data) => console.log(data + 1);
observer.subscribe(observerSubscribeFn1);
observer.subscribe(observerSubscribeFn2);

// a list of all the subscribe functions (normally this should be private)
observer.subscribers; //?

// ============================================================
// Example taken from the web
// https://www.youtube.com/watch?v=GioexP_s5Yc&ab_channel=SimplyExplained

class WeatherStation {
    private temperature: number;

    setTemperature(temp: number) {
        console.log("Weather Station: Temperature set to " + temp);
        this.temperature = temp;
        // notify all subscribers from that observer. The data is the temp
        observer.publish(temp);
        return;
    }
}

const station = new WeatherStation(); //?
station.setTemperature(10);
station.setTemperature(20);

class TemperatureDisplay {
    public temperature: number;

    constructor(observer: Observer<number>) {
        // subscribe to the observer
        observer.subscribe((data) => {
            console.log("Temperature Display: Temperature set to " + data);
            this.temperature = data;
        });
    }
} //?

const display = new TemperatureDisplay(observer); //?
display.temperature; //?
station.setTemperature(30);
display.temperature; //?
