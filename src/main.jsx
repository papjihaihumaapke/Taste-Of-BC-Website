import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/tokens.css";
import "./styles/site.css";
import { StoreProvider } from "./lib/store.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import WhatsOn from "./pages/WhatsOn.jsx";
import { MenuCategory, MenuLanding } from "./pages/Menu.jsx";
import Entertainment from "./pages/Entertainment.jsx";
import Entertainers from "./pages/Entertainers.jsx";
import Coupons from "./pages/Coupons.jsx";
import MapPage from "./pages/MapPage.jsx";
import Visit, { Accessibility, GettingThere } from "./pages/Visit.jsx";
import GetInvolved, { Perform, Vendors, Volunteer } from "./pages/GetInvolved.jsx";
import Sponsors from "./pages/Sponsors.jsx";
import { BeverageKit, Donate, PartnersHub, RestaurantKit } from "./pages/Partners.jsx";
import Shop from "./pages/Shop.jsx";
import Booklet from "./pages/Booklet.jsx";
import About from "./pages/About.jsx";
import Media from "./pages/Media.jsx";
import Faq from "./pages/Faq.jsx";
import Contact from "./pages/Contact.jsx";
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
            <Route path="menu" element={<MenuLanding />} />
            <Route path="menu/:slug" element={<MenuCategory />} />
            <Route path="food-and-drink" element={<Navigate to="/menu" replace />} />
            <Route path="restaurants" element={<Navigate to="/menu/restaurants" replace />} />
            <Route path="entertainment" element={<Entertainment />} />
            <Route path="entertainers" element={<Entertainers />} />
            <Route path="tasty-bucks" element={<Coupons />} />
            <Route path="coupons" element={<Navigate to="/tasty-bucks" replace />} />
            <Route path="map" element={<MapPage />} />
            <Route path="visit" element={<Visit />} />
            <Route path="getting-there" element={<GettingThere />} />
            <Route path="accessibility" element={<Accessibility />} />
            <Route path="get-involved" element={<GetInvolved />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="perform" element={<Perform />} />
            <Route path="volunteer" element={<Volunteer />} />
            <Route path="sponsorship" element={<Sponsors />} />
            <Route path="sponsors" element={<Navigate to="/sponsorship" replace />} />
            <Route path="partners" element={<PartnersHub />} />
            <Route path="media-kit" element={<Navigate to="/partners" replace />} />
            <Route path="partners/restaurants" element={<RestaurantKit />} />
            <Route path="partners/beverage" element={<BeverageKit />} />
            <Route path="donate" element={<Donate />} />
            <Route path="shop" element={<Shop />} />
            <Route path="booklet" element={<Booklet />} />
            <Route path="about" element={<About />} />
            <Route path="media" element={<Media />} />
            <Route path="faq" element={<Faq />} />
            <Route path="contact" element={<Contact />} />
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
