import React from 'react'
import { useOrdersEntry } from '../../context/OrdersEntryContext'
import CurrencyFormat from '../../libraries/tools/CurrencyFormat'
import Tooltip from '../items/Tooltip'

export default function ShowOrdersTable() {
  const {show_table_columns, get_order_items, all_stocks, getProductDetails, removeProduct } = useOrdersEntry();

  const totalFee = () => {
    let total_fee = 0;

    if (get_order_items.length > 0) {

      for (let o of get_order_items) {
        total_fee = total_fee + (o.amount * o.price) + (1 + o.tax_rate)
      }

    }
    
    return CurrencyFormat(total_fee);
  }
  
  return (
    
    <div className="overflow-auto max-h-[639px] shadow-table">
      <table className="w-full text-sm text-left text-pine_tree">

        <thead>
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
            <th scope="col" className="p-2 w-20 h-10 font-bold text-xs sticky top-0 text-prussian_blue bg-steel_blue_light z-10">
              <span className="sr-only">Düzenle</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {get_order_items.map((p, i) => {
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
            console.log(p);
            return (
              <tr key={i} className="bg-gray-100 border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                  {p.row})
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {name === "" ? "-" : name}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {material === "" ? "-" : material}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {product_group === "" ? "-" : product_group}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.unit === "" ? "-" : p.unit}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {CurrencyFormat(parseFloat(p.amount))}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {CurrencyFormat(parseFloat(p.price))}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {CurrencyFormat(parseFloat(p.amount * p.price))}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  %{(p.tax_rate) * 100}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.tax_rate === 0 ? "-" : CurrencyFormat(parseFloat((p.amount * p.price) * p.tax_rate))}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] text-center font-bold">
                  {CurrencyFormat(parseFloat((p.amount * p.price) * (1 + p.tax_rate)))}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.description}
                </td>
                <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                  <Tooltip message={"Siparişi Düzenle"}>
                    <button onClick={() => getProductDetails(p.id)} className='golden-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90'><i className="fa-solid fa-pen-to-square"></i></button>
                  </Tooltip>
                  <Tooltip message={"Siparişi Sil"}>
                    <button onClick={() => removeProduct(p.id)} className='ml-1 danger-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90'><i className="fa-solid fa-xmark"></i></button>
                  </Tooltip>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <nav className="flex justify-between items-center py-2 px-3 bg-steel_blue_light h-10 sticky bottom-0" aria-label="Table navigation">
        <span className="text-sm font-normal text-queen_blue">Toplamda <span className="font-semibold text-prussian_blue">{get_order_items.length}</span> kayıt bulunmaktadır.</span>
        <span className="text-sm font-normal text-queen_blue">Toplam tutar <span className="font-semibold text-prussian_blue">{totalFee()}</span></span>
      </nav>
    </div>
  )
}
