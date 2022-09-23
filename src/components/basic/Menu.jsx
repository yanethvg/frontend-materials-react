import React from "react";
import { routes } from "./../../Routers";
//Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//react-router boostrap
import { LinkContainer } from "react-router-bootstrap";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { getLogout } from "../../actions/logoutAction";
import Button from "react-bootstrap/Button";

function Menu() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.access);

  const logout = () => dispatch(getLogout(auth.access_token));

  let permissions = [];
  if (auth) permissions = auth.permissions;

  return (
    <Navbar bg="dark" variant="dark" sticky="top" className="mb-4">
      <Container>
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          {!auth && (
            <>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </>
          )}
          {auth && (
            <>
              {routes.map(
                (route) =>
                  permissions.includes(route.permission) && (
                    <LinkContainer to={route.path} key={route.path}>
                      <Nav.Link>{route.text}</Nav.Link>
                    </LinkContainer>
                  )
              )}
              <Button
                variant="secondary"
                onClick={() => logout(() => history.push("/"))}
              >
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export { Menu };
