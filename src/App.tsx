// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homescreen from "./homescreen";
import Login from "./login";
import Signup from "./signup";
import ProductPage from "./productpage"; 
import Cart from "./cart";

import Checkout from "./checkout";
import ProfilePage from "./profile";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
         <Route path="/Cart" element={<Cart />} />
         <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/CheckoutPage1" element={<Checkout />} />
        
        <Route path="/Product/:id" element={<ProductPage />} /> {/* param route */}
      </Routes>
    </Router>
  );
};

export default App;
