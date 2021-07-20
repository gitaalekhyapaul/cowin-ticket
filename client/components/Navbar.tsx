import React from "react";
import Link from "next/link";
import { Navbar, Nav, Container } from "react-bootstrap";

import Logo from "./Logo";
import Clock from "./Clock";

const TopBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-5 mb-md-0 sticky-top">
      <Container fluid={true}>
        <Link href="/" passHref>
          <Navbar.Brand style={{ cursor: "pointer" }}>
            <Logo />
            <span className="d-md-none mx-3">
              <strong>Eve&apos;s Clinic Portal</strong>
            </span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse style={{ textDecoration: "none", color: "white" }}>
          <Link href="/" passHref>
            <Nav.Link>
              <span style={{ color: "white" }}>
                <strong>Register</strong>
              </span>
            </Nav.Link>
          </Link>
          <Link href="/vaccinate" passHref>
            <Nav.Link>
              <span style={{ color: "white" }}>
                <strong>Vaccinate</strong>
              </span>
            </Nav.Link>
          </Link>
        </Navbar.Collapse>
        <Nav.Link className="ml-auto m-0 p-0 d-none d-md-block">
          <Clock />
        </Nav.Link>
      </Container>
    </Navbar>
  );
};

export default TopBar;
