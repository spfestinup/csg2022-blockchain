import React, { Component } from 'react';
import axios from 'axios';
import { Form,Button } from 'react-bootstrap';

export class AddUser extends Component {
    state={
        id:'',
        location:'',
        phone:'',
        email:''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.addContact(this.state);
        this.setState({
        id:'',
        location:'',
        phone:'',
        email:''});
    }

    addContact = (state) =>{
        //console.log(id);
        axios.post(`http://localhost:8080/api/users`,{
            'userid':state.id,
            'location':state.location,
            'phone':state.phone,
            'email':state.email
        })
      }

  render() {
    return (
        <React.Fragment>
            <div className='search'>

    <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>User ID</Form.Label>
    <Form.Control type='text' name='id' placeholder='Add User ID' value={this.state.id} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Location</Form.Label>
    <Form.Control type='text' name='location' placeholder='Location' value={this.state.location} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Phone</Form.Label>
    <Form.Control type='text' name='phone' placeholder='Phone' value={this.state.phone} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type='text' name='email' placeholder='Email' value={this.state.email} onChange={this.onChange} />
  </Form.Group>

  <Button variant="primary" type="submit" onClick={this.onSubmit}>
    Add User
  </Button>
</Form>

            </div>
        </React.Fragment>
        
    );
  }
}


export default AddUser;