import React from "react";
import { LoginModal, Navbar, RegisterModal } from "./components";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";



axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {


  return (
    <div className="">
      <BrowserRouter>
        
          <ToastContainer /> 
          <RegisterModal />
          <LoginModal />  
          <Navbar/>
  
      </BrowserRouter>
    </div>
  );
}

export default App;
