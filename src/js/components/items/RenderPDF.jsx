import React from 'react'
import logo from '../../../img/esprint-logo.jpg';

export default function RenderPDF(props) {

  return (
    <>
      {/* <button onClick={handlePrint}>Yazdır</button> */}
      <div ref={props.reference} style={{height: window.innerHeight}} className="w-full p-5">
        
        <div style={{height: (window.innerHeight / 2)}}>
          <div className='flex items-center w-full border-2 border-esprint_gray p-3'>
            <img className='w-[35%]' src={logo} alt="" />
            <h1 className='h-fit text-3xl text-esprint_gray w-[65%] text-center'>SİPARİŞ FORMU</h1>
          </div>
          <div className='h-[445px] overflow-hidden'>

            <div className='flex flex-row justify-between'>
              <div className='w-fit text-left truncate'>
                <span className="truncate text-sm items-center font-medium text-esprint_gray px-1 py-[6px]"><span className='font-bold text-esprint_red'>Müşteri İsim-Soyisim:</span>&nbsp;Hakan TEMUR</span>
              </div>
              <div className='w-fit max-w-[250px] text-right truncate'>
                <span className="min-w-[120px] truncate text-sm items-center font-medium text-esprint_gray px-1 py-[6px]"><span className='font-bold text-esprint_red'>Sipariş Tarihi:</span>&nbsp;21.12.2023 / 12:00</span>
              </div>
            </div>
            <div className='flex flex-row justify-between'>
              <div className='w-fit max-w-[190px] truncate text-center'>
                <span className="min-w-[120px] truncate text-sm items-center font-medium text-esprint_gray px-1 py-[6px]"><span className='font-bold text-esprint_red'>Telefon:</span>&nbsp;+90005393498686</span>
              </div>
              <div className='w-fit max-w-[250px] truncate text-center'>
                <span className="min-w-[120px] truncate text-sm items-center font-medium text-esprint_gray px-1 py-[6px]"><span className='font-bold text-esprint_red'>Teslim Tarihi:</span>&nbsp;22.12.2023 / 12:00</span>
              </div>
            </div>

            <div className='mt-3'>
              <table className='w-full text-xs text-left'>
                <thead>
                  <tr>
                    <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white'>DENEME</th>
                    <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white'>DENEME</th>
                    <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white'>DENEME</th>
                    <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white'>DENEME</th>
                    <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white'>DENEME</th>
                    <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white'>DENEME</th>
                    <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white'>DENEME</th>
                    <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white'>DENEME</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                  </tr>
                  <tr>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                  </tr>
                  <tr>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                  </tr>
                  <tr>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                  </tr>
                  <tr>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                  </tr>
                  <tr>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                  </tr>
                  <tr>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                  </tr>
                  <tr>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                  </tr>
                  <tr>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                  </tr>
                  <tr>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                  </tr>
                  <tr>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                  </tr>
                  <tr>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                  </tr>
                  <tr>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                    <td className='p-1 border border-neutral-800'>DENEME</td>
                  </tr>
                  
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <th></th>
                    <th></th>
                    <th className='p-1 border border-neutral-800 text-ghost_white text-center bg-esprint_red'>TOPLAM</th>
                    <th className='p-1 border border-neutral-800 text-center'>554 TL</th>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>

        <div style={{height: (window.innerHeight / 2)}} className='relative top-[75px]'>
          <div className='flex items-center w-full border-2 border-esprint_gray p-3'>
            <img className='w-[35%]' src={logo} alt="" />
            <h1 className='h-fit text-3xl text-esprint_gray w-[65%] text-center'>SİPARİŞ FORMU</h1>
          </div>
          <div className='h-[445px] overflow-hidden'>

            <div className='flex flex-row justify-between'>
              <div className='w-fit text-left truncate'>
                <span className="truncate text-sm items-center font-medium text-esprint_gray px-1 py-[6px]"><span className='font-bold text-esprint_red'>Müşteri İsim-Soyisim:</span>&nbsp;Hakan TEMUR</span>
              </div>
              <div className='w-fit max-w-[250px] text-right truncate'>
                <span className="min-w-[120px] truncate text-sm items-center font-medium text-esprint_gray px-1 py-[6px]"><span className='font-bold text-esprint_red'>Sipariş Tarihi:</span>&nbsp;21.12.2023 / 12:00</span>
              </div>
            </div>
            <div className='flex flex-row justify-between'>
              <div className='w-fit max-w-[190px] truncate text-center'>
                <span className="min-w-[120px] truncate text-sm items-center font-medium text-esprint_gray px-1 py-[6px]"><span className='font-bold text-esprint_red'>Telefon:</span>&nbsp;+90005393498686</span>
              </div>
              <div className='w-fit max-w-[250px] truncate text-center'>
                <span className="min-w-[120px] truncate text-sm items-center font-medium text-esprint_gray px-1 py-[6px]"><span className='font-bold text-esprint_red'>Teslim Tarihi:</span>&nbsp;22.12.2023 / 12:00</span>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </>
  )
}
