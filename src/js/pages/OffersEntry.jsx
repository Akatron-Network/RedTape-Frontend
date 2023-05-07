import React, { useEffect } from 'react'
import PageMainTitle from '../components/items/PageMainTitle'
import PageSubTitle from '../components/items/PageSubTitle'
import EditOffersEntryProductModal from '../components/modals/EditOffersEntryProductModal.jsx'
import EditOffersEntryModal from '../components/modals/EditOffersEntryModal'
import { useOffersEntry } from '../context/OffersEntryContext'
import AddOfferEntryProductModal from '../components/modals/AddOfferEntryProductModal'
import RenderPDF from '../components/items/RenderPDF'
import { useMain } from '../context/MainContext'
import { useNavigate } from 'react-router-dom'
import OffersEntryTable from '../components/spesific-tables/OffersEntryTable'

export default function OffersEntry() {
  const offers_entry_data = useOffersEntry();
  const { adminAll, adminCheck, funcLoad } = useMain();
  
  const navigate = useNavigate();

  useEffect(() => {
    if(!adminAll) navigate("/dashboard")
  }, [adminAll])

  useEffect(() => {
    adminCheck();
    offers_entry_data.showCurrents();
    funcLoad(offers_entry_data.showOffers);
    offers_entry_data.showStocks();

    document.addEventListener('click', function(e) {
      offers_entry_data.toggleFilteredStockTable(e);
    })

    return () => {
      document.addEventListener('click', function(e) {
        offers_entry_data.toggleFilteredStockTable(e);
      })

      offers_entry_data.dispatch({
        type: 'CHOSEN_STOCK_UNITS',
        value: []
      })
    }
  }, [])
  
  
  return (
    <>
      <PageMainTitle title={"Teklif Kayıtları Paneli"} icon={<i className="fa-solid fa-receipt"></i>} />
      
      <div className="flex flex-row justify-between mb-1">
        <PageSubTitle title={"Teklif Tablosu"} />
        <div className='flex flex-row shadow-input ellipsis h-[30px] rounded-md'>
          <span className="w-1/3 truncate flex justify-center min-h-[34px] border border-alica_blue text-sm items-center bg-indigo_dye font-medium text-ghost_white px-1 py-[6px] rounded-l-md">Ara<i className="fa-solid fa-magnifying-glass text-ghost_white ml-2"></i></span>
          <input onChange={(e) => offers_entry_data.filterOffers(e)} type={"text"} className="w-2/3 min-h-[34px] py-[6px] bg-white border border-alica_blue text-prussian_blue text-sm placeholder:text-mn_blue placeholder:opacity-70 rounded-r-md focus:border-indigo_dye focus:ring-transparent block" placeholder="Cari İsim ile ara..." required />
        </div>
      </div>

      <OffersEntryTable />
      <EditOffersEntryModal />
      <EditOffersEntryProductModal />
      <AddOfferEntryProductModal />
      
      <div className='hidden'>
        <RenderPDF reference={offers_entry_data.componentRef} data={offers_entry_data.print_pdf_rows} stocks={offers_entry_data.all_stocks} evenOdd={"odd"} title={"TEKLİF FORMU"} code={"Teklif "} />
      </div>
    </>
  )
}
