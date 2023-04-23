import React, { useEffect } from 'react'
import InputDate from '../components/items/InputDate'
import InputDefault from '../components/items/InputDefault'
import InputSelect from '../components/items/InputSelect'
import InputFilled from '../components/items/InputFilled'
import PageMainTitle from '../components/items/PageMainTitle'
import PageSubTitle from '../components/items/PageSubTitle'
import { useCurrentActivity } from '../context/CurrentActivityContext'
import AutoSearch from '../components/items/AutoSearch'
import Table from '../components/items/Table'
import EditCurActModal from '../components/modals/EditCurActModal'
import { useMain } from '../context/MainContext'
import { useNavigate } from 'react-router-dom'

export default function CurrentActivity() {  
  const cur_act_data = useCurrentActivity();
  const { adminAll, adminCheck, funcLoad } = useMain();
  
  const navigate = useNavigate();

  useEffect(() => {
    if(!adminAll) navigate("/dashboard")
  }, [adminAll])

  useEffect(() => {
    adminCheck();
    funcLoad(cur_act_data.getAllCurrents);
    cur_act_data.getDate();
    document.addEventListener('click', cur_act_data.toggleFilteredTable);

    return () => {
      document.removeEventListener('click', cur_act_data.toggleFilteredTable);  //. When click outside close filtered table

      cur_act_data.dispatch({     //. Reset rendered table
        type: 'RENDER_TABLE',
        render: (
          <>
            <table className="w-full text-sm text-left text-pine_tree">
              <thead className="text-xs text-prussian_blue bg-steel_blue_light">
                <tr>
                  <th className="py-2 px-3 font-bold text-sm">TARİH</th>
                  <th className="py-2 px-3 font-bold text-sm">AÇIKLAMA</th>
                  <th className="py-2 px-3 font-bold text-sm">VADE TARİHİ</th>
                  <th className="py-2 px-3 font-bold text-sm text-right w-[170px]">BORÇ TUTARI</th>
                  <th className="py-2 px-3 font-bold text-sm text-right w-[170px]">ALACAK TUTARI</th>
                  <th className="py-2 px-3 font-bold text-sm text-right w-[170px]">NET BAKİYE</th>
                  <th className="py-2 px-3 w-20 font-bold text-sm"><span className="sr-only">Düzenle</span></th>
                </tr>
              </thead>
            </table>
            <nav className="flex justify-between items-center py-2 px-3 pr-1 bg-steel_blue_light h-10" aria-label="Table navigation">
              <span className="text-sm font-normal text-queen_blue">Toplamda <span className="font-semibold text-prussian_blue">0</span> kayıt bulunmaktadır.</span>
            </nav>
          </>
        )
      })

      cur_act_data.dispatch({     //. Reset all activities to 
        type: 'CURRENT_ACTIVITY',
        value: []
      })

      cur_act_data.dispatch({
        type: 'CHOSEN_CURRENT',
        value: {}
      })
    }
  }, [])

  return (
    <>
      <PageMainTitle title={"Cari Hareket Paneli"} />
      <PageSubTitle title={"Cari Bilgileri"} />

      <div className='grid md:grid-cols-3 md:gap-5 auto-rows-max'>

        <div className='col-span-2 md:col-span-1 grid grid-cols-1 gap-[2px] auto-rows-max'>

          <div className='flex flex-row col-span-1 mb-2 relative'>
            <span className="w-1/3 shadow-input flex justify-center min-h-[34px] border border-alica_blue text-sm items-center bg-indigo_dye font-medium text-ghost_white px-1 py-[6px] rounded-l-md">Cari Kod / İsim</span>
            <div className='w-2/3 shadow-input relative z-[2] rounded-r-md'>
              <input type="text" id='search_input' autoComplete='off' ref={cur_act_data.curActSearchInputRef} onChange={(e) => cur_act_data.filterCurrents(e)} className="w-full min-h-[34px] py-[6px] pr-9 bg-white border border-alica_blue text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-r-md focus:border-indigo_dye focus:ring-transparent block" placeholder="Cari İsim ya da Cari Kod ile arayın" required />
              <button id='search_button' type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
                <i id='search_button_icon' className="fa-solid fa-magnifying-glass text-indigo_dye"></i>
              </button>
            </div>
            <div className={cur_act_data.toggle_filtered_table ? 
              "opacity-100 transition duration-300 absolute overflow-y-auto shadow-button right-0 top-full w-2/3 z-[1] border border-t-0 h-60 border-shadow_blue bg-alica_blue rounded-md" 
              : "absolute transition duration-300 overflow-y-auto shadow-button right-0 top-full w-2/3 z-[1] border border-t-0 h-60 border-shadow_blue bg-alica_blue opacity-0 pointer-events-none rounded-md"
            }>
              <AutoSearch data={cur_act_data.filtered_currents} func={cur_act_data.chooseFilteredCurrent} cols={["Cari Kod", "Cari İsim"]} />
            </div>
          </div>

          <div className='col-span-1'><InputDate name={"Başlangıç Tarihi"} reference={cur_act_data.curActGTEDateRef} defaultValue={cur_act_data.date.early} /></div>
          <div className='col-span-1'><InputDate name={"Bitiş Tarihi"} reference={cur_act_data.curActLTEDateRef} defaultValue={cur_act_data.date.current} /></div>

          <div className='float-right my-2'>
            <button onClick={() => funcLoad(cur_act_data.getCurrentActivity)} type="button" className="save-btn float-right"><i className="fa-solid fa-magnifying-glass text-ghost_white mr-2"></i>Bilgileri Getir</button>
          </div>
        </div>

        <div className='grid grid-cols-2 col-span-2 h-fit bg-transparent'>
          <div className='col-span-1 mr-[2px]'>
            <div className="mb-[2px]"><InputFilled name={"Cari Kod"} reference={cur_act_data.curActIDRef} /></div>
            <div className="mb-[2px]"><InputFilled name={"Cari İsim"} reference={cur_act_data.curActNameRef} /></div>
            <div className="mb-[2px]"><InputFilled name={"Adres"} reference={cur_act_data.curActAddressRef} /></div>
            <div className="mb-[2px]"><InputFilled name={"İl - İlçe"} reference={cur_act_data.curActProvDistRef} /></div>
          </div>
          <div className='col-span-1'>
            <div className="mb-[2px]"><InputFilled name={"Vergi Dairesi - No"} reference={cur_act_data.curActTaxOfficeNoRef} /></div>
            <div className="mb-[2px]"><InputFilled name={"Telefon - 1"} reference={cur_act_data.curActPhoneIRef} /></div>
            <div className="mb-[2px]"><InputFilled name={"Telefon - 2"} reference={cur_act_data.curActPhoneIIRef} /></div>
            <div className="mb-[2px]"><InputFilled name={"E-mail Adresi"} reference={cur_act_data.curActMailRef} /></div>
          </div>
        </div>

        <div className='col-span-3 gap-1 grid grid-cols-5'>
        <div className='col-span-5'><PageSubTitle title={"Cari Hareket Kayıtları"} /></div>
          <div className='col-span-2 xl:col-span-1'><InputDate name={"Tarih"} reference={cur_act_data.curActDateRef} defaultValue={cur_act_data.date.current} /></div>
          <div className='col-span-2 xl:col-span-1'><InputDefault type={"text"} name={"Açıklama"} reference={cur_act_data.curActDescriptionRef} /></div>
          <div className='col-span-2 xl:col-span-1'><InputDate name={"Vade Tarihi"} reference={cur_act_data.curActExpiryDateRef} defaultValue={cur_act_data.date.current}  /></div>
          <div className='col-span-2 xl:col-span-1'><InputSelect name={"Borç-Alacak"} reference={cur_act_data.curActDebtAmountRef} options={["Borç", "Alacak"]} func={() => {}} /></div>
          <div className='col-span-2 xl:col-span-1'><InputDefault type={"number"} name={"Tutar"} reference={cur_act_data.curActBalanceRef} /></div>
          <div className='my-2 col-span-5'>

            {Object.keys(cur_act_data.chosen_current).length < 1 ? 
              <button type="button" onClick={() => funcLoad(cur_act_data.createCurrentActivity)} className="save-btn float-right ml-2 pointer-events-none opacity-30">Cari Hareket Ekle</button>
              : 
              <button type="button" onClick={() => funcLoad(cur_act_data.createCurrentActivity)} className="save-btn float-right ml-2">Cari Hareket Ekle</button>
            }
            <button type="button" className="clear-btn float-right" onClick={cur_act_data.clearCurActEntryInputs}><i className="fa-solid fa-eraser mr-2"></i>Temizle</button>
          
          </div>
        </div>      

        <div className='col-span-3'>
          <PageSubTitle title={"Cari Hareket Tablosu"} />
          <Table data={cur_act_data.render_table} />
        </div>

        <EditCurActModal />

      </div>
        
    </>
  )
}
