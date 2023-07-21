import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./Pages/Main";
import ProductScreen from "./Pages/Product";
import LoginScreen from "./Pages/Login";
import Registration from "./Pages/Registration";
import CartScreen from "./Pages/Cart";

const App = () => {
  return (
    <>
      <Header />
      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/cart" element={<CartScreen />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
};

export default App;
