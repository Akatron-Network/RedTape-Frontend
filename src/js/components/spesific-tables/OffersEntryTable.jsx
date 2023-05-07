import React from 'react'
import { useMain } from '../../context/MainContext';
import { useOffersEntry } from '../../context/OffersEntryContext'
import CurrencyFormat from '../../libraries/tools/CurrencyFormat';
import Tooltip from '../items/Tooltip';

export default function OffersEntryTable() {
  const { table_columns, filtered_offers, all_currents, getOfferDetails, removeOffer, printPDF } = useOffersEntry();
  const { funcLoad } = useMain();
  
  return (
    
    <div className="shadow-table overflow-auto max-h-[730px] rounded-md border border-alica_blue">
      <table className="w-full text-sm text-left text-pine_tree">

        <thead>
          <tr>
            {table_columns.map((c, i) => {
              let cls = "p-2 h-10 font-normal text-xs sticky top-0 text-ghost_white bg-indigo_dye z-10"
              if(c === "TOPLAM TUTAR") cls= "p-2 pr-5 h-10 font-normal text-xs text-right sticky top-0 text-ghost_white bg-indigo_dye z-10"

              return (
                <th key={i} className={cls}>
                  {c}
                </th>
              )
            })}
            <th scope="col" className="p-2 h-10 w-[116px] font-normal text-xs sticky top-0 text-ghost_white bg-indigo_dye z-10">
              <span className="sr-only">Düzenle</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered_offers.map((p, i) => {

            let cur_name = "";
            for (let c of all_currents) {
              if (p.details.current_id !== null) {
                if (p.details.current_id === c.details.id) {
                  cur_name = c.details.name
                }
              }
              else {
                cur_name = p.details.unregistered_current.name
              }
            }

            let cur_id = "Yeni Müşteri";
            let state_cls = "py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold"
            if (p.details.current_id !== null) { cur_id = p.details.current_id; state_cls = "py-[0.20rem] px-2 text-prussian_blue text-[13px]" }

            if (i%2 === 0) { var row_cls = "bg-white border-b h-9 border-alica_blue hover:bg-steel_blue_light transition duration-300" }
            else { var row_cls = "bg-alica_blue_light border-b h-9 border-alica_blue hover:bg-steel_blue_light transition duration-300" }
            
            return (
              <tr key={i} className={row_cls}>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.id}
                </td>
                <td className={state_cls}>
                  {cur_id}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {cur_name}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.order_source}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.invoiced === true ? "Faturalı" : "Faturasız"}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.date.split("T")[0]}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.delivery_date.split("T")[0]}
                </td>
                <td className="py-[0.20rem] pl-2 pr-5 text-prussian_blue text-[13px] text-right font-bold">
                  {CurrencyFormat(p.details.total_fee)} <i className="fa-solid fa-turkish-lira-sign"></i>
                </td>
                <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                  <Tooltip message={"Yazdır"}>
                    <button type='button' onClick={() => funcLoad(printPDF, p)} className='ml-1 render-btn shadow-md px-1 w-8 rounded-md active:scale-90'><i className="fa-solid fa-print"></i></button>
                  </Tooltip>
                  <Tooltip message={"Siparişi Düzenle"}>
                    <button type='button' onClick={() => funcLoad(getOfferDetails, p.details.id)} className='ml-1 golden-btn shadow-md px-1 w-8 rounded-md active:scale-90'><i className="fa-solid fa-pen-to-square"></i></button>
                  </Tooltip>
                  <Tooltip message={"Siparişi Sil"}>
                    <button type='button' onClick={() => funcLoad(removeOffer, p.details.id)} className='ml-1 danger-btn shadow-md px-1 w-8 rounded-md active:scale-90'><i className="fa-solid fa-xmark"></i></button>
                  </Tooltip>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <nav className="flex justify-between items-center py-2 px-3 bg-indigo_dye h-10 bottom-[-1px] sticky" aria-label="Table navigation">
        <span className="text-sm font-normal text-steel_blue">Toplamda <span className="font-normal text-alica_blue_middle">{filtered_offers.length}</span> kayıt bulunmaktadır.</span>
      </nav>
    </div>
    
  )
}
