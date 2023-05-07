import React, { useEffect, useState } from 'react'
import { useOffers } from '../context/OffersContext';
import { useNavigate } from 'react-router-dom';
import { useMain } from '../context/MainContext';
import PageMainTitle from '../components/items/PageMainTitle';
import PageSubTitle from '../components/items/PageSubTitle';
import InputDefault from '../components/items/InputDefault';
import InputSelect from '../components/items/InputSelect';
import InputDate from '../components/items/InputDate';
import InputFilled from '../components/items/InputFilled';
import AutoSearch from '../components/items/AutoSearch';
import InputSelectNoSpan from '../components/items/InputSelectNoSpan';
import InputDefaultNoSpan from '../components/items/InputDefaultNoSpan';
import OffersTable from '../components/spesific-tables/OffersTable';
import EditOffersProductModal from '../components/modals/EditOffersProductModal';
import RenderPDF from '../components/items/RenderPDF';
import PrintOffersPDFModal from '../components/modals/PrintOffersPDFModal';

export default function Offers() {
  const { adminAll, adminCheck, funcLoad } = useMain();
  const offers_data = useOffers();

  const [newCurChecked, setNewCurChecked] = useState(false)
  
  const navigate = useNavigate();

  useEffect(() => {
    if(!adminAll) navigate("/dashboard")
  }, [adminAll])

  useEffect(() => {
    adminCheck();
    offers_data.getAllCurrents();
    funcLoad(offers_data.getAllStocks);
    offers_data.getDate();

    document.addEventListener('click', function(e) {
      offers_data.toggleFilteredCurrentTable(e);
      offers_data.toggleFilteredStockTable(e);
    })
    
    offers_data.dispatch({
      type: 'INVOICED',
      value: true
    })

    return () => {
      document.addEventListener('click', function(e) {
        offers_data.toggleFilteredCurrentTable(e);
        offers_data.toggleFilteredStockTable(e);
      })
      
      offers_data.dispatch({
        type: 'PRODUCT_LIST',
        value: [],
      })

      offers_data.dispatch({
        type: 'CHOSEN_STOCK_UNITS',
        value: []
      })
    }
  }, [])
  
  return (
    <>
    
      
      <PageMainTitle title={"Teklif Paneli"} icon={<i className="fa-solid fa-tags"></i>} />

      <div className='grid md:grid-cols-3 md:gap-5 auto-rows-max'>

        <div className='col-span-1 flex items-center justify-between'>
          <PageSubTitle title={"Teklif Üst Bilgileri"} />
          <div className="ml-4 mb-3 flex items-center">
            <input id="new-current-checkbox" ref={offers_data.offersNewCurCheckedRef} onClick={() => setNewCurChecked(!newCurChecked)} type="checkbox" value="" className="w-4 h-4 text-indigo_dye bg-gray-200 border-gray-400 rounded focus:ring-0" />
            <label htmlFor="new-current-checkbox" className="ml-1 text-sm font-medium text-prussian_blue">Yeni Müşteri</label>
          </div>
        </div>

        <div className='col-span-1'><PageSubTitle title={"Cari Bilgileri"} /></div>
      </div>

      <div className='grid md:grid-cols-3 md:gap-5 auto-rows-max'>

        <div className='col-span-3 md:col-span-2 lg:col-span-1 grid grid-cols-1 gap-[2px] auto-rows-max md:mb-0 mb-3'>

        {!newCurChecked ? 
          <div className='flex flex-row col-span-1 mb-2 relative'>
            <span className="w-1/3 shadow-input flex justify-start min-h-[34px] border border-alica_blue text-sm items-center bg-indigo_dye font-medium text-ghost_white px-3 py-[6px] rounded-l-md">Cari Kod / İsim</span>
            <div className='w-2/3 shadow-input relative z-[21] rounded-r-md'>
              <input id='offers_search_current_input' autoComplete='off' type="text" ref={offers_data.offersCurSearchInputRef} onChange={(e) => offers_data.filterCurrents(e)} className="w-full min-h-[34px] py-[6px] pr-9 bg-white border border-alica_blue text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-r-md focus:border-indigo_dye focus:ring-transparent block" placeholder="Cari İsim ya da Cari Kod ile arayın" required />
              <button type="button" id='offers_search_current_button' className="absolute inset-y-0 right-0 flex items-center pr-3">
                <i id='offers_search_current_button_icon' className="fa-solid fa-magnifying-glass text-indigo_dye"></i>
              </button>
            </div>
            <div className={offers_data.toggle_filtered_current_table ? 
              "opacity-100 transition duration-300 absolute overflow-y-auto shadow-button right-0 top-full w-2/3 z-20 border border-t-0 h-60 border-shadow_blue bg-alica_blue rounded-md" 
              : "absolute transition duration-300 overflow-y-auto shadow-button right-0 top-full w-2/3 z-20 border border-t-0 h-60 border-shadow_blue bg-alica_blue opacity-0 pointer-events-none rounded-md"
            }>
              <AutoSearch data={offers_data.filtered_currents} func={offers_data.chooseFilteredCurrent} cols={["Cari Kod", "Cari İsim"]} />
            </div>
          </div>
          :
          undefined
        }

          <div className='col-span-1'><InputDefault name={"Sipariş Kaynağı"} reference={offers_data.offersSourceRef} type={"text"} /></div>
          <div className='col-span-1'><InputSelect name={"Faturalı / Faturasız"} reference={offers_data.offersInvoicedRef} options={["Faturalı", "Faturasız"]} func={offers_data.invoicedCheck} /></div>
          <div className='col-span-1'><InputDate name={"Sipariş Tarihi"} reference={offers_data.offersGTEDateRef} defaultValue={offers_data.date.current} /></div>
          <div className='col-span-1'><InputDate name={"Teslim Tarihi"} reference={offers_data.offersLTEDateRef} defaultValue={offers_data.date.current} /></div>
          
        </div>

        {newCurChecked ?
          <div className='grid grid-cols-2 col-span-3 lg:col-span-2 gap-2 h-fit bg-transparent'>
            <div className='col-span-2 md:col-span-1'>
              <div className="mb-[2px]"><InputDefault name={"Cari İsim"} reference={offers_data.offersNewCurNameRef} type={"text"} /></div>
              <div className="mb-[2px]"><InputDefault name={"E-mail Adresi"} reference={offers_data.offersNewCurMailRef} type={"text"} /></div>
            </div>
            <div className='col-span-2 md:col-span-1 mb-2'>
              <div className="mb-[2px]"><InputDefault name={"Telefon"} reference={offers_data.offersNewCurPhoneIRef} type={"text"} /></div>
              <div className="mb-[2px]"><InputDefault name={"Adres"} reference={offers_data.offersNewCurAddressRef} type={"text"} /></div>
            </div>
          </div>
          :
          <div className='grid grid-cols-2 col-span-3 lg:col-span-2 gap-8 h-fit bg-transparent border border-indigo_dye py-2 px-6 rounded-md !bg-white shadow-md mb-5 md:mb-0'>
          <div className='col-span-2 md:col-span-1'>
            <div className="mb-[2px]"><InputFilled name={"Cari Kod"} reference={offers_data.offersCurIDRef} /></div>
            <div className="mb-[2px]"><InputFilled name={"Cari İsim"} reference={offers_data.offersCurNameRef} /></div>
            <div className="mb-[2px]"><InputFilled name={"Adres"} reference={offers_data.offersCurAddressRef} /></div>
            <div className="mb-[2px]"><InputFilled name={"İl - İlçe"} reference={offers_data.offersCurProvDistRef} /></div>
          </div>
          <div className='col-span-2 md:col-span-1 mb-2'>
            <div className="mb-[2px]"><InputFilled name={"Vergi Dairesi - No"} reference={offers_data.offersCurTaxOfficeNoRef} /></div>
            <div className="mb-[2px]"><InputFilled name={"Telefon - 1"} reference={offers_data.offersCurPhoneIRef} /></div>
            <div className="mb-[2px]"><InputFilled name={"Telefon - 2"} reference={offers_data.offersCurPhoneIIRef} /></div>
            <div className="mb-[2px]"><InputFilled name={"E-mail Adresi"} reference={offers_data.offersCurMailRef} /></div>
          </div>
        </div>
        }
        
        <div className='col-span-3 grid grid-cols-10 grid-flow-row gap-2 mt-4'>
          <div className='col-span-10'><PageSubTitle title={"Ürün Bilgileri ve Ürün Tablosu"} /></div>

          <div className='flex flex-row col-span-5 lg:col-span-3 relative rounded-md'>
            <div className='w-full shadow-input relative z-[19] rounded-md'>
              <div className="relative col-span-2 lg:col-span-1" >
                <input type="text" ref={offers_data.offersStockSearchInputRef} autoComplete='off' id="offers_search_stock_input" onChange={(e) => offers_data.filterStocks(e)} className="block p-2 pb-[.30rem] min-h-[34px] w-full text-prussian_blue text-sm bg-white border border-alica_blue_middle appearance-none placeholder:text-mn_blue focus:border-indigo_dye focus:ring-transparent peer rounded-md" placeholder=" " />
                <label htmlFor="offers_search_stock_input" className="absolute truncate cursor-text text-sm text-mn_blue bg-white px-1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-2.5 opacity-70 peer-focus:text-queen_blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:opacity-100 peer-focus:top-1 peer-focus:text-base peer-focus:-translate-y-4 rounded-md">Ürün Adı</label>
              </div>
              <button id='offers_search_stock_button' type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
                <i id='offers_search_stock_button_icon' className="fa-solid fa-magnifying-glass text-indigo_dye"></i>
              </button>
            </div>
            <div className={offers_data.toggle_filtered_stock_table ? 
              "opacity-100 transition duration-200 absolute overflow-y-auto shadow-button right-0 top-full w-full z-[18] border border-t-0 h-60 border-shadow_blue bg-alica_blue rounded-md" 
              :
              "absolute transition duration-200 overflow-y-auto shadow-button right-0 top-full w-full z-[18] border border-t-0 h-60 border-shadow_blue bg-alica_blue opacity-0 pointer-events-none rounded-md"
            }>
              <AutoSearch data={offers_data.filtered_stocks} func={offers_data.chooseFilteredStock} cols={["Stok Kod", "Stok İsim"]} />
            </div>
          </div>

          <div className='col-span-2 lg:col-span-1'><InputSelectNoSpan name={"Birim"} reference={offers_data.offersUnitRef} options={offers_data.chosen_stock_units} /></div>
          <div className='col-span-3 lg:col-span-1'><InputDefaultNoSpan name={"Miktar"} reference={offers_data.offersAmountRef} type={"number"} /></div>
          <div className='col-span-2 lg:col-span-1'><InputDefaultNoSpan name={"Birim Fiyat"} reference={offers_data.offersPriceRef} type={"number"} /></div>
          <div className={offers_data.invoiced !== true ? "col-span-2 lg:col-span-1 opacity-40 pointer-events-none" : "col-span-2 lg:col-span-1"}><InputSelectNoSpan name={"KDV Oranı"} reference={offers_data.offersTaxRateRef} options={["%0", "%8", "%18"]} /></div>
          <div className='col-span-4 lg:col-span-2'><InputDefaultNoSpan name={"Açıklama"} reference={offers_data.offersDescriptionRef} type={"text"} /></div>       

          <button className='col-span-2 lg:col-span-1 truncate clear-btn w-full' onClick={() => funcLoad(offers_data.addProduct)}><i className="fa-solid fa-plus mr-2"></i>Ürün Ekle</button>
          <div className="col-span-10 mt-3">
            <OffersTable />
          </div>
          
          <div className="col-span-10 mt-2 flex justify-end"><button className='save-btn w-fit' onClick={() => funcLoad(offers_data.createOffer)}><i className="fa-solid fa-bag-shopping mr-2"></i>Teklif Oluştur</button></div>
        </div>
        
        <EditOffersProductModal />
        <PrintOffersPDFModal />  

        <div className='hidden'>
          <RenderPDF reference={offers_data.componentRef} data={offers_data.print_pdf_rows} evenOdd={"odd"} title={"TEKLİF FORMU"} code={"Teklif "} />
        </div>
         
      </div>
    </>
  )
}
