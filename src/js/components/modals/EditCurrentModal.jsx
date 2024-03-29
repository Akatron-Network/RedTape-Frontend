import React from 'react'
import InputDefault from '../items/InputDefault'
import InputSelect from '../items/InputSelect'
import InputComment from '../items/InputComment'
import PageSubTitle from '../items/PageSubTitle'
import { useCurrent } from '../../context/CurrentContext'
import { useMain } from '../../context/MainContext'

export default function EditCurrentModal() {
  const current_data = useCurrent();
  const { funcLoad } = useMain();

  return (
    <>
      <div id="editCurrentModal" data-modal-target="editCurrentModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-lg md:h-auto">
          <div className="relative bg-ghost_white rounded-md shadow">
            <div className="flex items-start justify-between px-4 pt-3 pb-0 border-b border-steel_blue_light">
              <PageSubTitle title={"Cari Düzenle"} />
              <button type="button" onClick={() => current_data.hideCurrentModal()} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-md p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="p-4 pb-1 grid grid-cols-1 gap-[2px]">
              <div className='col-span-1'><InputDefault type={"text"} name={"Cari İsim"} reference={current_data.currentNameEditRef} /></div>
              <div className='col-span-1'><InputDefault type={"text"} name={"Adres"} reference={current_data.currentAddressEditRef} /></div>
              <div className='col-span-1'><InputSelect name={"İl"} reference={current_data.currentProvinceEditRef} options={current_data.provinces} func={current_data.getDistrictList} /></div>
              <div className='col-span-1'><InputSelect name={"İlçe"} reference={current_data.currentDistrictEditRef} options={current_data.districts} func={() => {}} /></div>
              <div className='col-span-1'><InputDefault type={"text"} name={"Vergi Dairesi"} reference={current_data.currentTaxOfficeEditRef} /></div>
              <div className='col-span-1'><InputDefault type={"text"} name={"Vergi Numarası"} reference={current_data.currentTaxNoEditRef} /></div>
              <div className='col-span-1'><InputDefault type={"text"} name={"TC Kimlik Num."} reference={current_data.currentIDNoEditRef} /></div>
              <div className='col-span-1'><InputDefault type={"text"} name={"Telefon - 1"} reference={current_data.currentPhoneIEditRef} /></div>
              <div className='col-span-1'><InputDefault type={"text"} name={"Telefon - 2"} reference={current_data.currentPhoneIIEditRef} /></div>
              <div className='col-span-1'><InputDefault type={"text"} name={"E-mail Adresi"} reference={current_data.currentMailEditRef} /></div>
              <div className='col-span-1'><InputSelect name={"Cari Tip"} reference={current_data.currentTypeEditRef} options={["BORÇ", "ALACAK"]} func={() => {}} /></div>
              <div className='col-span-1'><InputDefault type={"text"} name={"Kod 1"} reference={current_data.currentCodeIEditRef} /></div>
              <div className='col-span-1'><InputDefault type={"text"} name={"Kod 2"} reference={current_data.currentCodeIIEditRef} /></div>
              <div className='col-span-1'><InputDefault type={"text"} name={"Kod 3"} reference={current_data.currentCodeIIIEditRef} /></div>
              <div className='col-span-1'><InputDefault type={"text"} name={"Kod 4"} reference={current_data.currentCodeIVEditRef} /></div>
              <div className='col-span-1 my-4'><InputComment name={"Açıklama"} reference={current_data.currentDescriptionEditRef} /></div>
            </div>
            <div className="flex items-center p-4 space-x-2 border-t border-steel_blue_light justify-end">
              <button type="button" className="clear-btn float-right" onClick={() => current_data.clearCurrentEditInputs()}><i className="fa-solid fa-eraser mr-2"></i>Temizle</button>
              <button type="button" className="save-btn ml-2 float-right" onClick={() => funcLoad(current_data.editCurrent, current_data.current_details.id)}><i className="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
