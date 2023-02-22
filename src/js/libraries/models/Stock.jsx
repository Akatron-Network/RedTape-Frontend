import Request from "../Request";

export default class Stock {
  constructor(id = undefined, details = {}) {
    this.id = id;
    this.details = details;
  }

  async editStock(new_details) {
    let s = Request.stocktRequest();

    let edit = await s.put({
      id: this.id,
      data: new_details
    })
    if(!edit.Success) throw new Error('Edit stock failed')

    return edit;
  }

  //b STATIC CONSTRUCT METHODS ------------------------------------------------
  //? Get all stocks
  static async showStock(query) {
    let s = Request.stocktRequest();
    let queryStringify = JSON.stringify(query)

    let show = await s.get({
      query: queryStringify
    })
    if(!show.Success) throw new Error('Show stock failed')

    let obj = show.Data.map(r => new Stock(r.id, r.details))
    return obj;
  }
  
  //? Get spesific stock
  static async getStock(id) {
    let s = Request.stocktRequest();

    let get = await s.get({
      id: id
    })

    let obj = new Stock(get.Data.id, get.Data.details)
    return obj;
  }

  static async createStock(data) {
    let s = Request.stocktRequest();

    let create = await s.post(data);
    if(!create.Success) throw new Error('Create stock failed')

    let obj = new Stock(create.Data.id, create.Data.details)
    return obj;
  }

  static async removeStock(id) {
    let s = Request.stocktRequest();

    let remove = await s.delete({
      id: id
    })
    if(!remove.Success) throw new Error('Delete current failed')

    return remove;
  }
}