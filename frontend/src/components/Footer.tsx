import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className="my-4">
      <Row>
        <Col className="text-center">Copyright &copy; Jan Přikryl </Col>
      </Row>
    </Container>
  );
};

export default Footer;
