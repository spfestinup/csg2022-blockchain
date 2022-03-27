import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Table} from 'react-bootstrap'

export class Tab extends Component {
    render() {
        return(
            <Table striped bordered hover variant="dark">
        <thead>
        <tr>
      <th className="com">Timestamp</th>
      <th className="com">User ID 1</th>
      <th className="date">User ID 2</th>
      </tr>
      </thead>
      <tbody>
      {this.props.contacts.map((res) => (
          <tr key={res.Key}>
                <td className="obj">{res.Record.timestamp}</td>
                <td className="com">{res.Record.userId1}</td>
                <td className="com">{res.Record.userId2}</td>

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