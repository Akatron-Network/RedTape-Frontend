import React from 'react'
import InputDefault from '../items/InputDefault'
import PageSubTitle from '../items/PageSubTitle'
import { useAdminPanel } from '../../context/AdminPanelContext';
import { useMain } from '../../context/MainContext';
import InputFilledOldVersion from '../items/InputFilledOldVersion';

export default function EditUserModal() {
  const admin_panel_data = useAdminPanel();
  const { funcLoad } = useMain();

  return (
    <>
      <div id="editUserModal" data-modal-target="editUserModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-lg md:h-auto">
          <div className="relative bg-ghost_white rounded-md shadow">
            <div className="flex items-start justify-between px-4 pt-3 pb-0 border-b border-steel_blue_light ">
              <PageSubTitle title={"Kullanıcı Düzenle"} />
              <button type="button" onClick={() => admin_panel_data.hideUserModal()} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-md p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>
            
            <div className="p-4 grid grid-cols-1 gap-[2px]">
              <div className='col-span-1'><InputFilledOldVersion type={"text"} name={"Kullanıcı Adı"} reference={admin_panel_data.userNameEditRef} /></div>
              <div className='col-span-1'><InputDefault type={"password"} name={"Parola"} reference={admin_panel_data.userPasswordEditRef} /></div>
              <div className='col-span-1'>
                <div className="flex items-center mt-[6px] ml-[2px]">
                  <input id="default-checkbox-edit" type="checkbox" value="" className="w-4 h-4 text-indigo_dye bg-gray-200 border-gray-400 rounded focus:ring-0" />
                  <label htmlFor="default-checkbox-edit" className="ml-2 text-sm font-medium text-prussian_blue">Yetkili <span className='text-xs text-queen_blue'>(Eğer seçilirse kullanıcı tüm yetkilere sahip olacaktır)</span></label>
                </div>
              </div>
              <div id='passwordEditWarn' className="col-span-1 mt-2 mb-1 text-right hidden"><span className='text-sm text-red-600'><span className='font-bold'>Hata:</span> Şifre 7 karakterden kısa olamaz!</span></div>
            </div>

            <div className="flex items-center p-4 space-x-2 border-t border-steel_blue_light justify-end">
              <button type="button" className="clear-btn float-right" onClick={() => admin_panel_data.clearUserEditInputs()}><i className="fa-solid fa-eraser mr-2"></i>Temizle</button>
              <button type="button" className="save-btn ml-2 float-right" onClick={() => funcLoad(admin_panel_data.editUser, admin_panel_data.chosen_user_details.username)}><i className="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
