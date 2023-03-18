import React, { useEffect } from 'react'
import PageMainTitle from '../components/items/PageMainTitle'
import PageSubTitle from '../components/items/PageSubTitle'
import InputDate from '../components/items/InputDate'
import InputSelectNoSpan from '../components/items/InputSelectNoSpan'
import InputFilled from '../components/items/InputFilled'
import InputSelect from '../components/items/InputSelect'
import InputDefault from '../components/items/InputDefault'
import OrdersTable from '../components/spesific-tables/OrdersTable'
import InputDefaultNoSpan from '../components/items/InputDefaultNoSpan'
import AutoSearch from '../components/items/AutoSearch'
import { useOrders } from '../context/OrdersContext'
import EditProductModal from '../components/modals/EditProductModal'
import PrintPDFModal from '../components/modals/PrintPDFModal'
import RenderPDF from '../components/items/RenderPDF'
import { useMain } from '../context/MainContext'
import { useNavigate } from 'react-router-dom'

export default function Orders() {
  const orders_data = useOrders();
  const { adminAll, adminCheck, funcLoad } = useMain();
  
  const navigate = useNavigate();

  useEffect(() => {
    if(!adminAll) navigate("/")
  }, [adminAll])

  useEffect(() => {
    adminCheck();
    orders_data.getAllCurrents();
    funcLoad(orders_data.getAllStocks);
    orders_data.getDate();

    document.addEventListener('click', function(e) {
      orders_data.toggleFilteredCurrentTable(e);
      orders_data.toggleFilteredStockTable(e);
    })

    return () => {
      document.addEventListener('click', function(e) {
        orders_data.toggleFilteredCurrentTable(e);
        orders_data.toggleFilteredStockTable(e);
      })
      
      orders_data.dispatch({
        type: 'PRODUCT_LIST',
        value: [],
      })

      orders_data.dispatch({
        type: 'CHOSEN_STOCK_UNITS',
        value: []
      })
    }
  }, [])
  
  return (
    <>
      <PageMainTitle title={"Sipariş Giriş Paneli"} />

      <div className='grid md:grid-cols-3 md:gap-5 auto-rows-max'>
        <div className='col-span-1'><PageSubTitle title={"Sipariş Üst Bilgileri"} /></div>
        <div className='col-span-1'><PageSubTitle title={"Cari Bilgileri"} /></div>
      </div>

      <div className='grid md:grid-cols-3 md:gap-5 auto-rows-max'>

        <div className='col-span-2 md:col-span-1 grid grid-cols-1 gap-[1px] auto-rows-max'>

          <div className='flex flex-row col-span-1 mb-2 relative'>
            <span className="w-1/3 shadow-input flex justify-center min-h-[34px] border border-alica_blue_light text-sm items-center bg-steel_blue_light font-medium text-prussian_blue px-1 py-[6px]">Cari Kod / İsim</span>
            <div className='w-2/3 shadow-input relative z-[21]'>
              <input id='search_current_input' autoComplete='off' type="text" ref={orders_data.ordersCurSearchInputRef} onChange={(e) => orders_data.filterCurrents(e)} className="w-full min-h-[34px] py-[6px] pr-9 bg-white border border-white text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-l-none focus:border-shadow_blue focus:ring-transparent block" placeholder="Cari İsim ya da Cari Kod ile arayın" required />
              <button type="button" id='search_current_button' className="absolute inset-y-0 right-0 flex items-center pr-3">
                <i id='search_current_button_icon' className="fa-solid fa-magnifying-glass text-indigo_dye"></i>
              </button>
            </div>
            <div className={orders_data.toggle_filtered_current_table ? 
              "opacity-100 transition duration-300 absolute overflow-y-auto shadow-button right-0 top-full w-2/3 z-20 border border-t-0 h-60 border-shadow_blue bg-alica_blue" 
              : "absolute transition duration-300 overflow-y-auto shadow-button right-0 top-full w-2/3 z-20 border border-t-0 h-60 border-shadow_blue bg-alica_blue opacity-0 pointer-events-none"
            }>
              <AutoSearch data={orders_data.filtered_currents} func={orders_data.chooseFilteredCurrent} cols={["Cari Kod", "Cari İsim"]} />
            </div>
          </div>

          <div className='col-span-1'><InputDefault name={"Sipariş Kaynağı"} reference={orders_data.ordersSourceRef} type={"text"} /></div>
          <div className='col-span-1'><InputSelect name={"Faturalı / Faturasız"} reference={orders_data.ordersInvoicedRef} options={["Faturalı", "Faturasız"]} func={orders_data.invoicedCheck} /></div>
          <div className='col-span-1'><InputDate name={"Sipariş Tarihi"} reference={orders_data.ordersCurGTEDateRef} defaultValue={orders_data.date.current} /></div>
          <div className='col-span-1'><InputDate name={"Teslim Tarihi"} reference={orders_data.ordersCurLTEDateRef} defaultValue={orders_data.date.current} /></div>
          
        </div>

        <div className='grid grid-cols-2 col-span-2 h-fit bg-transparent'>
          <div className='col-span-1'>
            <div className="mb-[1px]"><InputFilled name={"Cari Kod"} reference={orders_data.ordersCurIDRef} /></div>
            <div className="mb-[1px]"><InputFilled name={"Cari İsim"} reference={orders_data.ordersCurNameRef} /></div>
            <div className="mb-[1px]"><InputFilled name={"Adres"} reference={orders_data.ordersCurAddressRef} /></div>
            <div className="mb-[1px]"><InputFilled name={"İl - İlçe"} reference={orders_data.ordersCurProvDistRef} /></div>
          </div>
          <div className='col-span-1'>
            <div className="mb-[1px]"><InputFilled name={"Vergi Dairesi - No"} reference={orders_data.ordersCurTaxOfficeNoRef} /></div>
            <div className="mb-[1px]"><InputFilled name={"Telefon - 1"} reference={orders_data.ordersCurPhoneIRef} /></div>
            <div className="mb-[1px]"><InputFilled name={"Telefon - 2"} reference={orders_data.ordersCurPhoneIIRef} /></div>
            <div className="mb-[1px]"><InputFilled name={"E-mail Adresi"} reference={orders_data.ordersCurMailRef} /></div>
          </div>
        </div>
        
        <div className='col-span-3 grid grid-cols-10 grid-flow-row gap-2 mt-4'>
          <div className='col-span-10'><PageSubTitle title={"Ürün Bilgileri ve Ürün Tablosu"} /></div>

          <div className='flex flex-row col-span-5 lg:col-span-3 relative'>
            <div className='w-full shadow-input relative z-[19]'>
              {/* <input id='search_button' type="text" ref={orders_data.ordersCurSearchInputRef} onChange={(e) => orders_data.filterCurrents(e)} className="w-full min-h-[34px] py-[6px] pr-9 bg-white border border-white text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-l-none focus:border-shadow_blue focus:ring-transparent block" placeholder="Cari İsim ya da Cari Kod ile arayın" required /> */}
              
              <div className="relative col-span-2 lg:col-span-1" >
                <input type="text" ref={orders_data.ordersNameRef} autoComplete='off' id="search_stock_input" onChange={(e) => orders_data.filterStocks(e)} className="block p-2 pb-[.30rem] min-h-[34px] w-full text-prussian_blue text-sm bg-white border border-white appearance-none placeholder:text-mn_blue focus:border-shadow_blue focus:ring-transparent peer" placeholder=" " />
                <label htmlFor="search_stock_input" className="absolute truncate cursor-text text-sm text-mn_blue bg-white px-1 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-2.5 opacity-70 peer-focus:text-queen_blue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:opacity-100 peer-focus:top-1 peer-focus:text-base peer-focus:-translate-y-4">Ürün Adı</label>
              </div>
              <button id='search_stock_button' type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
                <i id='search_stock_button_icon' className="fa-solid fa-magnifying-glass text-indigo_dye"></i>
              </button>
            </div>
            <div className={orders_data.toggle_filtered_stock_table ? 
              "opacity-100 transition duration-200 absolute overflow-y-auto shadow-button right-0 top-full w-full z-[18] border border-t-0 h-60 border-shadow_blue bg-alica_blue" 
              :
              "absolute transition duration-200 overflow-y-auto shadow-button right-0 top-full w-full z-[18] border border-t-0 h-60 border-shadow_blue bg-alica_blue opacity-0 pointer-events-none"
            }>
              <AutoSearch data={orders_data.filtered_stocks} func={orders_data.chooseFilteredStock} cols={["Stok Kod", "Stok İsim"]} /> {/* "Malzeme", "Ürün Grubu" */}
            </div>
          </div>

          <div className='col-span-2 lg:col-span-1'><InputSelectNoSpan name={"Birim"} reference={orders_data.ordersUnitRef} options={orders_data.chosen_stock_units} /></div>
          <div className='col-span-3 lg:col-span-1'><InputDefaultNoSpan name={"Miktar"} reference={orders_data.ordersAmountRef} type={"number"} /></div>
          <div className='col-span-2 lg:col-span-1'><InputDefaultNoSpan name={"Birim Fiyat"} reference={orders_data.ordersPriceRef} type={"number"} /></div>
          <div className={orders_data.invoiced !== true ? "col-span-2 lg:col-span-1 opacity-40 pointer-events-none" : "col-span-2 lg:col-span-1"}><InputSelectNoSpan name={"KDV Oranı"} reference={orders_data.ordersTaxRateRef} options={["%0", "%8", "%18"]} /></div>
          <div className='col-span-4 lg:col-span-2'><InputDefaultNoSpan name={"Açıklama"} reference={orders_data.ordersDescriptionRef} type={"text"} /></div>       

          <button className='col-span-2 lg:col-span-1 truncate clear-btn w-full' onClick={() => funcLoad(orders_data.addProduct)}><i className="fa-solid fa-plus mr-1"></i>Ürün Ekle</button>
          <div className="col-span-10 mt-3"><OrdersTable /></div>
          
          <div className="col-span-10 mt-2 flex justify-end"><button className='save-btn w-fit' onClick={() => funcLoad(orders_data.createOrder)}><i className="fa-solid fa-bag-shopping mr-2"></i>Sipariş Oluştur</button></div>
          
        </div>
        
        <EditProductModal />   
        <PrintPDFModal />  

        <div className='hidden'>
          <RenderPDF reference={orders_data.componentRef} data={orders_data.print_pdf_rows} />
        </div>
      </div>
    </>
  )
}
