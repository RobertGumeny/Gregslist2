import Job from "../Models/Job.js";
import _store from "../store.js";
import store from "../store.js";

// NOTE Set up link to API via Axios
// @ts-ignore
let _api = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/jobs",
  timeout: 3000
});

//Public
class JobService {
  // NOTE Download job data from API and draw it to page on page load
  getJobs() {
    _api
      .get()
      .then(res => {
        let jobs = res.data.data.map(rawJobData => new Job(rawJobData));
        store.commit("jobs", jobs);
      })
      .catch(err => console.error(err));
  }

  // NOTE Delete job from page and API database
  delete(jobId) {
    _api
      .delete(jobId)
      .then(res => {
        console.log(res.data);
        this.getJobs();
      })
      .catch(err => console.error(err));
  }
  // NOTE List new job on page as well as add it to API database
  listJob(newJobObject) {
    _api
      .post("", newJobObject)
      .then(res => {
        let newJob = new Job(res.data.data);
        let jobs = [newJob, ...store.State.jobs];
        store.commit("jobs", jobs);
      })
      .catch(err => console.error(err));
  }

  constructor() {
    console.log("Job Service is Linked");
    this.getJobs();
  }
}

const JOBSERVICE = new JobService();
export default JOBSERVICE;
