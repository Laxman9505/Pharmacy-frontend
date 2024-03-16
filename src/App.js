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
import NewOrder from "./pages/NewOrder/NewOrder";
import Register from "./pages/Register";
import SendOTP from "./pages/SendOTP";
import StripeTest from "./pages/StripeTest";
import ValidateOTP from "./pages/ValidateOTP";

function App() {
  const Login = React.lazy(() => import("./pages/Login"));
  const Home = React.lazy(() => import("./pages/Home"));
  const Inventory = React.lazy(() => import("./pages/Inventory/Inventory"));
  const Orders = React.lazy(() => import("./pages/Orders/Orders"));
  const StoreSetings = React.lazy(() =>
    import("./pages/Storesettings/StoreSettings")
  );
  const ProductCategories = React.lazy(() =>
    import("./pages/Product Categories/ProductCategories")
  );

  const Customer = React.lazy(() => import("./pages/Customer/Customer"));

  return (
    <Provider store={Store()}>
      <Router>
        <React.Suspense fallback={null}>
          <Routes>
            <Route path="*" element={<div>Page Not Found</div>} />
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/new-order" element={<NewOrder />} />
            <Route path="/manage-orders" element={<Orders />} />
            <Route path="/store-settings" element={<StoreSetings />} />
            <Route path="/product-categories" element={<ProductCategories />} />
            <Route path="/manage-customers" element={<Customer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/send-otp" element={<SendOTP />} />
            <Route path="/verify-otp" element={<ValidateOTP />} />
            <Route path="/register" element={<Register />} />
            <Route path="/stripe" element={<StripeTest />} />
          </Routes>
        </React.Suspense>
      </Router>
    </Provider>
  );
}

export default App;
