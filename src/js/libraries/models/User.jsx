import Request from "../Request";

export default class User {
  constructor(username, data = undefined) {
    this.username = username
    this.details = data
  }

  async editUser(details) {
    let q = Request.userRequest();

    let edit = await q.put({
      username: this.username,
      data: details
    })

    if (!edit.Success) throw new Error('User edit failed')

    return edit;
  }

  async removeUser() {
    let q = Request.userRequest();

    let remove = await q.delete({
      username: this.username,
    })

    if (!remove.Success) throw new Error('User delete failed')

    return remove;
  }

  //b STATIC CONSTRUCT METHODS ------------------------------------------------
  static async createUser(username, password, admin = false) {
    let q = Request.userRequest();

    let create = await q.post({
      username: username,
      password: password,
      admin: admin
    })
    if (!create.Success) throw new Error('User create failed')

    let obj = new User(username);
    return obj;
  }

  static async showUser(query) {
    let q = Request.userRequest();
    let whereStringify = JSON.stringify(query)
    
    let show = await q.get({
      query: whereStringify
    })

    let obj = show.Data.map(r => new User(r.username, r.user_details));
    return obj;
  }

  static async getUserDetails(username) {
    let q = Request.userRequest();

    let get = await q.get({
      username: username
    })

    let obj = new User(get.Data.username, get.Data.user_details);
    return obj;
  }

}