import React, { FC } from "react";
import { Col, Row } from "react-bootstrap";
import ProductDetail from "../components/ProductDetail";
import { IProduct } from "../redux/types";
import { useGetProductsQuery } from "../redux/api/apiSlice";

const HomeScreen: FC = () => {
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery();

  return (
    <>
      <h1 className="mt-3">Naše produkty</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <h2>{error.toString()}</h2>
      ) : (
        isSuccess && (
          <Row>
            {products.map((product: IProduct) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductDetail product={product} />
              </Col>
            ))}
          </Row>
        )
      )}
    </>
  );
};

export default HomeScreen;
