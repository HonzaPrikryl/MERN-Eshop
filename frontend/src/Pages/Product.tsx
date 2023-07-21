import React, { useEffect, FC } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchProduct } from "../redux/productSlice";
import { IStore } from "../redux/types";

const ProductScreen: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { product, status, error } = useAppSelector(
    (state: IStore) => state.productReducer
  );

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>
      {status === "loading" ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Error</h2>
      ) : (
        <Row>
          <Col md={6} className="mb-2">
            <h3>{product.name}</h3>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup>
              <ListGroupItem className="mb-2">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color="gold"
                />
              </ListGroupItem>
            </ListGroup>
            <ListGroup>
              <ListGroupItem>
                <Col>
                  <Row>
                    <h5>Description:</h5>
                  </Row>
                  <Row>{product.description}</Row>
                </Col>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "in Stock" : "Out of stock"}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add to cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
