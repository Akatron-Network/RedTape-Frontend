import React from 'react'
import { useCurrent } from '../../context/CurrentContext'

export default function Table(props) {  
  return (
    <div className="overflow-x-auto relative shadow-table">
        {/* <table className="w-full text-sm text-left text-pine_tree">
          <thead className="text-xs text-prussian_blue bg-steel_blue_light">
            <tr>
              {props.columns.map((c ,index) =>
                <th key={index} scope="col" className="py-2 px-5 font-bold text-sm">
                  {c}
                </th>
              )}
              <th scope="col" className="py-2 px-5 font-bold text-sm">
                <span className="sr-only">Düzenle</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-100 border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
              <td className="py-[0.20rem] px-5 text-prussian_blue whitespace-nowrap">
                #1
              </td>
              <th className="py-[0.20rem] px-5 text-prussian_blue whitespace-nowrap">
                Apple MacBook Pro 17"
              </th>
              <td className="py-[0.20rem] px-5 text-prussian_blue whitespace-nowrap">
                Sliver
              </td>
              <td className="py-[0.20rem] px-5 text-prussian_blue whitespace-nowrap">
                Laptop
              </td>
              <td className="py-[0.20rem] px-5 text-prussian_blue whitespace-nowrap">
                $2999
              </td>
              <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                <button className='golden-btn shadow-md px-2 w-fit rounded-[4px] active:scale-90'><i className="fa-solid fa-pen-to-square"></i></button>
                <button className='ml-1 danger-btn shadow-md px-2 w-8 rounded-[4px] active:scale-90'><i className="fa-solid fa-xmark"></i></button>
              </td>
            </tr>
          </tbody>
        </table> 
        */}

        {props.data}
        <nav className="flex justify-between items-center py-2 px-4 bg-steel_blue_light h-10" aria-label="Table navigation">
          <span className="text-sm font-normal text-queen_blue"><span className="font-semibold text-prussian_blue">{props.all_currents.length}</span> cari arasından <span className="font-semibold text-prussian_blue">1-15</span> gösteriliyor.</span>
          <ul className="inline-flex items-center -space-x-px text-prussian_blue">
              <li>
                <a href="#" className="py-[2px] px-1 ml-0 mx-[1px] text-pine_tree rounded-l-md hover:bg-alica_blue hover:text-prussian_blue ">
                    <span className="sr-only">Önceki</span>
                    <i className="fa-solid fa-angle-left"></i>
                </a>
              </li>
              <li>
                  <a href="#" className="py-[2px] mx-[1px] px-1 text-pine_tree hover:bg-alica_blue hover:text-prussian_blue ">1</a>
              </li>
              <li>
                  <a href="#" className="py-[2px] mx-[1px] px-1 text-pine_tree hover:bg-alica_blue hover:text-prussian_blue ">2</a>
              </li>
              <li>
                  <a href="#" aria-current="page" className="pointer-events-none z-10 py-[2px] mx-[1px] px-1 text-ghost_white border-2 border-x-0 border-t-0 border-b-prussian_blue hover:bg-alica_blue hover:text-prussian_blue">3</a>
              </li>
              <li>
                  <a href="#" className="py-[2px] mx-[1px] px-1 text-pine_tree hover:bg-alica_blue hover:text-prussian_blue ">...</a>
              </li>
              <li>
                  <a href="#" className="py-[2px] mx-[1px] px-1 text-pine_tree hover:bg-alica_blue hover:text-prussian_blue ">100</a>
              </li>
              <li>
                  <a href="#" className="py-[2px] mx-[1px] px-1 text-pine_tree rounded-r-md hover:bg-alica_blue hover:text-prussian_blue ">
                      <span className="sr-only">Sonraki</span>
											<i className="fa-solid fa-angle-right"></i>
                  </a>
              </li>
          </ul>
      </nav>
    </div>

  )
}
