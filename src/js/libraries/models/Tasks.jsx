import Request from "../Request";

export default class Tasks {
  constructor(id, details) {
    this.id = id,
    this.details = details
  }
  

  //b STATIC CONSTRUCT METHODS ------------------------------------------------
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

}