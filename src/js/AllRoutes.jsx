import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'
import MainPage from './pages/MainPage'
import Current from './pages/Current'
import CurrentActivity from './pages/CurrentActivity'
import Stock from './pages/Stock'
import Orders from './pages/Orders'
import OrdersEntry from './pages/OrdersEntry'
import Tasks from './pages/Tasks'
import Test from './pages/Test'
import Dashboard from "./components/main-items/Dashboard";
import Offers from "./pages/Offers";
import OffersEntry from "./pages/OffersEntry";

export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainPage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="current" element={<Current />} />
          <Route path="current-activity" element={<CurrentActivity />} />
          <Route path="stock" element={<Stock />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders-entry" element={<OrdersEntry />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="admin-panel" element={<AdminPanel />} />
          <Route path="offers" element={<Offers />} />
          <Route path="offers-entry" element={<OffersEntry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
