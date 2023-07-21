import React, { useEffect, FC } from "react";
import { Col, Row } from "react-bootstrap";
import ProductDetail from "../components/ProductDetail";
import { useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import { useAppDispatch } from "../redux/hooks";
import { IStore } from "../redux/types";
import { IProduct } from "../redux/types";

const HomeScreen: FC = () => {
  const dispatch = useAppDispatch();
  const products = useSelector((state: IStore) => state.productsReducer);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <h1 className="mt-3">Naše produkty</h1>
      {products.status === "loading" ? (
        <h2>Loading...</h2>
      ) : products.error ? (
        <h2>Error</h2>
      ) : (
        <Row>
          {products.products.map((product: IProduct) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <ProductDetail product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
