import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { CartItem } from "../redux/types";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { changeQuantity, deleteFromCart } from "../redux/cartSlice";

const CartScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems: CartItem[] = useSelector(
    (state: RootState) => state.cartReducer.cartItems
  );

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    dispatch(changeQuantity({ itemId, newQuantity }));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  const backToHomeHandler = () => {
    navigate("/");
  };

  return (
    <>
      <Row>
        <Col style={{ paddingTop: "1em", paddingBottom: "1em" }}>
          <h1>Shopping Cart</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ListGroup>
              {cartItems.map(({ product }: CartItem) => (
                <ListGroup.Item key={product._id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product${product._id}`}>{product.name}</Link>
                    </Col>
                    <Col md={2}>
                      ${(product.price! * product.quantity).toFixed(2)}
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={product.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            product._id!,
                            parseInt(e.target.value, 10)
                          )
                        }
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
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => dispatch(deleteFromCart(product._id!))}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <h3>
                Subtotal (
                {cartItems.reduce(
                  (acc, item) => acc + item.product.quantity,
                  0
                )}
                )
              </h3>
              $
              {cartItems
                .reduce(
                  (acc, item) =>
                    acc + item.product.price! * item.product.quantity,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                className="w-100"
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                onClick={backToHomeHandler}
                className="w-100"
                variant="outline-primary"
              >
                Continue shopping
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
