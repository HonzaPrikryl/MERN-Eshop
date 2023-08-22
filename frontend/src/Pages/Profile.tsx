import React, { useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../redux/api/usersApiSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toast } from "react-toastify";
import { setUserInfo } from "../redux/authSlice";

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateProfileApi, { isLoading, error }] = useUpdateUserMutation();
  const { userInfo } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (!userInfo) return;
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo]);

  const canSave = [email, name].every(Boolean);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (canSave) {
      try {
        const res = await updateProfileApi({
          name,
          email,
          currentPassword,
          newPassword,
        }).unwrap();
        dispatch(setUserInfo(res));
        navigate("/");
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          toast.error("Current password do not match", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      }
    } else {
      toast.error("Name and email fields cannot be empty", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
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
                <h2 className="fw-bold mb-2 text-uppercase ">Update profile</h2>
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
                      <Form.Label>Current password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>New password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    ></Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Save changes
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

export default ProfileScreen;
