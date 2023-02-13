export default class Table {
  //, let tbl = new Table(Current.showCurrent, ['Cari Ad'], ['name'])
  //, tbl.addCalcColumn([(<btn>$name</btn>)])
  //, tbl.render()

  constructor(method, columns = [], rows = []) {
    this.method = method,
    this.columns = columns,
    this.rows = rows
  }

  async getData() {
    this.query = {
      skip: undefined,
      take: undefined,
      where: {}
    }
    // get data from method and save as this.data
    let c = await (this.method)(this.query)
    return c;
  }

  //. method = function()
  //. columns = ['Header1', 'Header2']
  //. rows = ['key', 'key2']

  //. data = [{ id: 1, details: {...}  }]

  async render() {
    for (let h of this.columns) {
      // h = 'Header1'
    }

    if (!this.data) await this.getData()

    for (let d of this.data) {
      // d = { id: 1, details: {...} }
      for (let k of this.rows) {
        // k = 'key' in details
        let val = d.details[k]
        // value to write
      }
    }
  }

  //b STATIC CONSTRUCT METHODS ------------------------------------------------

} 