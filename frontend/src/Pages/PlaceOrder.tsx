import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Image,
  Button,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { useCreateNewOrderMutation } from "../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import { IOrderItem } from "../redux/types";
import { newOrderCreated } from "../redux/orderSlice";

const PlaceOrder = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [createNewOrderApi, { isSuccess }] = useCreateNewOrderMutation();
  const { paymentMethod } = useAppSelector(
    (state) => state.paymentMethodReducer
  );
  const shippingAddress = useAppSelector(
    (state) => state.shippingAddressReducer
  );
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const orderItems = useAppSelector((state) => state.orderReducer);

  const itemsPrice = cartItems.reduce(
    (acc: number, item: { product: { price: any; quantity: number } }) =>
      acc + item.product.price! * item.product.quantity,
    0
  );
  const shippingPrice = 10;
  const taxPrice = itemsPrice * 0.21;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const transformedOrderItems: IOrderItem[] = cartItems.map((item) => ({
    name: item.product.name,
    qty: item.product.quantity,
    image: item.product.image,
    price: item.product.price!,
    product: item.product._id!,
  }));

  useEffect(() => {
    if (isSuccess) navigate(`/order/${orderItems._id}`);
  }, [isSuccess, orderItems, navigate]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createNewOrderApi({
        orderItems: transformedOrderItems,
        shipping: shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
      }).unwrap();
      dispatch(newOrderCreated(res));
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center mt-4">
        <Col md={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Header className="d-flex justify-content-center pt-4">
              <CheckoutSteps step_1 step_2 step_3 step_4 active="step_4" />
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={8}>
                  <h4>Shipping Address</h4>
                  <p>
                    {shippingAddress.address}, {shippingAddress.city},{" "}
                    {shippingAddress.postalCode}, {shippingAddress.country}
                  </p>

                  <h4>Payment Method</h4>
                  <p>Method: {paymentMethod}</p>

                  <h4>Order Items</h4>
                  <ListGroup variant="flush">
                    {cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.product.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            ${item.product.price} x {item.product.quantity}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Header>Order summary</Card.Header>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <div className="d-flex justify-content-between">
                            <span>Items:</span>
                            <span>${itemsPrice.toFixed(2)}</span>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className="d-flex justify-content-between">
                            <span>Shipping:</span>
                            <span>${shippingPrice}</span>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className="d-flex justify-content-between">
                            <span>Tax:</span>
                            <span>${taxPrice.toFixed(2)}</span>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className="d-flex justify-content-between">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Button
                            type="button"
                            onClick={submitHandler}
                            className="w-100"
                          >
                            Continue shopping
                          </Button>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrder;
