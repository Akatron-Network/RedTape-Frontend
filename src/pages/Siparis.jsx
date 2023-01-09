import React from 'react'
import PageMainTitle from '../js/components/items/PageMainTitle'
import PageSubTitle from '../js/components/items/PageSubTitle'
import InputDate from '../js/components/items/InputDate'
import InputDefault from '../js/components/items/InputDefault'
import InputSelect from '../js/components/items/InputSelect'
import InputSelectNoSpan from '../js/components/items/InputSelectNoSpan'
import InputFilled from '../js/components/items/InputFilled'
import SiparisGirisTablo from '../js/components/siparis-giris/SiparisGirisTablo'
import InputDefaultNoSpan from '../js/components/items/InputDefaultNoSpan'

export default function Siparis() {
  return (
    <>
      <PageMainTitle title={"Sipariş Giriş Paneli"} />

      <div className='grid md:grid-cols-3 md:gap-5 auto-rows-max'>
        <div className='col-span-1'><PageSubTitle title={"Sipariş Üst Bilgileri"} /></div>
        <div className='col-span-1'><PageSubTitle title={"Cari Bilgileri"} /></div>
      </div>

      <div className='grid md:grid-cols-3 md:gap-5 auto-rows-max'>

        <div className='col-span-2 md:col-span-1 grid grid-cols-1 gap-[1px] auto-rows-max'>

          <div className='flex flex-row shadow-input col-span-1'>
            <span className="w-1/3 flex justify-center min-h-[34px] border border-alica_blue_light text-sm items-center bg-steel_blue_light font-medium text-prussian_blue px-1 py-[6px]">Cari İsim / Kod</span>
            <div className='w-2/3 relative'>
              <input type="text" className="w-full min-h-[34px] py-[6px] pr-9 bg-white border border-white text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-l-none focus:border-shadow_blue focus:ring-transparent block" placeholder="Cari İsim ya da Cari Kod ile arayın" required />
              <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
                <i className="fa-solid fa-magnifying-glass text-indigo_dye"></i>
              </button>
            </div>
          </div>
          
          <div className='flex-auto'><InputDate name={"Tarih"} /></div>
          <div className='flex-auto'><InputDefault name={"Sipariş No"} /></div>
          <div className='flex-auto'><InputDate name={"Teslim Tarihi"} /></div>
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
        
        <div className='col-span-3 grid grid-cols-10 grid-flow-row gap-2 mt-4'>
          <div className='col-span-10'><PageSubTitle title={"Ürünler"} /></div>          
          <div className='col-span-2 lg:col-span-1'><InputDefaultNoSpan name={"Ürün Adı"} /></div>
          <div className='col-span-2 lg:col-span-1'><InputDefaultNoSpan name={"Malzeme"} /></div>
          <div className='col-span-2 lg:col-span-1'><InputDefaultNoSpan name={"Malz. Miktar"} /></div>
          <div className='col-span-2 lg:col-span-1'><InputDefaultNoSpan name={"Ürün Grubu"} /></div>
          <div className='col-span-2 lg:col-span-1'><InputDefaultNoSpan name={"Birim"} /></div>
          <div className='col-span-2 lg:col-span-1'><InputDefaultNoSpan name={"Miktar"} /></div>
          <div className='col-span-2 lg:col-span-1'><InputDefaultNoSpan name={"Birim Fiyat"} /></div>
          <div className='col-span-2 lg:col-span-1'><InputSelectNoSpan name={"KDV Oranı"} /></div>
          <div className='col-span-2 lg:col-span-1'><InputDefaultNoSpan name={"Açıklama"} /></div>
          <button className='col-span-2 lg:col-span-1 clear-btn w-full'><i className="fa-solid fa-plus"></i> Ürün Ekle</button>
          <div className="col-span-10 mt-3"><SiparisGirisTablo/></div>
        </div>
        
      </div>
    </>
  )
}
