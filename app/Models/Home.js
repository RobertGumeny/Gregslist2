export default class Home {
  constructor(data) {
    this.id = data.id || data._id;
    this.bedrooms = data.bedrooms;
    this.bathrooms = data.bathrooms;
    this.levels = data.levels;
    this.year = data.year;
    this.description = data.description;
    this.price = data.price;
    this.imgUrl = data.imgUrl;
  }

  get Template() {
    return /*html*/ `
    <div class="col-3">
    <div class="card my-2 bg-light">
    <img class="img-fluid card-img-top" src="${this.imgUrl}" />
        <div class="card-body">
        <h5>Bedrooms: ${this.bedrooms}</h5>
        <h5>Bathrooms: ${this.bathrooms}</h5>
        <h5>Levels: ${this.levels}</h5>
        <h5>Year: ${this.year}</h5>
        <h5>Price: $${this.price}</h5>
      </div>
      <div class="card-footer text-center">
        <button
          class="btn btn-danger"
          onclick="app.homeController.delete('${this.id}')"
        >
          Remove Listing
        </button>
        <button
        class="btn btn-success"
        onclick="app.homeController.bid('${this.id}')"
      >
        Place Bid
      </button>
      </div>
    </div>
  </div>
    `;
  }
}
