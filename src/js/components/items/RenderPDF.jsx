import React, {useRef} from 'react'
import {useReactToPrint} from 'react-to-print';
import logo from '../../../img/esprint-logo.jpg';

export default function RenderPDF() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Deneme 1',
  });

  return (
    <>
      <button onClick={handlePrint}>Yazdır</button>
      <div ref={componentRef} style={{height: window.innerHeight}} className="w-full p-5">
        
        <div style={{height: (window.innerHeight / 2)}}>
          <div className='flex items-center w-full border-2 border-esprint_gray p-3'>
            <img className='w-1/2' src={logo} alt="" />
            <h1 className='h-fit text-3xl text-esprint_gray w-1/2 text-center'>SİPARİŞ FORMU</h1>
          </div>
          <div>
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
          </div>
        </div>

        <div style={{height: (window.innerHeight / 2)}} className='relative top-[65px]'>
          <div className='flex items-center w-full border-2 border-esprint_gray p-3'>
            <img className='w-1/2' src={logo} alt="" />
            <h1 className='h-fit text-3xl text-esprint_gray w-1/2 text-center'>SİPARİŞ FORMU</h1>
          </div>
          <div>
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
            <br />
            A
          </div>
        </div>
        
      </div>
    </>
  )
}
