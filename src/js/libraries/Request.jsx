import axios from 'axios';

export default class Request {

  constructor(func_name) {
    this.func_name = func_name;
    this.base_url = "http://debiapi.akatron.net:999/" + this.func_name;
    // this.base_url = "http://127.0.0.1:999/" + this.func_name;
    // this.base_url = "http://192.168.127.16:999/" + this.func_name;
    // this.base_url = "http://93.180.133.185:999/" + this.func_name;
  }

  static routes = {
    login: "login",
    register: "register",
    user: "user",
    current: "current",
    current_act: "current_act",
    stock: "stock",
    order: "order",
    tasks: "task"
  }

  static loginRequest() { return new Request(Request.routes.login) }
  static registerRequest() { return new Request(Request.routes.register) }
  static userRequest() { return new Request(Request.routes.user) }
  static currentRequest() { return new Request(Request.routes.current) }
  static currentActRequest() { return new Request(Request.routes.current_act) }
  static stocktRequest() { return new Request(Request.routes.stock) }
  static orderRequest() { return new Request(Request.routes.order) }
  static tasksRequest() { return new Request(Request.routes.tasks) }

  async get(data) {

    let resp = await axios({
        method: 'get',
        url: this.base_url,
        params: data,
        headers: {token: localStorage.token, "Content-Type": "application/json"}
    })
    return resp.data;
    
  }

  async post(data) {

    let resp = await axios({
        method: 'post',
        url: this.base_url,
        data: data,
        headers: {token: localStorage.token, "Content-Type": "application/json"}
    })
    
    return resp.data;

  }

  async put(data) {

    let resp = await axios({
        method: 'put',
        url: this.base_url,
        data: data,
        headers: {token: localStorage.token, "Content-Type": "application/json"}
    })
    
    return resp.data;

  }

  async delete(data) {

    let resp = await axios({
        method: 'delete',
        url: this.base_url,
        data: data,
        headers: {token: localStorage.token, "Content-Type": "application/json"}
    })
    
    return resp.data;

  }
}

