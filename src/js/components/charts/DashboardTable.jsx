import React from 'react'
import { useDashboard } from '../../context/DashboardContext';

export default function DashboardTable() {
  const { dashboard_charts_info } = useDashboard();

  return (
    
    <div id="table_chart_card_table" className="shadow-lg overflow-auto rounded-md border border-alica_blue relative">
      <table className="w-full text-sm text-left text-pine_tree">

        <thead>
          <tr>
            <th className="p-2 h-10 font-normal text-xs sticky top-0 text-ghost_white bg-indigo_dye z-10">CARİ KOD</th>
            <th className="p-2 h-10 font-normal text-xs sticky top-0 text-ghost_white bg-indigo_dye z-10">CARİ İSİM</th>
            <th className="p-2 h-10 font-normal text-xs sticky top-0 text-ghost_white bg-indigo_dye z-10">TELEFON</th>
            <th className="p-2 h-10 font-normal text-xs sticky top-0 text-ghost_white bg-indigo_dye z-10 text-right">NET BAKİYE</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(dashboard_charts_info.table).length > 0 ? dashboard_charts_info.table.map((c, i) => {
            
            if (i%2 === 0) { var row_cls = "bg-white border-b h-9 border-alica_blue hover:bg-steel_blue_light transition duration-300" }
            else { var row_cls = "bg-alica_blue_light border-b h-9 border-alica_blue hover:bg-steel_blue_light transition duration-300" }

            if (c.balance > 0) { var balance_cls = "py-[0.20rem] px-2 text-prussian_blue text-[13px] text-right font-bold bg-green-500"}
            else { var balance_cls = "py-[0.20rem] px-2 text-prussian_blue text-[13px] text-right font-bold bg-eggplant_light" }

            return (
              <tr key={i} className={row_cls}>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                  {c.current.details.id}
                </td>                
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {c.current.details.name}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {c.current.details.phone}
                </td>
                <td className={balance_cls}>
                  {c.balance.toFixed(2)} <i className="fa-solid fa-turkish-lira-sign"></i>
                </td>
              </tr>
            )
          }) : undefined}
        </tbody>
      </table>
      <nav className="flex justify-start items-center py-2 px-3 bg-indigo_dye h-10 bottom-[-1px] sticky" aria-label="Table navigation">
        <span className="text-sm font-normal text-steel_blue">Toplamda <span className="font-normal text-alica_blue_middle">{dashboard_charts_info.table.length > 0 ? dashboard_charts_info.table.length : 0}</span> kayıt bulunmaktadır.</span>
        <span className="text-xs font-normal text-shadow_blue">&nbsp; (Bakiyesi 0 <i className="fa-solid fa-turkish-lira-sign"></i> olanlar gösterilmeyecektir.)</span>
      </nav>
    </div>
    
  )
}
