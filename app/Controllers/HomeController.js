import _homeService from "../Services/HomeService.js";
import _store from "../store.js";
import store from "../store.js";

function _drawHomes() {
  let template = "";
  let homes = _store.State.homes;

  homes.forEach(home => (template += home.Template));
  document.getElementById("home-display").innerHTML = template;
}

export default class HomeController {
  constructor() {
    console.log("Home Controller is linked");
    store.subscribe("homes", _drawHomes);
  }

  listHome(event) {
    event.preventDefault();
    let formData = event.target;
    let newHomeObject = {
      bedrooms: formData.bedrooms.value,
      bathrooms: formData.bathrooms.value,
      levels: formData.levels.value,
      year: formData.year.value,
      price: formData.price.value,
      imgUrl: formData.imgUrl.value
    };

    _homeService.listHome(newHomeObject);
    formData.reset();
    // @ts-ignore
    $("#list-home-modal").modal("toggle");
  }

  delete(homeId) {
    _homeService.delete(homeId);
  }
  bid(homeId) {
    _homeService.bid(homeId);
  }
}
