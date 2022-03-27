import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap'
import { Nav } from 'react-bootstrap';


export class Navi extends Component {
  render() {
    return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Query Tracing</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/search">Search</Nav.Link>
          <Nav.Link href="/changeTimestamp">Change Timestamp</Nav.Link>
          <Nav.Link href="/changeUserId">Change User ID</Nav.Link>
          <Nav.Link href="/addQuery">Add Query</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}



export default Navi;