import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap'
import { Nav } from 'react-bootstrap';


export class Navi extends Component {
  render() {
    return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">User Tracing</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/search">Search User</Nav.Link>
          {/* <Nav.Link href="/changeTimestamp">Change Timestamp</Nav.Link>
          <Nav.Link href="/changeUserId1">Change User ID 1</Nav.Link>
          <Nav.Link href="/changeUserId2">Change User ID 2</Nav.Link> */}
          <Nav.Link href="/addUser">Add User</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}



export default Navi;