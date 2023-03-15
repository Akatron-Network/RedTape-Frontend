import CurrencyFormat from './CurrencyFormat'
import Tooltip from '../../components/items/Tooltip'

export default class Table {
  constructor(method, columns = [], rows = []) {
    this.method = method,   //, Method name (Current.showCurrent)
    this.columns = columns, //, Column names []
    this.rows = rows        //, Rows names   []
  }

  //? Get data from method and save as this.data
  async getData(skip, take, where) {
    this.query = {
      skip: 0,
      take: 1000,
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
          <thead>
            <tr>
              {this.columns.map((h, index) => {       //, h = 'Header1'
                // if (h === "order") { h = "" }

                let cls = "py-2 px-3 h-10 font-bold text-xs sticky top-0 text-prussian_blue bg-steel_blue_light z-10"

                if (h === "NET BAKİYE" || h === "BORÇ TUTARI" || h === "ALACAK TUTARI") {
                  cls = "py-2 px-3 font-bold h-10 text-xs sticky top-0 text-prussian_blue bg-steel_blue_light z-10 text-right w-[170px]"
                }

                if (h === "CARİ İSİM") {
                  cls = "py-2 px-3 h-10 w-[390px] font-bold text-xs sticky top-0 text-prussian_blue bg-steel_blue_light z-10"
                }

                if (h === "BİRİM 2") {
                  cls = "py-2 px-3 h-10 min-w-[70px] font-bold text-xs sticky top-0 text-prussian_blue bg-steel_blue_light z-10"
                }

                return (
                  <th key={index} className={cls}>
                    {h}
                  </th>
                )

              })}
              <th className="py-2 px-3 w-20 h-10 font-bold text-xs sticky top-0 text-prussian_blue bg-steel_blue_light z-10">
                <span className="sr-only">Düzenle</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.data.map((d, d_index) => {        // d = { id: 1, details: {...} }
              return (
                <tr key={"d_" + d_index} className="bg-gray-100 border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
                  {this.rows.map((r, r_index) => {  //, (r = "order")
                    let val = d.details[r];
                    let cls = "py-[0.20rem] px-3 text-prussian_blue"

                    if (r === "date" || r === "expiry_date") {  //. Remove timezone from date
                      val = val.split("T")[0]
                    }

                    if (r === "register_date" || r === "lastlogin_date") {
                      val = val.split("T")[0] + " - " + val.split('T')[1].split('.')[0]
                    }
                    
                    if (r === "admin") {
                      if (d.details[r] === true) val = "Yetkili"
                      else val = "Yetkili Değil"
                    }


                    if (r === "debt" || r === "amount" || r === "balance") {      //. Differenct css for keys

                      if (r === "debt" && d.details["balance"] > 0) {             //. Render in BORÇ TUTARI column
                        val = d.details["balance"]
                        cls = "py-[0.20rem] px-3 text-prussian_blue text-right"
                      }
                      else if (r === "amount" && d.details["balance"] < 0) {      //. Render in ALACAK TUTARI column
                        val = d.details["balance"]
                        cls = "py-[0.20rem] px-3 text-prussian_blue text-right"
                      }
  
                      if (r === "balance" && d.details["balance"] > 0) {          //. Green background according to balance
                        cls = "py-[0.20rem] px-3 text-prussian_blue text-right bg-green-300"
                      }
                      else if (r === "balance" && d.details["balance"] < 0) {     //. Red background according to balance
                        cls = "py-[0.20rem] px-3 text-prussian_blue text-right bg-red-300"
                      }
                      val = CurrencyFormat(val)

                      return(
                        <td key={"r_" + d_index + "_" + r_index} className={cls}>
                          {val} {/* For TL  ( ₺ ) */}
                        </td>
                      )

                    }
                    else {
                      return(
                        <td key={"r_" + d_index + "_" + r_index} className={cls}>
                          {val}
                        </td>
                      )
                    }

                  })}
                  <td key={d_index} className="py-[0.20rem] w-20 px-1 text-prussian_blue text-right">
                    {this.buttons.map((b, b_index) => {
                      let btn = "";

                      if (b.type === "show") {
                        
                        btn = <Tooltip message={"Görüntüle"}>
                                <button type="button" key={"be_" + d_index + "_" + b_index} onClick={() => b.func(d)} className={b.class}><i className={b.icon}></i></button>
                              </Tooltip>

                      }
                      else if (b.type === "edit") {
                          
                        btn = <Tooltip message={"Düzenle"}>
                                <button type="button" key={"bx_" + d_index + "_" + b_index} onClick={() => b.func(d)} className={b.class}><i className={b.icon}></i></button>
                              </Tooltip>

                      }
                      else if (b.type === "remove") {
                          
                        btn = <Tooltip message={"Sil"}>
                                <button type="button" key={"bx_" + d_index + "_" + b_index} onClick={() => b.func(d)} className={b.class}><i className={b.icon}></i></button>
                              </Tooltip>

                      }

                      return(
                        <> {btn} </>
                      )
                    })}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <nav className="flex justify-between items-center py-2 px-3 pr-1 bg-steel_blue_light h-10 text-xs sticky bottom-0 text-prussian_blue z-10" aria-label="Table navigation">
          <span className="text-sm font-normal text-queen_blue">Toplamda <span className="font-semibold text-prussian_blue">{this.data.length}</span> kayıt bulunmaktadır.</span>
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
  //   if (this.pages.includes(num - 1)) {
  //     this.left_page_num = (num - 1)
  //   }
  //   else {
  //     this.left_page_num = undefined
  //   }

  //   if (this.pages.includes(num + 1)) {
  //     this.right_page_num = (num + 1)
  //   }
  //   else {
  //     this.right_page_num = undefined
  //   }

  // }
  //! ----------------------------------------------
} 