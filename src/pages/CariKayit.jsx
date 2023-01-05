import React from 'react'
import InputDefault from '../js/components/items/InputDefault'
import InputSelect from '../js/components/items/InputSelect'
import InputComment from '../js/components/items/InputComment'
import CariTablo from '../js/components/cari-kayit/CariTablo'

export default function CariKayit() {
  return (
    <>
      <h1 className='mb-5 text-2xl text-oxford_blue border-b-2 border-alica_blue pb-2'>Cari Kayıt Paneli</h1>

      <div className='grid md:grid-cols-3 md:gap-20 grid-cols-1'>
        <div className='grid grid-cols-1 gap-[2px] col-span-1 auto-rows-max'>
          
				  <h1 className='text-lg text-oxford_blue mb-3'>Yeni Cari Oluştur</h1>

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
          <div className='col-span-2 my-4'><InputComment name={"Açıklama"} id={"aciklama"} /></div>

        <div className='float-right'>
          <button type="button" class="py-1 transition shadow-md duration-300 float-right px-3 ml-2 text-sm w-fit text-ghost_white border border-transparent focus:outline-none bg-indigo_dye rounded-[1px] hover:bg-queen_blue focus:z-10 active:scale-95"><i class="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button>
          <button type="button" class="py-1 transition shadow-md duration-300 float-right px-3 text-sm w-fit text-prussian_blue border border-transparent focus:outline-none bg-shadow_blue rounded-[1px] hover:bg-steel_blue hover:text-mn_blue focus:z-10 active:scale-95"><i class="fa-solid fa-eraser mr-2"></i>Temizle</button>
        </div>

        </div>

        <div className='grid grid-cols-1 gap-1 col-span-2 h-fit'>
				  <h1 className='text-lg text-oxford_blue mb-3'>Cari Tablosu</h1>
          <CariTablo />
        </div>

      </div>
    </>
  )

}
