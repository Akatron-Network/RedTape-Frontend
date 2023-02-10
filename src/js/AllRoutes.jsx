import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import Current from './pages/Current'
import CurrentActivity from './pages/CurrentActivity'
import StokKayit from './pages/StokKayit'
import Siparis from './pages/Siparis'
import GorevTakip from './pages/GorevTakip'
import Test from './pages/Test'

export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/giris" element={<LoginPage />} />
        <Route path="/" element={<MainPage />}>
          <Route path=":kayit-cari" element={<Current />} />
          <Route path=":cari-hareket" element={<CurrentActivity />} />
          <Route path=":kayit-stok" element={<StokKayit />} />
          <Route path=":siparis" element={<Siparis />} />
          <Route path=":gorev-takip" element={<GorevTakip />} />
          {/* <Route index={true} element={<Collections />} />
          <Route path=":colID" element={<Folders />} />
          <Route path=":colID/:foldID" element={<Files />} />
          <Route path=":colID/:foldID/:fileID" element={<ChartLayout />} /> */}
        </Route>
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}
