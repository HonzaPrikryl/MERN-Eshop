import React, { useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/usersApiSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toast } from "react-toastify";
import { register } from "../redux/authSlice";

const Registration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerApi, { isLoading }] = useRegisterMutation();
  const { userInfo } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const canSave =
    [name, email, password, confirmPassword].every(Boolean) && !isLoading;
  const passwordIsSame = password === confirmPassword;

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSave) {
      toast.error("Please fill in all required fields", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }
    if (canSave && !passwordIsSame) {
      toast.error("Passwords do not match", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }
    if (canSave && passwordIsSame) {
      try {
        const res = await registerApi({
          name,
          email,
          password,
          confirmPassword,
        }).unwrap();
        dispatch(register(res));
        navigate("/");
        setEmail("");
        setPassword("");
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          toast.error("An error occurred", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      }
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center mt-4">
        <Col md={6} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-uppercase ">Registration</h2>
                <div className="mb-3">
                  <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="Name">
                      <Form.Label className="text-center">Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">
                        Email address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    ></Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Create Account
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Already have an account??{" "}
                      <Link to={`/Login`}>Log in</Link>
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
