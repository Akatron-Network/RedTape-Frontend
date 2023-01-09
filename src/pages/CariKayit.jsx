import React from 'react'
import InputDefault from '../js/components/items/InputDefault'
import InputSelect from '../js/components/items/InputSelect'
import InputComment from '../js/components/items/InputComment'
import CariTablo from '../js/components/cari-kayit/CariTablo'
import PageMainTitle from '../js/components/items/PageMainTitle'
import PageSubTitle from '../js/components/items/PageSubTitle'

export default function CariKayit() {
  return (
    <>
      <PageMainTitle title={"Cari Kayıt Paneli"} />

      <div className='grid md:grid-cols-3 md:gap-20 grid-cols-1'>
        <div className='grid grid-cols-1 gap-[1px] col-span-1 auto-rows-max'>          
          <PageSubTitle title={"Yeni Cari Oluştur"} /> 

          <div className='col-span-2'><InputDefault name={"Cari Ad"} /></div>
          <div className='col-span-2'><InputDefault name={"Adres"} /></div>
          <div className='col-span-2'><InputSelect name={"İl"} /></div>
          <div className='col-span-2'><InputSelect name={"İlçe"} /></div>
          <div className='col-span-2'><InputDefault name={"Vergi Dairesi"} /></div>
          <div className='col-span-2'><InputDefault name={"Vergi Numarası"} /></div>
          <div className='col-span-2'><InputDefault name={"TC Kimlik Num."} /></div>
          <div className='col-span-2'><InputDefault name={"Telefon - 1"} /></div>
          <div className='col-span-2'><InputDefault name={"Telefon - 2"} /></div>
          <div className='col-span-2'><InputDefault name={"E-mail Adresi"} /></div>
          <div className='col-span-2 my-4'><InputComment name={"Açıklama"} /></div>

        <div>
          <button type="button" className="save-btn ml-2 float-right"><i className="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button>
          <button type="button" className="clear-btn float-right"><i className="fa-solid fa-eraser mr-2"></i>Temizle</button>
        </div>

        </div>

        <div className='grid grid-cols-1 gap-1 col-span-2 h-fit'>
          <PageSubTitle title={"Cari Tablosu"} /> 
          <CariTablo />
        </div>

      </div>
    </>
  )

}
