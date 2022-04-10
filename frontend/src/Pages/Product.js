import React, { useState, useEffect } from "react";
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
import axios from "axios";

const ProductScreen = () => {
  const { id } = useParams();
  // const product = products.find((p) => p._id === id);

  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, []);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>
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
    </>
  );
};

export default ProductScreen;
