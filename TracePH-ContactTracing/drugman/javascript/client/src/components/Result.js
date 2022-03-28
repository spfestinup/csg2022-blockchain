import React, { Component } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import '../App.css'
import {Table} from 'react-bootstrap'

export class Result extends Component {
    state={
        users:{userId:'',location:'',phone:'',email:''}
    }

    search = (id) =>{
        console.log(id);
        axios.get(`http://localhost:8080/api/user/${id}`)
        .then(res=> this.setState({users: JSON.parse(res.data.response)}));
      }

  render() {
    return (
        <React.Fragment>
            <div className='search'>
        <SearchBar search={this.search}/>
        </div>
     
        <div className="container row">
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
      <th>User ID</th>
      <th>Location</th>
      <th>Phone</th>
      <th>Email</th>
      </tr>
      </thead>
        <tbody>
        <tr>
      <td>{this.state.users.userId}</td>
      <td>{this.state.users.location}</td>
      <td>{this.state.users.phone}</td>
      <td>{this.state.users.email}</td>
      </tr>
      </tbody>
      </Table>
</div>
        </React.Fragment>
        
    );
  }
}


export default Result;