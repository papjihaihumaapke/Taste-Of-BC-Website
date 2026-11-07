import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/tokens.css";
import "./styles/site.css";
import { StoreProvider } from "./lib/store.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import WhatsOn from "./pages/WhatsOn.jsx";
import FoodDrink from "./pages/FoodDrink.jsx";
import Entertainment from "./pages/Entertainment.jsx";
import Entertainers from "./pages/Entertainers.jsx";
import Coupons from "./pages/Coupons.jsx";
import MapPage from "./pages/MapPage.jsx";
import Visit from "./pages/Visit.jsx";
import GetInvolved from "./pages/GetInvolved.jsx";
import Sponsors from "./pages/Sponsors.jsx";
import Shop from "./pages/Shop.jsx";
import Booklet from "./pages/Booklet.jsx";
import About from "./pages/About.jsx";
import { Checkout, ThankYou } from "./pages/Checkout.jsx";
import { Legal, NotFound } from "./pages/Legal.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="whats-on" element={<WhatsOn />} />
            <Route path="food-and-drink" element={<FoodDrink />} />
            <Route path="restaurants" element={<Navigate to="/food-and-drink" replace />} />
            <Route path="entertainment" element={<Entertainment />} />
            <Route path="entertainers" element={<Entertainers />} />
            <Route path="coupons" element={<Coupons />} />
            <Route path="map" element={<MapPage />} />
            <Route path="visit" element={<Visit />} />
            <Route path="get-involved" element={<GetInvolved />} />
            <Route path="sponsors" element={<Sponsors />} />
            <Route path="shop" element={<Shop />} />
            <Route path="booklet" element={<Booklet />} />
            <Route path="about" element={<About />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="thank-you" element={<ThankYou />} />
            <Route path="legal" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
