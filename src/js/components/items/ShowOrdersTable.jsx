import React from 'react'
import { useOrdersEntry } from '../../context/OrdersEntryContext'
import Tooltip from './Tooltip'

export default function ShowOrdersTable() {
  const {show_table_columns, all_orders, show_orders_details } = useOrdersEntry();
  
  return (
    
    <div className="overflow-x-auto relative shadow-table">
      <table className="w-full text-sm text-left text-pine_tree">

        <thead className="text-xs text-prussian_blue bg-steel_blue_light">
          <tr>
            {show_table_columns.map((c, i) => {
              let cls = "p-2 font-bold text-xs"
              if(c === "TOPLAM TUTAR") cls= "p-2 font-bold text-xs text-center"

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
            return (
              <tr key={i} className="bg-gray-100 border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                  {p.row})
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.stock_name}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.material}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.product_group}
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
                  {parseFloat((p.amount * p.price)).toFixed(2)}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  %{(p.tax_rate) * 100}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {parseFloat((p.amount * p.price) * p.tax_rate).toFixed(2)}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] text-center font-bold">
                  {parseFloat((p.amount * p.price) + ((p.amount * p.price) * 0.18)).toFixed(2)}
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
      <nav className="flex justify-between items-center py-2 px-3 bg-steel_blue_light h-10" aria-label="Table navigation">
        <span className="text-sm font-normal text-queen_blue">Toplamda <span className="font-semibold text-prussian_blue">{show_orders_details.length}</span> kayıt bulunmaktadır.</span>
        <span className="text-sm font-normal text-queen_blue">Toplam tutar <span className="font-semibold text-prussian_blue">{}</span></span>
      </nav>
    </div>
  )
}
