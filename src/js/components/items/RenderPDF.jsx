import React from 'react'
import logo from '../../../img/esprint-logo.jpg';
import CurrencyFormat from '../../libraries/tools/CurrencyFormat';

RenderPDF.defaultProps = {
  data:{
    total:0,
    list:[],
    head_info: {
      current_name: "",
      phone: "",
      date: "",
      delivery_date: "",
      id: "",
    }
  }
}

export default function RenderPDF(props) {
  const jsx_render = () => {
    return (
        <>
          <div className='flex flex-row justify-between'>
            <div className='w-fit text-left truncate'>
              <span className="truncate text-sm items-center font-medium text-esprint_gray px-1 py-[6px]"><span className='font-bold text-esprint_red'>Müşteri İsim-Soyisim:</span>&nbsp;{props.data.head_info.current_name}</span>
            </div>
            <div className='w-fit text-right truncate'>
              <span className="min-w-[120px] truncate text-sm items-center font-medium text-esprint_gray px-1 py-[6px]"><span className='font-bold text-esprint_red'>Sipariş Tarihi:</span>&nbsp;{props.data.head_info.date}</span>
            </div>
          </div>
          <div className='flex flex-row justify-between'>
            <div className='w-fit truncate text-center'>
              <span className="min-w-[120px] truncate text-sm items-center font-medium text-esprint_gray px-1 py-[6px]"><span className='font-bold text-esprint_red'>Telefon:</span>&nbsp;{props.data.head_info.phone}</span>
            </div>
            <div className='w-fit truncate text-center'>
              <span className="min-w-[120px] truncate text-sm items-center font-medium text-esprint_gray px-1 py-[6px]"><span className='font-bold text-esprint_red'>Teslim Tarihi:</span>&nbsp;{props.data.head_info.delivery_date}</span>
            </div>
          </div>

          <div className='mt-3'>
            <table className='w-full text-xs text-left'>
              <thead>
                <tr>
                  <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white'>ÜRÜN AD</th>
                  <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white'>AÇIKLAMA</th>
                  {/* <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white'>MALZ.</th>
                  <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white'>ÜR. GRUBU</th>
                  <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white'>BİRİM</th> */}
                  <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white'>MİKTAR</th>
                  {/* <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white'>BİRİM FİY.</th> */}
                  <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white'>TUTAR</th>
                  <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white'>KDV ORAN</th>
                  {/* <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white'>KDV TUTAR</th> */}
                  <th className='p-1 border border-neutral-800 bg-esprint_gray text-ghost_white text-center'>TOPLAM TUTAR</th>
                </tr>
              </thead>
              <tbody>
                {props.data.list.map((p, i) => {

                  if (i > 12) return;
                  else {
                    let tax_rate = "%8";
                    if (p.tax_rate === 0) tax_rate = "-"
                    else {tax_rate = "%" + (p.tax_rate) * 100}

                    let stock_name = p.stock_name;
                    if (p.stock_name === undefined) {
                      for (let s of props.stocks) {
                        if (p.stock_id === s.id) {
                          stock_name = s.details.name
                        }
                      }
                    }

                    return (
                      <tr key={i}>
                        <td className='p-1 border border-neutral-800'>{stock_name}</td>
                        <td className='p-1 border border-neutral-800'>{p.description === "" ? "-" : p.description}</td>
                        <td className='p-1 border border-neutral-800'>{CurrencyFormat(parseFloat(p.amount))}</td>
                        <td className='p-1 border border-neutral-800'>{CurrencyFormat(parseFloat(p.price))}</td>
                        <td className='p-1 border border-neutral-800'>{tax_rate}</td>
                        <td className='p-1 border border-neutral-800 text-center'>{CurrencyFormat(parseFloat((p.amount * p.price) * (1 + p.tax_rate)))}</td>
                      </tr>
                    )
                  }
                })}
                
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className='p-1 border border-neutral-800 text-ghost_white text-center bg-esprint_red font-bold'>TOPLAM</td>
                  <td className='p-1 border border-neutral-800 text-center font-bold'>{CurrencyFormat(props.data.total)} TL</td>
                </tr>

              </tbody>
            </table>
          </div>
        </>
      )
    } 

  return (
    <>
      <div ref={props.reference} style={{height: window.innerHeight}} className="w-full p-5">
        
        <div style={{height: (window.innerHeight / 2)}}>
          <div className='flex items-center w-full border-2 border-esprint_gray p-3 relative'>
            <img className='w-[35%]' src={logo} alt="" />
            <div className='flex w-[65%] justify-center'>
              <h1 className='h-fit text-3xl text-esprint_gray'>SİPARİŞ FORMU</h1>
              <h1 className='h-fit text-sm text-esprint_gray absolute right-1 bottom-0 font-bold'><span className='text-esprint_red font-bold'>Sipariş Kodu:</span>&nbsp;{props.data.head_info.id}</h1>
            </div>
          </div>
          <div className='h-[445px] overflow-hidden'>

            {jsx_render()}

          </div>
        </div>


        <div style={{height: (window.innerHeight / 2)}} className='relative top-[75px]'>
          <div className='flex items-center w-full border-2 border-esprint_gray p-3 relative'>
            <img className='w-[35%]' src={logo} alt="" />
            <div className='flex w-[65%] justify-center'>
              <h1 className='h-fit text-3xl text-esprint_gray'>SİPARİŞ FORMU</h1>
              <h1 className='h-fit text-sm text-esprint_gray absolute right-1 bottom-0 font-bold'><span className='text-esprint_red font-bold'>Sipariş Kodu:</span>&nbsp;{props.data.head_info.id}</h1>
            </div>
          </div>
          <div className='h-[445px] overflow-hidden'>

            {jsx_render()}

          </div>
        </div>

      </div>
      
    </>
  )
}
