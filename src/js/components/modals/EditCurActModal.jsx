import React from 'react'
import InputDefault from '../items/InputDefault'
import InputSelect from '../items/InputSelect'
import InputDate from '../items/InputDate'
import PageSubTitle from '../items/PageSubTitle'
import { useCurrentActivity } from '../../context/CurrentActivityContext'
import { useMain } from '../../context/MainContext'

export default function EditCurrentActivityModal() {
  const cur_act_data = useCurrentActivity();
  const { funcLoad } = useMain();

  return (
    <>
      <div id="editCurActModal" data-modal-target="editCurActModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-lg md:h-auto">
          <div className="relative bg-ghost_white rounded-md shadow">
            <div className="flex items-start justify-between px-4 pt-3 pb-0 border-b border-steel_blue_light">
              <PageSubTitle title={"Cari Hareket Düzenle"} />
              <button type="button" onClick={() => cur_act_data.hideCurActModal()} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-md p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="p-4 grid grid-cols-1 gap-[2px]">
              <div className='col-span-1'><InputDate name={"Tarih"} reference={cur_act_data.curActDateEditRef} /></div>
              <div className='col-span-1'><InputDefault type={"text"} name={"Açıklama"} reference={cur_act_data.curActDescriptionEditRef} /></div>
              <div className='col-span-1'><InputDate name={"Vade Tarihi"} reference={cur_act_data.curActExpiryDateEditRef}/></div>
              <div className='col-span-1'><InputSelect name={"Borç-Alacak"} reference={cur_act_data.curActDebtAmountEditRef} options={["Borç", "Alacak"]} func={() => {}} /></div>
              <div className='col-span-1'><InputDefault type={"number"} name={"Tutar"} reference={cur_act_data.curActBalanceEditRef} /></div>
            </div>
            <div className="flex items-center p-4 space-x-2 border-t border-steel_blue_light justify-end">
              <button type="button" className="clear-btn float-right" onClick={() => cur_act_data.clearCurActEditInputs()}><i className="fa-solid fa-eraser mr-2"></i>Temizle</button>
              <button type="button" className="save-btn ml-2 float-right" onClick={() => funcLoad(cur_act_data.editCurrentActivity, cur_act_data.cur_act_details.id)}><i className="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
