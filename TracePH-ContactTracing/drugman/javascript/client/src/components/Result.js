import React, { Component } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import '../App.css'
import {Table} from 'react-bootstrap'

export class Result extends Component {
    state={
        contacts:{timestamp:'',userId1:'',userId2:''}
    }

    search = (id) =>{
        console.log(id);
        axios.get(`http://localhost:8080/api/contact/${id}`)
        .then(res=> this.setState({contacts: JSON.parse(res.data.response)}));
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
      <th>Timestamp</th>
      <th>User ID 1</th>
      <th>User ID 2</th>
      </tr>
      </thead>
        <tbody>
        <tr>
      <td>{this.state.contacts.timestamp}</td>
      <td>{this.state.contacts.userId1}</td>
      <td>{this.state.contacts.userId2}</td>
      </tr>
      </tbody>
      </Table>
</div>
        </React.Fragment>
        
    );
  }
}


export default Result;