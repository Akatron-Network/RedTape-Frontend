import React from 'react'
import { useOffersEntry } from '../../context/OffersEntryContext'
import CurrencyFormat from '../../libraries/tools/CurrencyFormat'
import Tooltip from '../items/Tooltip'

export default function ShowOffersTable() {
  const {show_table_columns, get_offer_items, all_stocks, getProductDetails, removeProduct, totalFee } = useOffersEntry();
  
  //. For Tax-Sum and Sub-Sum
  var nav_tax_sum = 0;
  var nav_sum = 0;
  for (let i of get_offer_items) {
    nav_tax_sum = nav_tax_sum + ((i.amount * i.price) * i.tax_rate)
    nav_sum = nav_sum + (i.amount * i.price)
  }

  return (
    
    <div className="overflow-auto max-h-[639px] shadow-table rounded-md border border-alica_blue">
      <table className="w-full text-sm text-left">

        <thead>
          <tr>
            {show_table_columns.map((c, i) => {
              let cls = "p-2 font-normal h-10 text-xs text-ghost_white bg-indigo_dye sticky top-0"
              if(c === "TOPLAM TUTAR") cls = "p-2 pr-5 font-normal h-10 text-xs text-right text-ghost_white bg-indigo_dye sticky top-0"
              else if(c === "BİRİM FİYAT" || c === "TUTAR" || c === "KDV TUTAR" || c === "TUTAR") cls = "p-2 font-normal h-10 text-xs text-right text-ghost_white bg-indigo_dye sticky top-0"
              else if(c === "KDV ORAN") cls = "p-2 font-normal h-10 text-xs text-center text-ghost_white bg-indigo_dye sticky top-0"


              return (
                <th key={i} className={cls}>
                  {c}
                </th>
              )
            })}
            <th scope="col" className="p-2 w-[77px] h-10 font-normal text-xs sticky top-0 text-ghost_white bg-indigo_dye z-10">
              <span className="sr-only">Düzenle</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {get_offer_items.map((p, i) => {
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
            
            if (i%2 === 0) { var row_cls = "bg-white border-b h-9 border-alica_blue hover:bg-steel_blue_light transition duration-300" }
            else { var row_cls = "bg-alica_blue_light border-b h-9 border-alica_blue hover:bg-steel_blue_light transition duration-300" }

            return (
              <tr key={i} className={row_cls}>
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
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] text-right">
                  {<>{CurrencyFormat(parseFloat(p.price))} <i className="fa-solid fa-turkish-lira-sign"></i></>}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] text-right">
                  {<>{CurrencyFormat(parseFloat(p.amount * p.price))} <i className="fa-solid fa-turkish-lira-sign"></i></>}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] text-center">
                  %{(p.tax_rate) * 100}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] text-right">
                  {p.tax_rate === 0 ? "0,00" : CurrencyFormat(parseFloat((p.amount * p.price) * p.tax_rate))} <i className="fa-solid fa-turkish-lira-sign"></i>
                </td>
                <td className="py-[0.20rem] pl-2 pr-5 text-prussian_blue text-[13px] text-right font-bold">
                  {<>{CurrencyFormat(parseFloat((p.amount * p.price) * (1 + p.tax_rate)))} <i className="fa-solid fa-turkish-lira-sign"></i></>}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.description}
                </td>
                <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                  <Tooltip message={"Ürünü Düzenle"}>
                    <button onClick={() => getProductDetails(p.id)} className='golden-btn shadow-md px-1 w-8 rounded-md active:scale-90'><i className="fa-solid fa-pen-to-square"></i></button>
                  </Tooltip>
                  <Tooltip message={"Ürünü Sil"}>
                    <button onClick={() => removeProduct(p.id)} className='ml-1 danger-btn shadow-md px-1 w-8 rounded-md active:scale-90'><i className="fa-solid fa-xmark"></i></button>
                  </Tooltip>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <nav className="flex justify-between items-center py-2 px-3 bg-indigo_dye h-fit sticky bottom-0" aria-label="Table navigation">
        <span className="text-sm font-normal text-steel_blue">Toplamda <span className="font-normal text-alica_blue_middle">{get_offer_items.length}</span> kayıt bulunmaktadır.</span>
        <div className="flex flex-col text-right">
          <span className="text-sm font-normal text-steel_blue">Ara Toplam <span className="font-normal tracking-wide text-alica_blue_middle">{nav_sum === 0 ? "0,00" : CurrencyFormat(nav_sum)}</span> <i className="fa-solid fa-turkish-lira-sign"></i></span>
          <span className="text-sm font-normal text-steel_blue">KDV Tutar <span className="font-normal tracking-wide text-alica_blue_middle">{nav_tax_sum === 0 ? "0,00" : CurrencyFormat(nav_tax_sum)}</span> <i className="fa-solid fa-turkish-lira-sign"></i></span>
          <hr className='border-mn_blue my-[2px]'/>
          <span className="text-sm font-bold text-steel_blue">Toplam Tutar <span className="font-bold tracking-wide text-alica_blue_middle">{totalFee()}</span> <i className="fa-solid fa-turkish-lira-sign"></i></span>
        </div>
      </nav>
    </div>
  )
}
