import Request from "../Request";

export default class User {
  constructor(username, data = undefined) {
    this.username = username
    this.data = data
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

    let dlt = await q.delete({
      username: this.username,
    })

    if (!dlt.Success) throw new Error('User delete failed')

    return dlt;
  }

  //b STATIC CONSTRUCT METHODS ------------------------------------------------
  static async createUser(username, password) {
    let q = Request.userRequest();

    let post = await q.post({
      username: username,
      password: password
    })
    if (!post.Success) throw new Error('User create failed')

    let obj = new User(username);
    return obj;
  }

  static async showUser(where = {}) {
    let q = Request.userRequest();

    let get = await q.get({
      query: where
    })

    return get.Data.map(r => new User(r.username, r.user_details));
  }

  static async getUserDetails(username) {
    let q = Request.userRequest();

    let get = await q.get({
      username: username
    })

    return new User(get.Data.username, get.Data.user_details);
  }

}