import Request from "../Request"

export default class Dashboard {
  constructor(details = {}) {
    this.details = details
  }

  //b STATIC CONSTRUCT METHODS ------------------------------------------------
  static async showDashboard() {
    let c = Request.dashboardRequest();

    let show = await c.get()

    if(!show.Success) throw new Error('Show dashboard failed')

    let obj = new Dashboard(show.Data);
    return obj;

  }
}