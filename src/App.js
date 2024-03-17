/** @format */

import "nprogress/nprogress.css";
import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import "react-notifications/lib/notifications.css";
import "react-progress-bar-plus/lib/progress-bar.css";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import "./Navbar.css";
import Store from "./Redux/store";
import "./index.css";
import Customers from "./pages/Customer/Customer";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory/Inventory";
import NewOrder from "./pages/NewOrder/NewOrder";
import Orders from "./pages/Orders/Orders";
import ProductCategories from "./pages/Product Categories/ProductCategories";
import StoreSettings from "./pages/Storesettings/StoreSettings";

function App() {
  return (
    <Provider store={Store()}>
      <Router>
        <Routes>
          <Route path="*" element={<div>Page Not Found</div>} />
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/new-order" element={<NewOrder />} />
          <Route path="/manage-orders" element={<Orders />} />
          <Route path="/store-settings" element={<StoreSettings />} />
          <Route path="/product-categories" element={<ProductCategories />} />
          <Route path="/manage-customers" element={<Customers />} />
          {/* <Route path="/login" element={<Login />} />
            <Route path="/send-otp" element={<SendOTP />} />
            <Route path="/verify-otp" element={<ValidateOTP />} />
            <Route path="/register" element={<Register />} />
            <Route path="/stripe" element={<StripeTest />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
