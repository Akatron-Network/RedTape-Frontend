import React from 'react'
import InputDate from '../components/items/InputDate'
import InputDefault from '../components/items/InputDefault'
import InputSelect from '../components/items/InputSelect'
import InputFilled from '../components/items/InputFilled'
import PageMainTitle from '../components/items/PageMainTitle'
import PageSubTitle from '../components/items/PageSubTitle'
import CariHareketTablo from '../components/cari-hareket/CariHareketTablo'
import { useCurrentActivity } from '../context/CurrentActivityContext'
import AutoSearch from '../components/items/AutoSearch'

export default function CariHareket() {  
  const cur_act_data = useCurrentActivity();
  console.log(cur_act_data)

  return (
    <>
      <PageMainTitle title={"Cari Hareket Paneli"} />
      <PageSubTitle title={"Cari Bilgileri"} />

      <div className='grid md:grid-cols-3 md:gap-5 auto-rows-max'>

        <div className='col-span-2 md:col-span-1 grid grid-cols-1 gap-[1px] auto-rows-max'>

          <div className='flex flex-row col-span-1 mb-2 relative'>
            <span className="w-1/3 shadow-input flex justify-center min-h-[34px] border border-alica_blue_light text-sm items-center bg-steel_blue_light font-medium text-prussian_blue px-1 py-[6px]">Cari Kod / İsim</span>
            <div className='w-2/3 shadow-input relative z-[2]'>
              <input type="text" id='search_input' ref={cur_act_data.curActSearchInputRef} onChange={(e) => cur_act_data.filterCurrents(e)} className="w-full min-h-[34px] py-[6px] pr-9 bg-white border border-white text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-l-none focus:border-shadow_blue focus:ring-transparent block" placeholder="Cari İsim ya da Cari Kod ile arayın" required />
              <button id='search_button' type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
                <i id='search_button_icon' className="fa-solid fa-magnifying-glass text-indigo_dye"></i>
              </button>
            </div>
            <div className={cur_act_data.toggle_filtered_table ? 
              "opacity-100 transition duration-300 absolute overflow-y-auto shadow-button right-0 top-full w-2/3 z-[1] border border-t-0 h-60 border-shadow_blue bg-alica_blue" 
              : "absolute transition duration-300 overflow-y-auto shadow-button right-0 top-full w-2/3 z-[1] border border-t-0 h-60 border-shadow_blue bg-alica_blue opacity-0 pointer-events-none"
            }>
              <AutoSearch data={cur_act_data.filtered_currents} func={cur_act_data.chooseFilteredCurrent} />
            </div>
          </div>

          <div className='col-span-1'><InputDate name={"Başlangıç Tarihi"} reference={cur_act_data.curActGTEDateRef} defaultValue={cur_act_data.date.early} /></div>
          <div className='col-span-1'><InputDate name={"Bitiş Tarihi"} reference={cur_act_data.curActLTEDateRef} defaultValue={cur_act_data.date.current} /></div>

          <div className='float-right my-2'>
            <button onClick={cur_act_data.getCurrentActivity} type="button" className="save-btn float-right"><i className="fa-solid fa-magnifying-glass text-ghost_white mr-2"></i>Bilgileri Getir</button>
          </div>
        </div>

        <div className='grid grid-cols-2 col-span-2 h-fit bg-transparent'>
          <div className='col-span-1'>
            <div className="mb-[1px]"><InputFilled name={"Cari Kod"} reference={cur_act_data.curActIDRef} /></div>
            <div className="mb-[1px]"><InputFilled name={"Cari İsim"} reference={cur_act_data.curActNameRef} /></div>
            <div className="mb-[1px]"><InputFilled name={"Adres"} reference={cur_act_data.curActAddressRef} /></div>
            <div className="mb-[1px]"><InputFilled name={"İl - İlçe"} reference={cur_act_data.curActProvDistRef} /></div>
          </div>
          <div className='col-span-1'>
            <div className="mb-[1px]"><InputFilled name={"Vergi Dairesi - No"} reference={cur_act_data.curActTaxOfficeNoRef} /></div>
            <div className="mb-[1px]"><InputFilled name={"Telefon - 1"} reference={cur_act_data.curActPhoneIRef} /></div>
            <div className="mb-[1px]"><InputFilled name={"Telefon - 2"} reference={cur_act_data.curActPhoneIIRef} /></div>
            <div className="mb-[1px]"><InputFilled name={"E-mail Adresi"} reference={cur_act_data.curActMailRef} /></div>
          </div>
        </div>

        <div className='col-span-3 gap-1 grid grid-cols-5'>
        <div className='col-span-5'><PageSubTitle title={"Cari Hareket Kayıtları"} /></div>
          <div className='col-span-2 xl:col-span-1'><InputDate name={"Tarih"} /></div>
          <div className='col-span-2 xl:col-span-1'><InputDefault name={"Açıklama"} /></div>
          <div className='col-span-2 xl:col-span-1'><InputDate name={"Vade Tarihi"} /></div>
          <div className='col-span-2 xl:col-span-1'><InputSelect name={"Borç-Alacak"} /></div>
          <div className='col-span-2 xl:col-span-1'><InputDefault name={"Tutar"} /></div>
          <div className='float-right my-2 col-span-5'>
            <button type="button" className="save-btn float-right">Cari Hareket Ekle</button>
          </div>  
        </div>      

        <div className='col-span-3'>
          <PageSubTitle title={"Cari Hareket Tablosu"} />
          <CariHareketTablo />
        </div>


      </div>
        
    </>
  )
}
