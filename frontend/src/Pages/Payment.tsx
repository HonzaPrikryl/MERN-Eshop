import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import CheckoutSteps from "../components/CheckoutSteps";
import { userPaymentMethod } from "../redux/paymentMethodSlice";

const Payment = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPaymentMethod = useAppSelector(
    (state) => state.paymentMethodReducer.paymentMethod
  );
  const [paymentMethod, setPaymentMethod] = useState(currentPaymentMethod);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(userPaymentMethod(paymentMethod));
    navigate("/placeOrder");
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center mt-4">
        <Col md={7} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-5 mt-md-3 mb-6">
                <div className="d-flex justify-content-center my-3">
                  {" "}
                  {/* Added my-5 here */}
                  <CheckoutSteps step_1 step_2 step_3 active="step_3" />
                </div>
                <h2 className="fw-bold mb-2 text-uppercase ">Payment Method</h2>
                <div className="mb-3">
                  <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicAddress">
                      <Form.Label as="legend">Select Method</Form.Label>
                      <Col>
                        <Form.Check
                          type="radio"
                          label="Credit card"
                          id="Credit card"
                          name="paymenMethod"
                          value="Credit card"
                          checked
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <Form.Check
                          type="radio"
                          label="PayPal"
                          id="PayPal"
                          name="paymenMethod"
                          value="PayPal"
                          checked
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <Form.Check
                          type="radio"
                          label="Stripe"
                          id="Stripe"
                          name="paymenMethod"
                          value="Stripe"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                      </Col>
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Continue to summary
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
