import React, { useEffect } from 'react'
import InputDefault from '../components/items/InputDefault';
import PageMainTitle from '../components/items/PageMainTitle';
import PageSubTitle from '../components/items/PageSubTitle';
import { useAdminPanel } from '../context/AdminPanelContext';
import Table from '../components/items/Table';
import EditUserModal from '../components/modals/EditUserModal';
import { useMain } from '../context/MainContext';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const admin_panel_data = useAdminPanel();
  const { adminAll, adminCheck, funcLoad } = useMain();
  
  const navigate = useNavigate();

  useEffect(() => {
    if(!adminAll) navigate("/dashboard")
  }, [adminAll])

  useEffect(() => {
    adminCheck();
    funcLoad(admin_panel_data.showUserList);
  }, [])

  return (
    <>
      <PageMainTitle title={"Admin Paneli"} icon={<i className="fa-solid fa-user-tie"></i>} />

      <div className='grid md:grid-cols-3 md:gap-20 grid-cols-1'>
        <div className='grid grid-cols-1 gap-[2px] col-span-1 auto-rows-max'>          
          <PageSubTitle title={"Yeni Kullanıcı Oluştur"} /> 

          <div className='col-span-2'><InputDefault type={"text"} name={"Kullanıcı Adı"} reference={admin_panel_data.userNameRef} /></div>
          <div className='col-span-2'><InputDefault type={"password"} name={"Parola"} reference={admin_panel_data.userPasswordRef} /></div>
          <div className='col-span-2'>
            <div className="flex items-center mt-[6px] ml-[2px]">
              <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-indigo_dye bg-gray-200 border-gray-400 rounded focus:ring-0" />
              <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-prussian_blue">Yetkili <span className='text-xs text-queen_blue'>(Eğer seçilirse kullanıcı tüm yetkilere sahip olacaktır)</span></label>
            </div>
          </div>
          <div id='passwordWarn' className="col-span-2 mt-2 mb-1 text-right hidden"><span className='text-sm text-red-600'><span className='font-bold'>Hata:</span> Şifre 7 karakterden kısa olamaz!</span></div>
          <div className='mt-2'>
            <button type="button" className="save-btn ml-2 float-right" onClick={() => funcLoad(admin_panel_data.createUser)}><i className="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button>
            <button type="button" className="clear-btn float-right" onClick={() => admin_panel_data.clearUserInputs()}><i className="fa-solid fa-eraser mr-2"></i>Temizle</button>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-1 col-span-2 h-fit'>
          <PageSubTitle title={"Kullanıcı Tablosu"} /> 
          <Table data={admin_panel_data.render_table} />
        </div>

        <EditUserModal />

      </div>
    </>
  )
}
