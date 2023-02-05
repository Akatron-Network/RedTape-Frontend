import React from 'react'

export default function GorevTakibiTablo() {
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
                        CARİ AD
                    </th>
                    <th scope="col" className="py-2 px-2 font-bold text-sm">
                        SİPARİŞ TARİHİ
                    </th>
                    <th scope="col" className="py-2 px-2 font-bold text-sm">
                        TESLİM TARİHİ
                    </th>
                    <th scope="col" className="py-2 px-2 font-bold text-sm">
                        KALAN GÜN
                    </th>
                    <th scope="col" className="py-2 px-2 font-bold text-sm">
                        SORUMLU
                    </th>
                    <th scope="col" className="py-2 px-2 font-bold text-sm">
                        SİPARİŞ DURUMU
                    </th>
                    <th scope="col" className="py-2 px-2 font-bold text-sm">
                        SON GÜNCELLEME
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
                        12D12312E
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        ABCDEFG
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        06.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        10.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        4
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        HAKAN
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        Üzerinde Çalışılıyor
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        09.12.2022
                    </td>
                    <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                        <button className='golden-btn px-2 w-fit rounded-[4px] shadow-md active:scale-90'><i className="fa-solid fa-pen-nib"></i></button>
                    </td>
                </tr>
                <tr className="bg-gray-100 border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                        2.
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue font-medium whitespace-nowrap ">
                        12D12312E
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        ABCDEFG
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        06.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        10.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        4
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        HAKAN
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        Üzerinde Çalışılıyor
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        09.12.2022
                    </td>
                    <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                        <button className='golden-btn px-2 w-fit rounded-[4px] shadow-md active:scale-90'><i className="fa-solid fa-pen-nib"></i></button>
                    </td>
                </tr>
                <tr className="bg-green-300 border-b h-9 border-alica_blue hover:bg-green-400 transition duration-300">
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                        3.
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue font-medium whitespace-nowrap ">
                        12D12312E
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        ABCDEFG
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        06.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        10.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        4
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        HAKAN
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        Teslim Edildi
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        09.12.2022
                    </td>
                    <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                        <button className='golden-btn px-2 w-fit rounded-[4px] shadow-md active:scale-90'><i className="fa-solid fa-pen-nib"></i></button>
                    </td>
                </tr>
                <tr className="bg-gray-100 border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                        4.
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue font-medium whitespace-nowrap ">
                        12D12312E
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        ABCDEFG
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        06.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        10.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        4
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        HAKAN
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        Üzerinde Çalışılıyor
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        09.12.2022
                    </td>
                    <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                        <button className='golden-btn px-2 w-fit rounded-[4px] shadow-md active:scale-90'><i className="fa-solid fa-pen-nib"></i></button>
                    </td>
                </tr>
                <tr className="bg-red-400 border-b h-9 border-alica_blue hover:bg-red-500 transition duration-300">
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                        5.
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue font-medium whitespace-nowrap ">
                        12D12312E
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        ABCDEFG
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        06.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        10.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        4
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        HAKAN
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        Gecikti
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        09.12.2022
                    </td>
                    <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                        <button className='golden-btn px-2 w-fit rounded-[4px] shadow-md active:scale-90'><i className="fa-solid fa-pen-nib"></i></button>
                    </td>
                </tr>
                <tr className="bg-gray-100 border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                        6.
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue font-medium whitespace-nowrap ">
                        12D12312E
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        ABCDEFG
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        06.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        10.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        4
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        HAKAN
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        Üzerinde Çalışılıyor
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        09.12.2022
                    </td>
                    <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                        <button className='golden-btn px-2 w-fit rounded-[4px] shadow-md active:scale-90'><i className="fa-solid fa-pen-nib"></i></button>
                    </td>
                </tr>
                <tr className="bg-gray-100 border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                        7.
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue font-medium whitespace-nowrap ">
                        12D12312E
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        ABCDEFG
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        06.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        10.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        4
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        HAKAN
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        Üzerinde Çalışılıyor
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        09.12.2022
                    </td>
                    <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                        <button className='golden-btn px-2 w-fit rounded-[4px] shadow-md active:scale-90'><i className="fa-solid fa-pen-nib"></i></button>
                    </td>
                </tr>
                <tr className="bg-green-300 border-b h-9 border-alica_blue hover:bg-green-400 transition duration-300">
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                        8.
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue font-medium whitespace-nowrap ">
                        12D12312E
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        ABCDEFG
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        06.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        10.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        4
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        HAKAN
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        Teslim Edildi
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        09.12.2022
                    </td>
                    <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                        <button className='golden-btn px-2 w-fit rounded-[4px] shadow-md active:scale-90'><i className="fa-solid fa-pen-nib"></i></button>
                    </td>
                </tr>
                <tr className="bg-gray-100 border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300">
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                        9.
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue font-medium whitespace-nowrap ">
                        12D12312E
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        ABCDEFG
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        06.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        10.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        4
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        HAKAN
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        Üzerinde Çalışılıyor
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        09.12.2022
                    </td>
                    <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                        <button className='golden-btn px-2 w-fit rounded-[4px] shadow-md active:scale-90'><i className="fa-solid fa-pen-nib"></i></button>
                    </td>
                </tr>
                <tr className="bg-red-400 border-b h-9 border-alica_blue hover:bg-red-500 transition duration-300">
                    <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold">
                        10.
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue font-medium whitespace-nowrap ">
                        12D12312E
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        ABCDEFG
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        06.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        10.12.2022
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        4
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        HAKAN
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        Gecikti
                    </td>
                    <td className="py-[0.20rem] px-2 text-prussian_blue">
                        09.12.2022
                    </td>
                    <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                        <button className='golden-btn px-2 w-fit rounded-[4px] shadow-md active:scale-90'><i className="fa-solid fa-pen-nib"></i></button>
                    </td>
                </tr>
              </tbody>
          </table>
        <nav className="flex justify-between items-center py-2 px-4 bg-steel_blue_light h-10" aria-label="Table navigation">
          <span className="text-sm font-normal text-queen_blue"><span className="font-semibold text-prussian_blue">1000</span> görev arasından <span className="font-semibold text-prussian_blue">1-10</span> gösteriliyor.</span>
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
    </>
  )
}
