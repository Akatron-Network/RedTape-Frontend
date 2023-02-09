import Request from "../Request";

export default class Current {
  constructor(id = undefined, details = {}) {
    this.id = id;
    this.details = details;
  }

  async editCurrent(details) {
    let q = Request.currentRequest();

    let edit = await q.put({
      id: this.id,
      data: details
    })
    if(!edit) throw new Error('Edit current failed')

    return edit;
  }

  async removeCurrent() {
    let q = Request.currentRequest();

    let remove = await q.delete({
      id: this.id
    })
    if(!remove.Success) throw new Error('Delete current failed')

    return remove;
  }

  //b STATIC CONSTRUCT METHODS ------------------------------------------------
  static async showCurrent(where) {
    let q = Request.currentRequest();
    let whereStringify = JSON.stringify(where)

    let show = await q.get({
      query: whereStringify
    })
    if(!show.Success) throw new Error('Show current failed')

    let obj = show.Data.map(r => new Current(r.id, r.details));
    return obj;
  }

  static async createCurrent(data) {
    let q = Request.currentRequest();

    let create = await q.post(data)
    if(!create.Success) throw new Error('Current create failed')

    let obj = new Current(create.Data.id, create.Data.details);
    return obj;
  }

  static async getCurrent(id) {
    let q = Request.currentRequest();

    let get = await q.get({
      id: id
    })
    if(!get.Success) throw new Error('Get current failed')

    let obj = new Current(get.Data.id, get.Data.details)
    return obj;
  }
}