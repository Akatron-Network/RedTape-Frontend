import Request from "../Request";

export default class Order {
  constructor(id = undefined, details = {}, items = []) {
    this.id = id;
    this.details = details;
    this.items = items;
  }

  //b STATIC CONSTRUCT METHODS ------------------------------------------------
  static async createOrder(data) {
    let o = Request.orderRequest();

    let create = await o.post(data)
    if (!create.Success) throw new Error('Create order failed')
    
    let obj = new Order(create.Data.id, create.Data.details, create.Data.items)
    return obj;
  }
}