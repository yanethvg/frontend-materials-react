import React from 'react'
import { NavLink } from 'react-router-dom'
import {routes }from './../../Routers'
//Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//react-router boostrap
import {LinkContainer} from 'react-router-bootstrap'

function Menu() {
    return (
        <Navbar bg="dark" variant="dark" sticky="top" className="mb-4">
            <Container>
            <Nav className="me-auto">
            {routes.map(route =>(
                <LinkContainer to={route.path} key={route.path}>
                    <Nav.Link>{route.text}</Nav.Link>
                </LinkContainer>
                )
            )}
            </Nav>
            </Container>
        </Navbar>
    )
}

export { Menu }