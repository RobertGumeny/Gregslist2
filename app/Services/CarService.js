import Car from "../Models/Car.js";
import _store from "../store.js";
import store from "../store.js";

// NOTE Set up link to API via Axios
// @ts-ignore
let _api = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/cars",
  timeout: 3000
});

//Public
class CarService {
  // NOTE Download car data from API and draw it to page on page load
  getCars() {
    _api
      .get()
      .then(res => {
        let cars = res.data.data.map(rawCarData => new Car(rawCarData));
        store.commit("cars", cars);
      })
      .catch(err => console.error(err));
  }

  // NOTE Bid on car and increment the price by 100
  bid(carId) {
    let foundCar = store.State.cars.find(car => car.id == carId);
    if (foundCar) {
      foundCar.price += 100;
      _api
        .put(carId, foundCar)
        .then(res => {
          this.getCars();
        })
        .catch(err => console.error(err));
    }
  }

  // NOTE Delete car from page and API database
  delete(carId) {
    _api
      .delete(carId)
      .then(res => {
        console.log(res.data);
        this.getCars();
      })
      .catch(err => console.error(err));
  }
  // NOTE List new car on page as well as add it to API database
  listCar(newCarObject) {
    _api
      .post("", newCarObject)
      .then(res => {
        let newCar = new Car(res.data.data);
        let cars = [newCar, ...store.State.cars];
        store.commit("cars", cars);
      })
      .catch(err => console.error(err));
  }

  constructor() {
    console.log("Car Service is Linked");
    this.getCars();
  }
}

const CARSERVICE = new CarService();
export default CARSERVICE;
