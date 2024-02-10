import React from "react";
import { LoginModal, Navbar, RegisterModal, RentModal } from "./components";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ListingPage from "./Pages/ListingPage/ListingPage";




axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App({children}) {


  return (
    <div className="">
      <BrowserRouter>
        
          <ToastContainer /> 
          <RegisterModal />
          <LoginModal /> 
          <RentModal /> 
          <Navbar/>

          {/* <div className="pb-20 pt-28"> */}
          <div className="">
            {/* {children} */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings/:listingId" element={<ListingPage />} />
            </Routes>

          </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
