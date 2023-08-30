import React, { FC } from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface ICheckoutProps {
  step_1?: boolean;
  step_2?: boolean;
  step_3?: boolean;
  step_4?: boolean;
  active?: string;
}

const CheckoutSteps: FC<ICheckoutProps> = ({
  step_1,
  step_2,
  step_3,
  step_4,
  active,
}) => {
  return (
    <Nav>
      <Nav.Item className="justify-content-center">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <i
            className={
              step_1
                ? active === "step_1"
                  ? "fa-solid fa-circle"
                  : "fa-solid fa-circle-check"
                : "fa-regular fa-circle"
            }
          ></i>
          <LinkContainer to="/login">
            <Nav.Link disabled={!step_1}>Sign In</Nav.Link>
          </LinkContainer>
        </div>
      </Nav.Item>
      <Nav.Item className="justify-content-center">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <i
            className={
              step_2
                ? active === "step_2"
                  ? "fa-solid fa-circle"
                  : "fa-solid fa-circle-check"
                : "fa-regular fa-circle"
            }
          ></i>
          <LinkContainer to="/shipping">
            <Nav.Link disabled={!step_2}>Shipping</Nav.Link>
          </LinkContainer>
        </div>
      </Nav.Item>
      <Nav.Item className="justify-content-center">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <i
            className={
              step_3
                ? active === "step_3"
                  ? "fa-solid fa-circle"
                  : "fa-solid fa-circle-check"
                : "fa-regular fa-circle"
            }
          ></i>
          <LinkContainer to="/payment">
            <Nav.Link disabled={!step_3}>Payment</Nav.Link>
          </LinkContainer>
        </div>
      </Nav.Item>
      <Nav.Item className="justify-content-center">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <i
            className={
              step_4
                ? active === "step_4"
                  ? "fa-solid fa-circle"
                  : "fa-solid fa-circle-check"
                : "fa-regular fa-circle"
            }
          ></i>
          <LinkContainer to="/placeOrder">
            <Nav.Link disabled={!step_4}>Place order</Nav.Link>
          </LinkContainer>
        </div>
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
