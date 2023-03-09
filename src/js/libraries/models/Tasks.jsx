import Request from "../Request";

export default class Tasks {
  constructor(id, details) {
    this.id = id,
    this.details = details
  }

  //b STATIC CONSTRUCT METHODS ------------------------------------------------
  static async showTasks (query) {
    let t = Request.tasksRequest();
    let queryStringify = JSON.stringify(query)

    let show = await t.get({
      query: queryStringify
    })
    if(!show.Success) throw new Error('Show tasks failed')

    let obj = show.Data.map(r => new Tasks(r.id, r.details))
    return obj;
  }

  static async createTask (data) {
    let t = Request.tasksRequest();

    let create = await t.post({
      operation: "create",
      data: data
    });
    if (!create.Success) throw new Error('Create task failed')

    let obj = new Tasks(create.Data.id, create.Data.details)
    return obj;
  }

  static async completeStep (data) {
    let t = Request.tasksRequest();

    let complete = await t.post({
      operation: "complateStep",
      data: data
    });
    if (!complete.Success) throw new Error('Complete step failed')

    let obj = new Tasks(complete.Data.id, complete.Data.details)
    return obj;
  }

  static async cancelStep (data) {
    let t = Request.tasksRequest();

    let cancel = await t.post({
      operation: "cancelStep",
      data: data
    });
    if (!cancel.Success) throw new Error('Cancel step failed')

    let obj = new Tasks(cancel.Data.id, cancel.Data.details)
    return obj;
  }

  static async completeTask (data) {
    let t = Request.tasksRequest();

    let complete = await t.post({
      operation: "complateTask",
      data: data
    });
    if (!complete.Success) throw new Error('Complete task failed')

    let obj = new Tasks(complete.Data.id, complete.Data.details)
    return obj;
  }

  static async reOpenTask (data) {
    let t = Request.tasksRequest();

    let re_open = await t.post({
      operation: "reOpenTask",
      data: data
    });
    if (!re_open.Success) throw new Error('Re-Open task failed')

    let obj = new Tasks(re_open.Data.id, re_open.Data.details)
    return obj;
  }

  static async cancelTask (data) {
    let t = Request.tasksRequest();

    let cancel = await t.post({
      operation: "cancelTask",
      data: data
    });
    if (!cancel.Success) throw new Error('Cancel task failed')

    let obj = new Tasks(cancel.Data.id, cancel.Data.details)
    return obj;
  }

}