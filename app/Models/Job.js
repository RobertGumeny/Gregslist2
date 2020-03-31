export default class Job {
  constructor(data) {
    this.id = data.id || data._id;
    this.company = data.company;
    this.jobTitle = data.jobTitle;
    this.rate = data.rate;
    this.hours = data.hours;
    this.description = data.description;
  }

  get Template() {
    return /*html*/ `
    <div class="col-3">
    <div class="card my-2 bg-light">
    
        <div class="card-body">
        <h5>Company: ${this.company}</h5>
        <h5>Job Title: ${this.jobTitle}</h5>
        <h5>Hours: ${this.hours}</h5>
        <h5>Rate: ${this.rate}</h5>
        <p>Description: ${this.description}</p>
      </div>
      <div class="card-footer text-center">
        <button
          class="btn btn-danger"
          onclick="app.jobController.delete('${this.id}')"
        >
          Remove Listing
        </button>
      </div>
    </div>
  </div>
    `;
  }
}
