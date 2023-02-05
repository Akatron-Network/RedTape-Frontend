import React from 'react'
import GorevTakibiTablo from '../components/gorev-takip/GorevTakibiTablo'
import SiparisGorevTablo from '../components/gorev-takip/SiparisGorevTablo'
import PageMainTitle from '../components/items/PageMainTitle'
import PageSubTitle from '../components/items/PageSubTitle'

export default function GorevTakip() {
  return (
    <>
      <PageMainTitle title={"Görev Takip Paneli"} />

      <PageSubTitle title={"Atanmamış Görevler"} />
      <SiparisGorevTablo />
      
      <div className='mt-10'><PageSubTitle title={"Aktif Görevler"} /></div>
      <GorevTakibiTablo />
    </>
  )
}
