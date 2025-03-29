import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home"
import Navbar from "./Navbar"
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import {UserAccountDropdown} from "./UserAccountDropdown"



function AllRoutes(){
    return(
        <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/login" element={<Login/>}/>

        </Routes>
       
        
        </>
    )
}

export default AllRoutes