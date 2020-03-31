import Home from "../Models/Home.js";
import _store from "../store.js";
import store from "../store.js";

// NOTE Set up link to API via Axios
// @ts-ignore
let _api = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/houses",
  timeout: 3000
});

//Public
class HomeService {
  // NOTE Download home data from API and draw it to page on page load
  getHomes() {
    _api
      .get()
      .then(res => {
        let homes = res.data.data.map(rawHomeData => new Home(rawHomeData));
        store.commit("homes", homes);
      })
      .catch(err => console.error(err));
  }

  // NOTE Bid on home and increment the price by 100
  bid(homeId) {
    let foundHome = store.State.homes.find(home => home.id == homeId);
    if (foundHome) {
      foundHome.price += 100;
      _api
        .put(homeId, foundHome)
        .then(res => {
          this.getHomes();
        })
        .catch(err => console.error(err));
    }
  }

  // NOTE Delete home from page and API database
  delete(homeId) {
    _api
      .delete(homeId)
      .then(res => {
        console.log(res.data);
        this.getHomes();
      })
      .catch(err => console.error(err));
  }
  // NOTE List new home on page as well as add it to API database
  listHome(newHomeObject) {
    _api
      .post("", newHomeObject)
      .then(res => {
        let newHome = new Home(res.data.data);
        let homes = [newHome, ...store.State.homes];
        store.commit("homes", homes);
      })
      .catch(err => console.error(err));
  }

  constructor() {
    console.log("Home Service is Linked");
    this.getHomes();
  }
}

const HOMESERVICE = new HomeService();
export default HOMESERVICE;
