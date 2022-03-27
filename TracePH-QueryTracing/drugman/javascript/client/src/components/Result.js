import React, { Component } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import '../App.css'
import {Table} from 'react-bootstrap'

export class Result extends Component {
    state={
        queries:{timestamp:'',userId:''}
    }

    search = (id) =>{
        console.log(id);
        axios.get(`http://localhost:8080/api/query/${id}`)
        .then(res=> this.setState({queries: JSON.parse(res.data.response)}));
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
      <th>User ID</th>
      </tr>
      </thead>
        <tbody>
        <tr>
      <td>{this.state.queries.timestamp}</td>
      <td>{this.state.queries.userId}</td>
      </tr>
      </tbody>
      </Table>
</div>
        </React.Fragment>
        
    );
  }
}


export default Result;