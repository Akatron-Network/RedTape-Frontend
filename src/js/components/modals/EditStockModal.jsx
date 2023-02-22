import React from 'react'
import InputDefault from '../items/InputDefault'
import PageSubTitle from '../items/PageSubTitle'
import { useStock } from '../../context/StockContext'

export default function EditStockModal() {
  const stock_data = useStock();

  return (
    <>
      <div id="editStockModal" data-modal-target="editStockModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-lg md:h-auto">
          <div className="relative bg-ghost_white rounded-sm shadow">
            <div className="flex items-start justify-between px-5 pt-3 pb-0 border-b border-steel_blue_light rounded-t">
              <PageSubTitle title={"Stok Düzenle"} />
              <button type="button" onClick={() => stock_data.hideStockModal()} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-sm p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="pt-4 px-5 grid grid-cols-1 gap-[1px]">

              <div className='col-span-2'><InputDefault name={"Stok Adı"} reference={stock_data.stockNameEditRef} /></div>
              <div className='col-span-2'><InputDefault name={"Malzeme"} reference={stock_data.stockMaterialEditRef} /></div>
              <div className='col-span-2'><InputDefault name={"Ürün Grubu"} reference={stock_data.stockProductGroupEditRef} /></div>
              <div className='col-span-2'><InputDefault name={"Miktar"} reference={stock_data.stockUnitIEditRef} /></div>
              <div className='col-span-2'><InputDefault name={"Birim"} reference={stock_data.stockUnitIIEditRef} /></div>
              <div className='col-span-2'><InputDefault name={"Çevrim Oranı"} reference={stock_data.stockConversionRateEditRef} /></div>
              <div className='col-span-2'><InputDefault name={"Alış Fiyatı"} reference={stock_data.stockBuyPriceEditRef} /></div>
              <div className='col-span-2'><InputDefault name={"Satış Fiyatı"} reference={stock_data.stockSellPriceEditRef} /></div>
              <div className='col-span-2'><InputDefault name={"Kod 1"} reference={stock_data.stockCodeIEditRef} /></div>
              <div className='col-span-2'><InputDefault name={"Kod 2"} reference={stock_data.stockCodeIIEditRef} /></div>
              <div className='col-span-2'><InputDefault name={"Kod 3"} reference={stock_data.stockCodeIIIEditRef} /></div>
              <div className='col-span-2'><InputDefault name={"Kod 4"} reference={stock_data.stockCodeIVEditRef} /></div>
            
            </div>

            <div className="flex items-center px-5 py-3 mt-4 space-x-2 border-t border-steel_blue_light rounded-b justify-end">
              <button type="button" className="clear-btn float-right" onClick={() => stock_data.clearStockEditInputs()}><i className="fa-solid fa-eraser mr-2"></i>Temizle</button>
              <button type="button" className="save-btn ml-2 float-right" onClick={() => stock_data.editStock(stock_data.stock_details.id)}><i className="fa-solid fa-floppy-disk mr-2"></i>Kaydet</button> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
