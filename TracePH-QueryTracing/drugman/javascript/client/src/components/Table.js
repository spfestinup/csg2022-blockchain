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
      <th className="com">User ID</th>
      </tr>
      </thead>
      <tbody>
      {this.props.queries.map((res) => (
          <tr key={res.Key}>
                <td className="com">{res.Record.timestamp}</td>
                <td className="com">{res.Record.userId}</td>

                </tr>
        ))}
      
    
    
      </tbody>
      </Table>
                ) 
          
          
}
}

Table.propTypes = {
    queries: PropTypes.array
}

export default Tab