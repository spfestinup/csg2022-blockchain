import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Table} from 'react-bootstrap'

export class Tab extends Component {
    render() {
        return(
            <Table striped bordered hover variant="dark">
        <thead>
        <tr>
      <th className="com">User ID</th>
      <th className="com">Location</th>
      <th className="com">Phone</th>
      <th className="com">Email</th>
      </tr>
      </thead>
      <tbody>
      {this.props.contacts.map((res) => (
          <tr key={res.Key}>
                <td className="com">{res.Record.userId}</td>
                <td className="com">{res.Record.location}</td>
                <td className="com">{res.Record.phone}</td>
                <td className="com">{res.Record.email}</td>

                </tr>
        ))}
      
    
    
      </tbody>
      </Table>
                ) 
          
          
}
}

Table.propTypes = {
    contacts: PropTypes.array
}

export default Tab