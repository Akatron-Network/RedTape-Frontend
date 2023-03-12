import Request from "../Request";

export default class Orders {
  constructor(id = undefined, details = {}, items = []) {
    this.id = id;
    this.details = details;
    this.items = items;
  }

  async editOrder(new_details) {
    let o = Request.orderRequest();
    
    let edit = await o.put({
      id: this.id,
      data: new_details
    })
    if(!edit.Success) throw new Error('Edit orders failed')

    return edit;
  }

  //b STATIC CONSTRUCT METHODS ------------------------------------------------
  static async showOrders(query) {
    let o = Request.orderRequest();
    let queryStringify = JSON.stringify(query)

    let show = await o.get({
      query: queryStringify
    })
    if(!show.Success) throw new Error('Show orders failed')

    let obj = show.Data.map(r => new Orders(r.id, r.details, r.details.items));
    return obj;
  }

  static async getOrder(id) {
    let o = Request.orderRequest();

    let get = await o.get({
      id: id
    })
    if(!get.Success) throw new Error('Get order failed')


    let obj = new Orders(get.Data.id, get.Data.details, get.Data.items);
    return obj;
  }

  static async createOrder(data) {
    let o = Request.orderRequest();

    let create = await o.post(data)
    if (!create.Success) throw new Error('Create order failed')
    
    let obj = new Orders(create.Data.id, create.Data.details, create.Data.items)
    return obj;
  }

  static async removeOrder(id) {
    let o = Request.orderRequest();

    let remove = await o.delete({
      id: id
    })
    if (!remove.Success) throw new Error('Remove order failed')

    return remove;
  }
}