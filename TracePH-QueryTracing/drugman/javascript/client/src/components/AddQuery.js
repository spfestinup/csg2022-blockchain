import React, { Component } from 'react';
import axios from 'axios';
import { Form,Button } from 'react-bootstrap';

export class AddQuery extends Component {
    state={
        id:'',
        timestamp:'',
        userId:'',
        adminId:'',
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.addQuery(this.state);
        this.setState({
        id:'', 
        timestamp:'',
        userId:'',
        adminId:''});
    }

    addQuery = (state) =>{
        //console.log(id);
        axios.post(`http://localhost:8080/api/queries`,{
            'queryid':state.id,
            'timestamp':state.timestamp,
            'userid':state.userId,
            'adminid':state.adminId
        })
      }

  render() {
    return (
        <React.Fragment>
            <div className='search'>

    <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Query ID</Form.Label>
    <Form.Control type='text' name='id' placeholder='Add Query ID' value={this.state.id} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Timestamp</Form.Label>
    <Form.Control type='text' name='timestamp' placeholder='Timestamp' value={this.state.timestamp} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>User ID</Form.Label>
    <Form.Control type='text' name='userid' placeholder='User ID' value={this.state.userId} onChange={this.onChange} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Admin ID</Form.Label>
    <Form.Control type='text' name='admin' placeholder='Admin ID' value={this.state.adminId} onChange={this.onChange} />
  </Form.Group>

  <Button variant="primary" type="submit" onClick={this.onSubmit}>
    Add Query
  </Button>
</Form>

            </div>
        </React.Fragment>
        
    );
  }
}


export default AddQuery;