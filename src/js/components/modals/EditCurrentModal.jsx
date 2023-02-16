import React from 'react'
import InputDefault from '../items/InputDefault'
import InputSelect from '../items/InputSelect'
import InputComment from '../items/InputComment'
import PageSubTitle from '../items/PageSubTitle'
import { useCurrent } from '../../context/CurrentContext'

export default function EditCurrentModal() {
  const current_data = useCurrent();
  console.log(current_data)

  return (
    <>
      <div id="editCurrentModal" data-modal-target="editCurrentModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-lg md:h-auto">
          <div className="relative bg-ghost_white rounded-sm shadow">
            <div className="flex items-start justify-between px-5 pt-3 pb-0 border-b border-steel_blue_light rounded-t">
              <PageSubTitle title={"Cari Düzenle"} />
              <button type="button" onClick={() => current_data.hideCurrentModal()} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-sm p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="pt-4 px-5 grid grid-cols-1 gap-[1px]">
              <div className='col-span-1'><InputDefault name={"Cari Ad"} reference={current_data.currentNameEditRef} /></div>
              <div className='col-span-1'><InputDefault name={"Adres"} reference={current_data.currentAddressEditRef} /></div>
              <div className='col-span-1'><InputSelect name={"İl"} reference={current_data.currentProvinceEditRef} options={current_data.provinces} func={current_data.getDistrictList} /></div>
              <div className='col-span-1'><InputSelect name={"İlçe"} reference={current_data.currentDistrictEditRef} options={current_data.districts} func={() => {}} /></div>
              <div className='col-span-1'><InputDefault name={"Vergi Dairesi"} reference={current_data.currentTaxOfficeEditRef} /></div>
              <div className='col-span-1'><InputDefault name={"Vergi Numarası"} reference={current_data.currentTaxNoEditRef} /></div>
              <div className='col-span-1'><InputDefault name={"TC Kimlik Num."} reference={current_data.currentIDNoEditRef} /></div>
              <div className='col-span-1'><InputDefault name={"Telefon - 1"} reference={current_data.currentPhoneIEditRef} /></div>
              <div className='col-span-1'><InputDefault name={"Telefon - 2"} reference={current_data.currentPhoneIIEditRef} /></div>
              <div className='col-span-1'><InputDefault name={"E-mail Adresi"} reference={current_data.currentMailEditRef} /></div>
              <div className='col-span-1'><InputDefault name={"Kod 1"} reference={current_data.currentCodeIEditRef} /></div>
              <div className='col-span-1'><InputDefault name={"Kod 2"} reference={current_data.currentCodeIIEditRef} /></div>
              <div className='col-span-1'><InputDefault name={"Kod 3"} reference={current_data.currentCodeIIIEditRef} /></div>
              <div className='col-span-1'><InputDefault name={"Kod 4"} reference={current_data.currentCodeIVEditRef} /></div>
              <div className='col-span-1 my-4'><InputComment name={"Açıklama"} reference={current_data.currentDescriptionEditRef} /></div>
            </div>
            <div className="flex items-center px-5 py-3 space-x-2 border-t border-steel_blue_light rounded-b justify-end">
              <button type="button" className="clear-btn float-right" onClick={() => current_data.clearCurrentEditInputs()}><i className="fa-solid fa-eraser mr-2"></i>Temizle</button>
              <button type="button" className="save-btn ml-2 float-right" onClick={() => current_data.editCurrent(current_data.current_details.id)}><i className="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
