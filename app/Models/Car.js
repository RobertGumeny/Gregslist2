export default class Car {
  constructor(data) {
    this.id = data.id || data._id;
    this.make = data.make;
    this.model = data.model;
    this.year = data.year;
    this.price = data.price;
    this.description = data.description || "No description provided";
    this.imgUrl = data.imgUrl;
  }

  get Template() {
    return /*html*/ `
    <div class="col-3">
    <div class="card my-2 bg-light">
      <img class="img-fluid card-img-top" src="${this.imgUrl}" />
      <div class="card-header">
        <h4>Make: ${this.make}</h4>
        <h5>Model: ${this.model}</h5>
      </div>
      <div class="card-body">
        <h5>Year: ${this.year}</h5>
        <h5>Price: $${this.price}</h5>
        <p>${this.description}</p>
      </div>
      <div class="card-footer text-center">
        <button
          class="btn btn-danger"
          onclick="app.carController.delete('${this.id}')"
        >
          Remove Listing
        </button>
        <button
        class="btn btn-success"
        onclick="app.carController.bid('${this.id}')"
      >
        Place Bid
      </button>
      </div>
    </div>
  </div>
    `;
  }
}
