import React, { useEffect } from 'react'
import InputDefault from '../components/items/InputDefault'
import InputSelect from '../components/items/InputSelect'
import InputComment from '../components/items/InputComment'
import Table from '../components/items/Table'
import PageMainTitle from '../components/items/PageMainTitle'
import PageSubTitle from '../components/items/PageSubTitle'
import { useCurrent } from '../context/CurrentContext'
import EditCurrentModal from '../components/modals/EditCurrentModal'
import { useMain } from '../context/MainContext'
import { useNavigate } from 'react-router-dom'

export default function Current() {
  const current_data = useCurrent();
  const { adminAll, adminCheck, funcLoad } = useMain();
  
  const navigate = useNavigate();

  useEffect(() => {
    if(!adminAll) navigate("/dashboard")
  }, [adminAll])

  useEffect(() => {
    adminCheck();
    current_data.getProvinceList();
    funcLoad(current_data.showCurrentList);
  }, [])

  return (
    <>
      <PageMainTitle title={"Cari Kayıt Paneli"} />

      <div className='grid md:grid-cols-3 md:gap-20 grid-cols-1'>
        <div className='grid grid-cols-1 gap-[1px] col-span-1 auto-rows-max'>          
          <PageSubTitle title={"Yeni Cari Oluştur"} /> 

          <div className='col-span-2'><InputDefault type={"text"} name={"Cari İsim"} reference={current_data.currentNameRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Adres"} reference={current_data.currentAddressRef} /></div>
          <div className='col-span-2'><InputSelect name={"İl"} reference={current_data.currentProvinceRef} options={current_data.provinces} func={current_data.getDistrictList} /></div>
          <div className='col-span-2'><InputSelect name={"İlçe"} reference={current_data.currentDistrictRef} options={current_data.districts} func={() => {}} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Vergi Dairesi"} reference={current_data.currentTaxOfficeRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Vergi Numarası"} reference={current_data.currentTaxNoRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"TC Kimlik Num."} reference={current_data.currentIDNoRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Telefon - 1"} reference={current_data.currentPhoneIRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Telefon - 2"} reference={current_data.currentPhoneIIRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"E-mail Adresi"} reference={current_data.currentMailRef} /></div>
          <div className='col-span-2'><InputSelect name={"Cari Tip"} reference={current_data.currentTypeRef} options={["BORÇ", "ALACAK"]} func={() => {}} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Kod 1"} reference={current_data.currentCodeIRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Kod 2"} reference={current_data.currentCodeIIRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Kod 3"} reference={current_data.currentCodeIIIRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Kod 4"} reference={current_data.currentCodeIVRef} /></div>
          <div className='col-span-2 my-4'><InputComment name={"Açıklama"} reference={current_data.currentDescriptionRef} /></div>

          <div>
            <button type="button" className="save-btn ml-2 float-right" onClick={() => funcLoad(current_data.createCurrent)}><i className="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button>
            <button type="button" className="clear-btn float-right" onClick={() => current_data.clearCurrentInputs()}><i className="fa-solid fa-eraser mr-2"></i>Temizle</button>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-1 col-span-2 h-fit'>

          <div className="col-span-1 flex flex-row justify-between">
            <PageSubTitle title={"Cari Tablosu"} />
            <div className='flex flex-row shadow-input ellipsis h-[30px]'>
              <span className="w-1/3 truncate flex justify-center min-h-[34px] border border-alica_blue_light text-sm items-center bg-steel_blue_light font-medium text-prussian_blue px-1 py-[6px">Ara<i className="fa-solid fa-magnifying-glass text-indigo_dye ml-2"></i></span>
              <input onChange={(e) => current_data.filterCurrents(e)} type={"text"} className="w-2/3 min-h-[34px] py-[6px] bg-white border border-white text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-l-none focus:border-shadow_blue focus:ring-transparent block" placeholder="Cari Kod / İsim  ile ara..." required />
            </div>
          </div>
          
          <Table data={current_data.render_table} />
        </div>

        <EditCurrentModal />

      </div>
    </>
  )

}
