import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/api/usersApiSlice";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => state.authReducer);
  const [logoutApi] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/");
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
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="/">Mern e-shop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <>
                <NavDropdown
                  title={
                    <>
                      <i className="fas fa-user"></i> {userInfo.name}
                    </>
                  }
                  id="user"
                >
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Log in
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
