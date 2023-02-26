import React from 'react'

export default function SiparisGorevTablo() {
  return (
    <>
      <div className="overflow-x-auto relative shadow-table">
          <table className="w-full text-sm text-left text-pine_tree">
              <thead className="text-xs text-prussian_blue bg-steel_blue_light">
                  <tr>
                    <th scope="col" className="p-2 font-bold text-xs">
                        #
                    </th>
                    <th scope="col" className="py-2 px-2 font-bold text-sm">
                        SİPARİŞ NO
                    </th>
                    <th scope="col" className="py-2 px-2 font-bold text-sm">
                        TARİH
                    </th>
                    <th scope="col" className="py-2 px-2 font-bold text-sm">
                        CARİ İSİM
                    </th>
                    <th scope="col" className="py-2 px-2 font-bold text-sm">
                        AÇIKLAMA
                    </th>
                    <th scope="col" className="py-2 px-2 font-bold text-sm">
                        <span className="sr-only">Düzenle</span>
                    </th>
                  </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-100 border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                        1.
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue font-medium whitespace-nowrap ">
                        Apple MacBook Pro 17"
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        Sliver
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        Laptop
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        $2999
                    </td>
                    
                    <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                        <button className='clear-btn px-2 w-fit rounded-[4px] shadow-md active:scale-90'><i className="fa-solid fa-handshake-simple"></i></button>
                    </td>
                </tr>
                <tr className="bg-gray-100 border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                        2.
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue font-medium whitespace-nowrap ">
                        Apple MacBook Pro 17"
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        Sliver
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        Laptop
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        $2999
                    </td>
                    
                    <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                        <button className='clear-btn px-2 w-fit rounded-[4px] shadow-md active:scale-90'><i className="fa-solid fa-handshake-simple"></i></button>
                    </td>
                </tr>
                <tr className="bg-gray-100 border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                        3.
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue font-medium whitespace-nowrap ">
                        Apple MacBook Pro 17"
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        Sliver
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        Laptop
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        $2999
                    </td>
                    
                    <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                        <button className='clear-btn px-2 w-fit rounded-[4px] shadow-md active:scale-90'><i className="fa-solid fa-handshake-simple"></i></button>
                    </td>
                </tr>
              </tbody>
          </table>
      </div>
    </>
  )
}
