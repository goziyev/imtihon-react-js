import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/products";
import ProductDetails from "./components/product";
import NavBar from "./components/header";
import About from "./components/about";
import Home from "./components/home";
import "./App.css";
import NoPage from "./components/noPage";

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
  