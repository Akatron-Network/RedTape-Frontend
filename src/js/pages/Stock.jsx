import React, { useEffect } from 'react'
import InputDefault from '../components/items/InputDefault'
import PageMainTitle from '../components/items/PageMainTitle'
import PageSubTitle from '../components/items/PageSubTitle'
import { useStock } from '../context/StockContext'
import Table from '../components/items/Table'
import EditStockModal from '../components/modals/EditStockModal'
import { useMain } from '../context/MainContext'

export default function Stock() {
  const stock_data = useStock();
  const { funcLoad } = useMain();

  useEffect(() => {
    funcLoad(stock_data.showStockList);
  }, [])
  

  return (
    <>
      <PageMainTitle title={"Stok Kayıt Paneli"} />

      <div className='grid md:grid-cols-3 md:gap-20 grid-cols-1'>
        <div className='grid grid-cols-1 gap-[2px] col-span-1 auto-rows-max'>          
          <PageSubTitle title={"Yeni Stok Oluştur"} /> 

          <div className='col-span-2'><InputDefault type={"text"} name={"Stok Adı"} reference={stock_data.stockNameRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Malzeme"} reference={stock_data.stockMaterialRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Ürün Grubu"} reference={stock_data.stockProductGroupRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Birim 1"} reference={stock_data.stockUnitIRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Birim 2"} reference={stock_data.stockUnitIIRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Çevrim Oranı"} reference={stock_data.stockConversionRateRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Alış Fiyatı"} reference={stock_data.stockBuyPriceRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Satış Fiyatı"} reference={stock_data.stockSellPriceRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Kod 1"} reference={stock_data.stockCodeIRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Kod 2"} reference={stock_data.stockCodeIIRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Kod 3"} reference={stock_data.stockCodeIIIRef} /></div>
          <div className='col-span-2'><InputDefault type={"text"} name={"Kod 4"} reference={stock_data.stockCodeIVRef} /></div>
        
          <div className='mt-4'>
            <button type="button" className="save-btn ml-2 float-right" onClick={() => funcLoad(stock_data.createStock)}><i className="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button>
            <button type="button" className="clear-btn float-right" onClick={() => stock_data.clearStockInputs()}><i className="fa-solid fa-eraser mr-2"></i>Temizle</button>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-1 col-span-2 h-fit'>
          
          <div className="col-span-1 flex flex-row justify-between">
            <PageSubTitle title={"Stok Tablosu"} />
            <div className='flex flex-row shadow-input ellipsis h-[30px] rounded-md'>
              <span className="w-1/3 truncate flex justify-center min-h-[34px] border border-alica_blue_light text-sm items-center bg-steel_blue_light font-medium text-prussian_blue px-1 py-[6px] rounded-l-md">Ara<i className="fa-solid fa-magnifying-glass text-indigo_dye ml-2"></i></span>
              <input onChange={(e) => stock_data.filterStocks(e)} type={"text"} className="w-2/3 min-h-[34px] py-[6px] bg-white border border-white text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-r-md focus:border-shadow_blue focus:ring-transparent block" placeholder="Stok Kod / İsim ile ara..." required />
            </div>
          </div>
          <Table data={stock_data.render_table} all_currents={stock_data.all_currents} />
        </div>

        <EditStockModal />

      </div>
    </>
  )
}
