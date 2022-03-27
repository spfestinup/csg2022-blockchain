import React, { Component } from 'react';
import axios from 'axios';
import { Form,Button } from 'react-bootstrap';

export class AddContact extends Component {
    state={
        id:'',
        timestamp:'',
        userid1:'',
        userid2:''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.addContact(this.state);
        this.setState({
        id:'',
        timestamp:'',
        userid1:'',
        userid2:''});
    }

    addContact = (state) =>{
        //console.log(id);
        axios.post(`http://localhost:8080/api/adddrug`,{
            'contactid':state.id,
            'timestamp':state.timestamp,
            'userid1':state.userid1,
            'userid2':state.userid2
        })
      }

  render() {
    return (
        <React.Fragment>
            <div className='search'>

    <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Contact ID</Form.Label>
    <Form.Control type='text' name='id' placeholder='Add Contact ID' value={this.state.id} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Timestamp</Form.Label>
    <Form.Control type='text' name='timestamp' placeholder='Timestamp' value={this.state.timestamp} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>User ID 1</Form.Label>
    <Form.Control type='text' name='userid1' placeholder='User ID 1' value={this.state.userid1} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>User ID 2</Form.Label>
    <Form.Control type='text' name='userid2' placeholder='User ID 2' value={this.state.userid2} onChange={this.onChange} />
  </Form.Group>

  <Button variant="primary" type="submit" onClick={this.onSubmit}>
    Add Contact
  </Button>
</Form>

            </div>
        </React.Fragment>
        
    );
  }
}


export default AddContact;