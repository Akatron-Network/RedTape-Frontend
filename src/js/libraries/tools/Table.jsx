export default class Table {
  constructor(method, columns = [], rows = []) {
    this.method = method,   //, Method name (Current.showCurrent)
    this.columns = columns, //, Column names []
    this.rows = rows        //, Rows names   []
  }

  //? Get data from method and save as this.data
  async getData(skip, take, where) {
    this.query = {
      skip: skip,
      take: take,
      where: where
    }
    
    this.data = await this.method(this.query)
    return this.data;
  }

  setExecuteButtons(btn_details) {
    this.buttons = btn_details;
  }

  render() {
    return (
      <table className="w-full text-sm text-left text-pine_tree">
        <thead className="text-xs text-prussian_blue bg-steel_blue_light">
          <tr>
            {this.columns.map((h, index) => {       //, h = 'Header1'
              if (h === "order") {
                h = ""
              }
              return (
                <th key={index} className="py-2 px-3 font-bold text-sm">
                  {h}
                </th>
              )
            })}
            <th className="py-2 px-3 w-20 font-bold text-sm">
              <span className="sr-only">Düzenle</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.data.map((d, d_index) => {        // d = { id: 1, details: {...} }
            return (
              <tr key={"d_" + d_index} className="bg-gray-100 border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
                {this.rows.map((r, r_index) => {  //, k = 'key' in details
                  let val = d.details[r];

                  if (r === "order") { val = d_index + 1 + "." }

                  return(
                    <td key={"r_" + d_index + "_" + r_index} className="py-[0.20rem] px-3 text-prussian_blue">
                      {val}
                    </td>
                  )
                })}
                <td className="py-[0.20rem] w-20 px-1 text-prussian_blue text-right">
                  {this.buttons.map((b, b_index) => {
                    let btn = "";

                    if (b.type === "edit") {
                      btn = <button key={"be_" + d_index + "_" + b_index} onClick={() => b.func(d.id)} className={b.class}><i className={b.icon}></i></button>
                    }
                    else if (b.type === "remove") {
                      btn = <button key={"bx_" + d_index + "_" + b_index} onClick={() => b.func(d.id)} className='ml-1 danger-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90'><i className="fa-solid fa-xmark"></i></button>
                    }

                    return(
                      <>
                        {btn}
                      </>
                    )
                  })}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  //b STATIC CONSTRUCT METHODS ------------------------------------------------

} 