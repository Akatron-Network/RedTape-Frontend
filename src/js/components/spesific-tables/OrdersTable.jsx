import React from 'react'
import { useOrders } from '../../context/OrdersContext'
import CurrencyFormat from '../../libraries/tools/CurrencyFormat';
import Tooltip from '../items/Tooltip'

export default function OrdersTable() {
  const {table_columns, product_list, removeProduct, getProductDetails, table_total} = useOrders();
  
  return (
    
    <div className="overflow-auto max-h-[639px] shadow-table">
      <table className="w-full text-sm text-left text-pine_tree">

        <thead>
          <tr>
            {table_columns.map((c, i) => {
              let cls = "p-2 font-bold h-10 text-xs text-prussian_blue bg-steel_blue_light sticky top-0"
              if(c === "TOPLAM TUTAR") cls= "p-2 font-bold h-10 text-xs text-center text-prussian_blue bg-steel_blue_light sticky top-0"

              return (
                <th key={i} className={cls}>
                  {c}
                </th>
              )
            })}
            <th scope="col" className="p-2 w-20 font-bold h-10 text-xs text-prussian_blue bg-steel_blue_light sticky top-0">
              <span className="sr-only">Düzenle</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {product_list.map((p, i) => {
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
                  {CurrencyFormat(p.price)}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {CurrencyFormat(p.amount_sum)}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  %{(p.tax_rate) * 100}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.tax_sum === 0 ? "-" : CurrencyFormat(p.tax_sum)}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] text-center font-bold">
                  {CurrencyFormat(p.total)}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.description}
                </td>
                <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                  <Tooltip message={"Ürünü Düzenle"}>
                    <button onClick={() => getProductDetails(p.row)} className='golden-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90'><i className="fa-solid fa-pen-to-square"></i></button>
                  </Tooltip>
                  <Tooltip message={"Ürünü Sil"}>
                    <button onClick={() => removeProduct(p.row)} className='ml-1 danger-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90'><i className="fa-solid fa-xmark"></i></button>
                  </Tooltip>
                </td>
              </tr>
            )
          })}

        </tbody>
      </table>
      <nav className="flex justify-between items-center py-2 px-3 bg-steel_blue_light h-10 sticky bottom-0" aria-label="Table navigation">
        <span className="text-sm font-normal text-queen_blue">Toplamda <span className="font-semibold text-prussian_blue">{product_list.length}</span> kayıt bulunmaktadır.</span>
        <span className="text-sm font-normal text-queen_blue">Toplam tutar <span className="font-semibold text-prussian_blue">{CurrencyFormat(table_total)}</span></span>
      </nav>
    </div>
  )
}
