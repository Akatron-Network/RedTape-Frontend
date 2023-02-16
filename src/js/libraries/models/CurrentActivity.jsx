import Request from "../Request"

export default class CurrentActivity{
  constructor(id = undefined, details) {
    this.id = id,
    this.details = details
  }

  //b STATIC CONSTRUCT METHODS ------------------------------------------------
  static async showCurrentActivity(query) {
    let c = Request.currentActRequest();
    let queryStringify = JSON.stringify(query);

    let show = await c.get({
      query: queryStringify
    })
    if(!show.Success) throw new Error('Show current activities failed')

    let obj = show.Data.map(r => new CurrentActivity(r.id, r.details));
    return obj;

  }

  static async createCurrentActivity(data) {
    let c = Request.currentActRequest();

    let create = await c.post(data)
    if(!create.Success) throw new Error('Show current activities failed')

    let obj = new CurrentActivity(create.Data.id, create.Data.details)
    return obj;
  }

  static async removeCurrentActivity(id) {
    let c = Request.currentActRequest();

    let remove = await c.delete({
      id: id
    })
    if(!remove.Success) throw new Error('Current activity remove failed')

    return remove;
  }
}