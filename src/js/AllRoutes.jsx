import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login'
import MainPage from './pages/MainPage'
import Current from './pages/Current'
import CurrentActivity from './pages/CurrentActivity'
import Stock from './pages/Stock'
import Orders from './pages/Orders'
import OrdersEntry from './pages/OrdersEntry'
import Tasks from './pages/Tasks'
import Test from './pages/Test'

export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainPage />}>
          <Route path="current" element={<Current />} />
          <Route path="current-activity" element={<CurrentActivity />} />
          <Route path="stock" element={<Stock />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders-entry" element={<OrdersEntry />} />
          <Route path="tasks" element={<Tasks />} />
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
