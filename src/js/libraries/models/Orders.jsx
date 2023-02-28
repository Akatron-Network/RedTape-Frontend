import Request from "../Request";

export default class Orders {
  constructor(id = undefined, details = {}, items = []) {
    this.id = id;
    this.details = details;
    this.items = items;
  }

  //b STATIC CONSTRUCT METHODS ------------------------------------------------
  static async showOrders(query) {
    let o = Request.orderRequest();
    let queryStringify = JSON.stringify(query)

    let show = await o.get({
      query: queryStringify
    })
    if(!show.Success) throw new Error('Show orders failed')
    console.log(show);

    let obj = show.Data.map(r => new Orders(r.id, r.details, r.details.items));
    return obj;
  }

  static async getOrder(id) {
    let o = Request.orderRequest();

    let get = await o.get({
      id: id
    })
    if(!get.Success) throw new Error('Get order failed')

    console.log(get);

    let obj = new Orders(get.Data.id, get.Data.details, get.Data.items);
    return obj;
  }

  static async createOrder(data) {
    console.log(data);
    let o = Request.orderRequest();

    let create = await o.post(data)
    if (!create.Success) throw new Error('Create order failed')
    
    let obj = new Orders(create.Data.id, create.Data.details, create.Data.items)
    return obj;
  }
}