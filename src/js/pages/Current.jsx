import React from 'react'
import InputDefault from '../components/items/InputDefault'
import InputSelect from '../components/items/InputSelect'
import InputComment from '../components/items/InputComment'
import CariTablo from '../components/cari-kayit/CariTablo'
import PageMainTitle from '../components/items/PageMainTitle'
import PageSubTitle from '../components/items/PageSubTitle'
import { useCurrent } from '../context/CurrentContext'

export default function CariKayit() {
  const current_data = useCurrent();
  console.log(current_data)

  return (
    <>
      <PageMainTitle title={"Cari Kayıt Paneli"} />

      <div className='grid md:grid-cols-3 md:gap-20 grid-cols-1'>
        <div className='grid grid-cols-1 gap-[1px] col-span-1 auto-rows-max'>          
          <PageSubTitle title={"Yeni Cari Oluştur"} /> 

          <div className='col-span-2'><InputDefault name={"Cari Ad"} reference={current_data.currentNameRef} /></div>
          <div className='col-span-2'><InputDefault name={"Adres"} reference={current_data.currentAddressRef} /></div>
          <div className='col-span-2'><InputSelect name={"İl"} reference={current_data.currentProvinceRef} options={current_data.getProvinceList} func={current_data.getDistrictList} /></div>
          <div className='col-span-2'><InputSelect name={"İlçe"} reference={current_data.currentDistrictRef} options={current_data.getProvinceList} /></div>
          <div className='col-span-2'><InputDefault name={"Vergi Dairesi"} reference={current_data.currentTaxOfficeRef} /></div>
          <div className='col-span-2'><InputDefault name={"Vergi Numarası"} reference={current_data.currentTaxNoRef} /></div>
          <div className='col-span-2'><InputDefault name={"TC Kimlik Num."} reference={current_data.currentIDNoRef} /></div>
          <div className='col-span-2'><InputDefault name={"Telefon - 1"} reference={current_data.currentPhoneIRef} /></div>
          <div className='col-span-2'><InputDefault name={"Telefon - 2"} reference={current_data.currentPhoneIIRef} /></div>
          <div className='col-span-2'><InputDefault name={"E-mail Adresi"} reference={current_data.currentMailRef} /></div>
          <div className='col-span-2'><InputDefault name={"Kod 1"} reference={current_data.currentCodeIRef} /></div>
          <div className='col-span-2'><InputDefault name={"Kod 2"} reference={current_data.currentCodeIIRef} /></div>
          <div className='col-span-2'><InputDefault name={"Kod 3"} reference={current_data.currentCodeIIIRef} /></div>
          <div className='col-span-2'><InputDefault name={"Kod 4"} reference={current_data.currentCodeIVRef} /></div>
          <div className='col-span-2 my-4'><InputComment name={"Açıklama"} reference={current_data.currentDescriptionRef} /></div>

          <div>
            <button type="button" className="save-btn ml-2 float-right" onClick={() => current_data.createCurrent()}><i className="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button>
            <button type="button" className="clear-btn float-right" onClick={() => current_data.clearCurrentInputs()}><i className="fa-solid fa-eraser mr-2"></i>Temizle</button>
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
