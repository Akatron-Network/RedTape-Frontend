import React from 'react'
import InputDate from '../components/items/InputDate'
import InputDefault from '../components/items/InputDefault'
import InputSelect from '../components/items/InputSelect'
import InputFilled from '../components/items/InputFilled'
import PageMainTitle from '../components/items/PageMainTitle'
import PageSubTitle from '../components/items/PageSubTitle'
import CariHareketTablo from '../components/cari-hareket/CariHareketTablo'


export default function CariHareket() {  

  return (
    <>
      <PageMainTitle title={"Cari Hareket Paneli"} />
      <PageSubTitle title={"Cari Bilgileri"} />

      <div className='grid md:grid-cols-3 md:gap-5 auto-rows-max'>

        <div className='col-span-2 md:col-span-1 grid grid-cols-1 gap-[1px] auto-rows-max'>

          <div className='flex flex-row shadow-input col-span-1 mb-2'>
            <span className="w-1/3 flex justify-center min-h-[34px] border border-alica_blue_light text-sm items-center bg-steel_blue_light font-medium text-prussian_blue px-1 py-[6px]">Cari İsim / Kod</span>
            <div className='w-2/3 relative'>
              <input type="text" className="w-full min-h-[34px] py-[6px] pr-9 bg-white border border-white text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-l-none focus:border-shadow_blue focus:ring-transparent block" placeholder="Cari İsim ya da Cari Kod ile arayın" required />
              <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
                <i className="fa-solid fa-magnifying-glass text-indigo_dye"></i>
              </button>
            </div>
          </div>

          <div className='col-span-1'><InputDate name={"Başlangıç Tarihi"} type={"baslangic"} /></div>
          <div className='col-span-1'><InputDate name={"Bitiş Tarihi"} type={"bitis"} /></div>

          <div className='float-right my-2'>
            <button type="button" className="save-btn float-right"><i className="fa-solid fa-magnifying-glass text-ghost_white mr-2"></i>Bilgileri Getir</button>
          </div>
        </div>

        <div className='grid grid-cols-2 col-span-2 h-fit bg-transparent'>
          <div className='col-span-1'>
            <div className="mb-[1px]"><InputFilled name={"Cari Kod"} /></div>
            <div className="mb-[1px]"><InputFilled name={"Cari İsim"} /></div>
            <div className="mb-[1px]"><InputFilled name={"Adres"} /></div>
            <div className="mb-[1px]"><InputFilled name={"İl - İlçe"} /></div>
          </div>
          <div className='col-span-1'>
            <div className="mb-[1px]"><InputFilled name={"Vergi Dairesi - No"} /></div>
            <div className="mb-[1px]"><InputFilled name={"Telefon - 1"} /></div>
            <div className="mb-[1px]"><InputFilled name={"Telefon - 2"} /></div>
            <div className="mb-[1px]"><InputFilled name={"E-mail Adresi"} /></div>
          </div>
        </div>

        <div className='col-span-3 flex flex-wrap gap-1'>
          <div className='w-full'><PageSubTitle title={"Cari Hareket Kayıtları"} /></div>
          <div className='flex-auto'><InputDate name={"Tarih"} /></div>
          <div className='flex-auto'><InputDefault name={"Açiklama"} /></div>
          <div className='flex-auto'><InputDate name={"Vade Tarihi"} /></div>
          <div className='flex-auto'><InputSelect name={"Borç-Alacak"} /></div>
          <div className='flex-auto'><InputDefault name={"Tutar"} /></div>  

          <div className='float-right my-2 w-full'>
            <button type="button" className="save-btn float-right">Cari Hareket Ekle</button>
          </div>        
        </div>

        <div className='col-span-3'>
          <PageSubTitle title={"Cari Hareket Kayıtları"} />
          <CariHareketTablo />
        </div>


      </div>
        
    </>
  )
}
