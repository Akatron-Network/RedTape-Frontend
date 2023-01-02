import React from 'react'
import InputDefault from '../js/components/items/InputDefault'
import InputSelect from '../js/components/items/InputSelect'
import InputComment from '../js/components/items/InputComment'
import CariTablo from '../js/components/cari-kayit/CariTablo'

export default function CariKayit() {
  return (
    <>
      <h1 className='mb-5 text-2xl font-roboto border-b-2 border-beige_light pb-2'>Cari Kayıt Paneli</h1>

      <div className='grid md:grid-cols-3 md:gap-20 grid-cols-1'>
        <div className='grid grid-cols-1 gap-3 gap-x-0 col-span-1 auto-rows-max'>
          
				  <h1 className='text-lg font-roboto'>Yeni Cari Oluştur</h1>

          <div className='col-span-2'><InputDefault name={"Cari Ad"} id={"cari_kod"} /></div>
          <div className='col-span-2'><InputDefault name={"Adres"} id={"adres"} /></div>
          <div className='col-span-2'><InputSelect name={"İl"} id={"il"} /></div>
          <div className='col-span-2'><InputSelect name={"İlçe"} id={"ilce"} /></div>
          <div className='col-span-2'><InputDefault name={"Vergi Dairesi"} id={"vergi_dairesi"} /></div>
          <div className='col-span-2'><InputDefault name={"Vergi Numarası"} id={"vergi_numarasi"} /></div>
          <div className='col-span-2'><InputDefault name={"TC Kimlik Num."} id={"tc"} /></div>
          <div className='col-span-2'><InputDefault name={"Telefon - 1"} id={"tel_1"} /></div>
          <div className='col-span-2'><InputDefault name={"Telefon - 2"} id={"tel_2"} /></div>
          <div className='col-span-2'><InputDefault name={"E-mail Adresi"} id={"e_mail"} /></div>
          <div className='col-span-2'><InputComment name={"Açıklama"} id={"aciklama"} /></div>

        <div className='float-right'>
          <button type="button" class="py-2 transition shadow-md duration-300 float-right px-3 ml-2 text-sm w-fit text-white border border-transparent focus:outline-none bg-kombu_green rounded-[4px] hover:bg-ebony hover:text-white focus:z-10 active:scale-95"><i class="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button>
          <button type="button" class="py-2 transition shadow-md duration-300 float-right px-3 text-sm w-fit text-pine_tree border border-pine_tree focus:outline-none bg-transparent rounded-[4px] hover:bg-beige focus:z-10 active:scale-95"><i class="fa-solid fa-eraser mr-2"></i>Temizle</button>
        </div>

        </div>

        <div className='grid grid-cols-1 gap-3 col-span-2 h-fit'>
				  <h1 className='text-lg font-roboto'>Cari Tablosu</h1>
          <CariTablo />
        </div>

      </div>
    </>
  )

}
