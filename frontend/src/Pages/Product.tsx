import React, { FC, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { IStore } from "../redux/types";
import { addToCart } from "../redux/cartSlice";
import { fetchProduct } from "../redux/productSlice";

const ProductScreen: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState("1");
  const { product, status, error } = useAppSelector(
    (state: IStore) => state.productReducer
  );

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const handleAddToCartSubmit = () => {
    if (product) {
      const productWithQuantity = {
        ...product,
        quantity: parseInt(quantity, 10),
      };
      dispatch(addToCart({ product: productWithQuantity }));
    }
    navigate("/cart");
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>
      {status === "loading" ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Error</h2>
      ) : !product ? (
        <h2>Product not found</h2>
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
                <Row>
                  <Col>quantity:</Col>
                  <Col>
                    <Form.Control
                      as="select"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    >
                      {Array.from(
                        { length: product.countInStock },
                        (_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        )
                      )}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={handleAddToCartSubmit}
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
