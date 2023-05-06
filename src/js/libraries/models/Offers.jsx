import Request from "../Request";

export default class Offers {
  constructor(id = undefined, details = {}, items = []) {
    this.id = id;
    this.details = details;
    this.items = items;
  }

  async editOffer(new_details) {
    let o = Request.offersRequest();
    
    let edit = await o.put({
      id: this.id,
      data: new_details
    })
    if(!edit.Success) throw new Error('Edit offers failed')

    return edit;
  }

  //b STATIC CONSTRUCT METHODS ------------------------------------------------
  static async showOffers(query) {
    let o = Request.offersRequest();
    let queryStringify = JSON.stringify(query)

    let show = await o.get({
      query: queryStringify
    })
    if(!show.Success) throw new Error('Show offers failed')

    let obj = show.Data.map(r => new Offers(r.id, r.details, r.details.items));
    return obj;
  }

  static async getOffer(id) {
    let o = Request.offersRequest();

    let get = await o.get({
      id: id
    })
    if(!get.Success) throw new Error('Get offer failed')


    let obj = new Offers(get.Data.id, get.Data.details, get.Data.items);
    return obj;
  }

  static async createOffer(data) {
    let o = Request.offersRequest();

    let create = await o.post(data)
    if (!create.Success) throw new Error('Create offer failed')
    
    let obj = new Offers(create.Data.id, create.Data.details, create.Data.items)
    return obj;
  }

  static async removeOffer(id) {
    let o = Request.offersRequest();

    let remove = await o.delete({
      id: id
    })
    if (!remove.Success) throw new Error('Remove offer failed')

    return remove;
  }
}