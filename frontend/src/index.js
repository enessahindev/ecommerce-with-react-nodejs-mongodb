import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import LayoutComponents from "./pages/Layout";
import HomeComponents from "./pages/Home";
import ProductComponents from "./pages/Product";
import OrderComponents from "./pages/Order";
import BasketComponents from "./pages/Basket";
import LoginComponents from "./pages/Login";
import RegisterComponents from "./pages/Register";

function AppComponent() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutComponents />}>
            <Route index element={<HomeComponents />} />
            <Route path="products" element={<ProductComponents />} />
            <Route path="orders" element={<OrderComponents />} />
            <Route path="baskets" element={<BasketComponents />} />
          </Route>
          <Route path="login" element={<LoginComponents />}></Route>
          <Route path="register" element={<RegisterComponents />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppComponent />);

reportWebVitals();
