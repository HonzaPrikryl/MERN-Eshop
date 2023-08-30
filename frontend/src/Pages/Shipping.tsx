import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toast } from "react-toastify";
import { setShippingAddress } from "../redux/shippingAddressSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const Shipping = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const shippingAddress = useAppSelector(
    (state) => state.shippingAddressReducer
  );
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const canContinue = [address, city, postalCode, country].every(Boolean);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canContinue) {
      toast.error("Please fill in all required fields", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      dispatch(
        setShippingAddress({
          address,
          city,
          postalCode,
          country,
        })
      );
      navigate("/payment");
    }
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
                  <CheckoutSteps step_1 step_2 active="step_2" />
                </div>
                <h2 className="fw-bold mb-2 text-uppercase ">
                  Shipping address
                </h2>
                <div className="mb-3">
                  <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicAddress">
                      <Form.Label className="text-center">Address</Form.Label>
                      <Form.Control
                        type="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCity">
                      <Form.Label className="text-center">City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicPostalCode"
                    >
                      <Form.Label>PostalCode</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter postalCode"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCountry">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    ></Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Continue to payment
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

export default Shipping;
