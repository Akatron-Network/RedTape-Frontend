import React from 'react'
import { useOrdersEntry } from '../../context/OrdersEntryContext'
import CurrencyFormat from '../../libraries/tools/CurrencyFormat'

export default function ShowOrdersTable() {
  const {show_table_columns, show_orders_details, all_stocks, all_orders } = useOrdersEntry();

  const totalFee = () => {
    let total_fee = 0;

    if (show_orders_details.length > 0) {

      for (let o of all_orders) {
        if (o.details.id === show_orders_details[0].order_id) total_fee = o.details.total_fee
      }

    }

    return total_fee;
  }
  
  return (
    
    <div className="overflow-auto max-h-[639px] shadow-table">
      <table className="w-full text-sm text-left text-pine_tree">

        <thead className="">
          <tr>
            {show_table_columns.map((c, i) => {
              let cls = "p-2 font-bold h-10 text-xs text-prussian_blue bg-steel_blue_light sticky top-0"
              if(c === "TOPLAM TUTAR") cls= "p-2 font-bold h-10 text-xs text-prussian_blue bg-steel_blue_light text-center sticky top-0"

              return (
                <th key={i} className={cls}>
                  {c}
                </th>
              )
            })}
            {/* <th scope="col" className="p-2 w-20 font-bold text-xs">
              <span className="sr-only">Düzenle</span>
            </th> */}
          </tr>
        </thead>

        <tbody>
          {show_orders_details.map((p, i) => {
            let name = "";
            let material = "";
            let product_group = "";

            for (let s of all_stocks) {
              if (p.stock_id === s.details.id) {
                name = s.details.name;
                material = s.details.material;
                product_group = s.details.product_group
              }
            }

            return (
              <tr key={i} className="bg-gray-100 border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                  {p.row})
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {name}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {material}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {product_group}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.unit}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.amount}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.price}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {CurrencyFormat(parseFloat(p.amount * p.price))}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  %{(p.tax_rate) * 100}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {CurrencyFormat(parseFloat((p.amount * p.price) * p.tax_rate))}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] text-center font-bold">
                  {CurrencyFormat(parseFloat((p.amount * p.price) + ((p.amount * p.price) * 0.18)))}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.description}
                </td>
                {/* <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                  <Tooltip message={"Siparişi Düzenle"}>
                    <button onClick={() => getProductDetails(p.row)} className='golden-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90'><i className="fa-solid fa-pen-to-square"></i></button>
                  </Tooltip>
                  <Tooltip message={"Siparişi Sil"}>
                    <button onClick={() => removeProduct(p.row)} className='ml-1 danger-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90'><i className="fa-solid fa-xmark"></i></button>
                  </Tooltip>
                </td> */}
              </tr>
            )
          })}
        </tbody>
      </table>
      <nav className="flex justify-between items-center py-2 px-3 bg-steel_blue_light h-10 sticky bottom-0" aria-label="Table navigation">
        <span className="text-sm font-normal text-queen_blue">Toplamda <span className="font-semibold text-prussian_blue">{show_orders_details.length}</span> kayıt bulunmaktadır.</span>
        <span className="text-sm font-normal text-queen_blue">Toplam tutar <span className="font-semibold text-prussian_blue">{totalFee()}</span></span>
      </nav>
    </div>
  )
}