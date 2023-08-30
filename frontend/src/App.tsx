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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileScreen from "./Pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Shipping from "./Pages/Shipping";
import Payment from "./Pages/Payment";
import PlaceOrder from "./Pages/PlaceOrder";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeOrder" element={<PlaceOrder />} />
          {/* Private route */}
          <Route path="" element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfileScreen />} />
          </Route>
        </Routes>
      </Container>
      <Footer />
    </>
  );
};

export default App;
