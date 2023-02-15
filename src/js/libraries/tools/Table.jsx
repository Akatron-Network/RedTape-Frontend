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
  
  //? Get button details from table
  setExecuteButtons(btn_details) {
    this.buttons = btn_details;
  }

  //? Render table (Columns, rows, buttons, )
  render() {
    return (
      <>
        <table className="w-full text-sm text-left text-pine_tree">
          <thead className="text-xs text-prussian_blue bg-steel_blue_light">
            <tr>
              {this.columns.map((h, index) => {       //, h = 'Header1'
                // if (h === "order") { h = "" }
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

                    // if (r === "order") { val = d_index + 1 + "." }

                    return(
                      <td key={"r_" + d_index + "_" + r_index} className="py-[0.20rem] px-3 text-prussian_blue">
                        {val}
                      </td>
                    )
                  })}
                  <td key={d_index} className="py-[0.20rem] w-20 px-1 text-prussian_blue text-right">
                    {this.buttons.map((b, b_index) => {
                      let btn = "";

                      if (b.type === "edit") {
                        btn = <button type="button" key={"be_" + d_index + "_" + b_index} onClick={() => b.func(d.id)} data-modal-toggle="editCurrentModal" className={b.class}><i className={b.icon}></i></button>
                      }
                      else if (b.type === "remove") {
                        btn = <button type="button" key={"bx_" + d_index + "_" + b_index} onClick={() => b.func(d.id)} className='ml-1 danger-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90'><i className="fa-solid fa-xmark"></i></button>
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
        <nav className="flex justify-between items-center py-2 px-3 pr-1 bg-steel_blue_light h-10" aria-label="Table navigation">
          <span className="text-sm font-normal text-queen_blue">Toplamda <span className="font-semibold text-prussian_blue">{this.data.length}</span> cari bulunmaktadır.</span>
            {/* <ul className="inline-flex items-center -space-x-px text-prussian_blue">
              <li onClick={() => this.setPageNumbers(this.left_page_num)}>
                <a href="#" className="py-[2px] px-1 ml-0 mx-[1px] text-pine_tree rounded-l-md hover:bg-alica_blue hover:text-prussian_blue ">
                  <span className="sr-only">Önceki</span>
                  <i className="fa-solid fa-angle-left"></i>
                </a>
              </li>
              {this.pages.map((p, index) => {
                return (
                  <li key={index}>
                    <a className="py-[2px] mx-[1px] cursor-pointer px-1 text-pine_tree hover:bg-alica_blue hover:text-prussian_blue ">{p}</a>
                  </li>
                )
              })}
              <li>
                <a href="#" className="pointer-events-none z-10 py-[2px] mx-[1px] px-1 text-shadow_blue border-2 border-x-0 border-t-0 border-b-shadow_blue hover:bg-alica_blue hover:text-prussian_blue">3</a>
              </li>
              <li onClick={() => this.setPageNumbers(this.right_page_num)}>
                <a href="#" className="py-[2px] mx-[1px] px-1 text-pine_tree rounded-r-md hover:bg-alica_blue hover:text-prussian_blue ">
                  <span className="sr-only">Sonraki</span>
                  <i className="fa-solid fa-angle-right"></i>
                </a>
              </li>
            </ul> */}
        </nav>
      </>
    )
  }

  //b STATIC CONSTRUCT METHODS ------------------------------------------------

  //! FOR PAGINATION ----------------------------------
  // getPageNumbers () {
  //   let number = (this.all_currents.length / 15)
  //   let numArr = [];
    
  //   console.log(number);
  //   if (number === parseInt(number)) {      //. Integer check      
  //     for (let p = 1; p < number; p++) {    //. Create number array. [1,2,3,4
  //       numArr.push(p);
  //     }      
  //   }
  //   else {
  //     for (let p = 1; p < number; p++) {   //. Create number array. [1,2,3,4]
  //       numArr.push(p);
  //     }
  //     numArr.push(numArr.length + 1)      //. If number isn't int we added one more page 
  //   }

  //   this.pages = numArr;
  //   return this.pages;
  // }

  // async setPageNumbers (num, where) {
  //   let skip = (num - 1) * 15;
  //   let take = 15;
  //   let dt = await this.getData(skip, take, where)

  //   this.btw_currents = (skip + 1) + "-" + (skip + 15)
  //   this.changePageNumber(num)
  //   return dt;
  // }

  // changePageNumber (num) {
  //   console.log(num);
  //   console.log(this.pages);
  //   if (this.pages.includes(num - 1)) {
  //     this.left_page_num = (num - 1)
  //   }
  //   else {
  //     console.log("a");
  //     this.left_page_num = undefined
  //   }

  //   if (this.pages.includes(num + 1)) {
  //     this.right_page_num = (num + 1)
  //   }
  //   else {
  //     this.right_page_num = undefined
  //   }

  //   console.log(this.right_page_num);
  //   console.log(this.left_page_num);

  // }
  //! ----------------------------------------------
} 