import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "./Navbar";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import MyAccountPage from "../component/MyAcccountPage";
import MyProfilePage from "../component/MyProfilePage";
import MyAddressesPage from "../pages/MyAddressPage";
import AddAddressPage from "../pages/AddAddressPage";

import EditAddressPage from "../pages/EditAddressPage";

// import AddressPage from "../component/AddressPage";
// import OrdersPage from "../component/OrdersPage";
// import OffersPage from "../component/OffersPage";
// import WishlistPage from "../component/WishlistPage";
// import DevicesPage from "../component/DevicesPage";
// import ServicePage from "../component/ServicePage";

function AllRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-account" element={<MyAccountPage />} />
        <Route path="/myprofile" element={<MyProfilePage />} />
        <Route path="/my-account/myprofile" element={<MyProfilePage />} />
        <Route path="/address" element={<MyAddressesPage />} />
        <Route path="/my-account/address" element={<MyAddressesPage />} />
        <Route path="/my-account/address/add" element={<AddAddressPage />} />
        <Route path="/my-account/address/edit/:id" element={<EditAddressPage />}/>
        {/* <Route path="/my-account/orders" element={<OrdersPage />} /> */}
        {/* <Route path="/my-account/offers" element={<OffersPage />} /> */}
        {/* <Route path="/my-account/wishlist" element={<WishlistPage />} /> */}
        {/* <Route path="/my-account/devices" element={<DevicesPage />} /> */}
        {/* <Route path="/my-account/service" element={<ServicePage />} /> */}
      </Routes>
    </>
  );
}

export default AllRoutes;
