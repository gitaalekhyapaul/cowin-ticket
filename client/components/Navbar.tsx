import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Navbar, Nav, Container } from "react-bootstrap";
import { AuthContext } from "./Stores/AuthContext";

import Logo from "./Logo";
import Clock from "./Clock";
import RegCount from "./RegCount";

const Role = () => {
  const authContext = useContext(AuthContext);
  return authContext.auth ? <>{authContext.role.toUpperCase()}</> : <></>;
};

const TopBar = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const logoutHandler = () => {
    sessionStorage.clear();
    router.push("/login");
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="md"
      className="mb-5 mb-md-0 sticky-top"
    >
      <Container fluid={true}>
        <Link href="/" passHref>
          <Navbar.Brand style={{ cursor: "pointer" }}>
            <Logo />
            <span className="d-md-none mx-3">
              <strong>Eve&apos;s Clinic Portal</strong>
            </span>
            <span className="d-none d-md-inline mx-3">
              <strong>
                <Role />
              </strong>
            </span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />

        <Navbar.Collapse
          className="justify-content-around"
          style={{ textDecoration: "none", color: "white" }}
        >
          {authContext.auth ? (
            <>
              <Link href="/" passHref>
                <Nav.Link>
                  <div style={{ color: "white" }}>
                    <button className="btn btn-outline-secondary text-white w-100">
                      <strong>Register</strong>
                    </button>
                  </div>
                </Nav.Link>
              </Link>
              <Link href="/vaccinate" passHref>
                <Nav.Link>
                  <div style={{ color: "white" }}>
                    <button className="btn btn-outline-secondary text-white w-100">
                      <strong>Vaccinate</strong>
                    </button>
                  </div>
                </Nav.Link>
              </Link>
              {authContext.role === "admin" ? (
                <Link href="/reports" passHref>
                  <Nav.Link>
                    <div style={{ color: "white" }}>
                      <button className="btn btn-outline-secondary text-white w-100">
                        <strong>Reports</strong>
                      </button>
                    </div>
                  </Nav.Link>
                </Link>
              ) : (
                <></>
              )}
              <Nav.Link>
                <button
                  className="btn btn-danger w-100"
                  onClick={() => logoutHandler()}
                >
                  <strong>Logout</strong>
                </button>
              </Nav.Link>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Nav.Link>
                  <div style={{ color: "white" }}>
                    <button className="btn btn-outline-secondary text-white w-100">
                      <strong>Login</strong>
                    </button>
                  </div>
                </Nav.Link>
              </Link>
            </>
          )}
        </Navbar.Collapse>
        <Nav.Link className="ml-auto m-0 p-0 d-none d-md-block">
          {authContext.auth ? <RegCount /> : <></>}
          <Clock />
        </Nav.Link>
      </Container>
    </Navbar>
  );
};

export default TopBar;
