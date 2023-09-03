import React, { useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUserInfo } from "../redux/authSlice";
import { toast } from "react-toastify";
import { useLoginMutation } from "../redux/api/usersApiSlice";

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useAppSelector((state) => state.authReducer);

  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      const absoluteRedirect = redirect.startsWith("/")
        ? redirect
        : `/${redirect}`;
      navigate(absoluteRedirect);
    }
  }, [userInfo, navigate, redirect]);

  const canSave = [email, password].every(Boolean) && !isLoading;

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (canSave) {
      try {
        const res = await login({ email, password }).unwrap();
        dispatch(setUserInfo(res));
        navigate("/");
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          toast.error("Invalid email or password. Please try again.", {
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
                <h2 className="fw-bold mb-2 text-uppercase ">Login</h2>
                <p className=" mb-5">Please enter your login and password!</p>
                <div className="mb-3">
                  <Form onSubmit={submitHandler}>
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
                      <Form.Label>password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <p className="small">
                        <a className="text-primary" href="#!">
                          Forgot password?
                        </a>
                      </p>
                    </Form.Group>
                    <div className="d-flex">
                      <Button variant="primary" type="submit">
                        Login
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Don't have an account?{" "}
                      <Link to={`/registration`}>Sign Up</Link>
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

export default LoginScreen;
