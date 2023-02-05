import axios from 'axios';

export default class Request {

  constructor(func_name) {
    this.func_name = func_name;
    this.base_url = "http://debiapi.akatron.net:999/" + this.func_name;
  }

  static routes = {
    login: "login",
    register: "register",
    user: "user"
  }

  static loginRequest() { return new Request(Request.routes.login) }
  static registerRequest() { return new Request(Request.routes.register) }
  static userRequest() { return new Request(Request.routes.user) }

  async get(data) {

    let resp = await axios({
        method: 'get',
        url: this.base_url,
        params: data,
        headers: {token: localStorage.token, "Content-Type": "application/json"}
    })
    console.log(resp)
    return resp.data;
    
  }

  async post(data) {

    let resp = await axios({
        method: 'post',
        url: this.base_url,
        data: data,
        headers: {token: localStorage.token, "Content-Type": "application/json"}
    })
    console.log(resp)
    return resp.data;

  }

  async put(data) {

    let resp = await axios({
        method: 'put',
        url: this.base_url,
        data: data,
        headers: {token: localStorage.token, "Content-Type": "application/json"}
    })
    console.log(resp)
    return resp.data;

  }

  async delete(data) {

    let resp = await axios({
        method: 'delete',
        url: this.base_url,
        data: data,
        headers: {token: localStorage.token, "Content-Type": "application/json"}
    })
    console.log(resp)
    return resp.data;

  }
}

