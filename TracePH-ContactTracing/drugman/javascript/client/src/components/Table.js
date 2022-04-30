import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper 
} from '@mui/material'
export default function Tab(props) {
    const drugs = props.drugs

    return(
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell> Drug Name </TableCell>
                        <TableCell> Timestamp </TableCell>
                        <TableCell> Holder </TableCell>
                        <TableCell> Location </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
            </Table>
        </TableContainer>
    )
}


// export class Tab extends Component {
//     render() {
//         return(
//             <Table striped bordered hover variant="dark">
//         <thead>
//         <tr>
//       <th className="obj">Drug Name</th>
//       <th className="com">Timestamp</th>
//       <th className="com">Holder</th>
//       <th className="date">Location</th>
//       </tr>
//       </thead>
//       <tbody>
//       {this.props.drugs.map((res) => (
//           <tr key={res.Key}>
//                 <td className="obj">{res.Record.drug}</td>
//                 <td className="com">{res.Record.timestamp}</td>
//                 <td className="com">{res.Record.holder}</td>
//                 <td className="date">{res.Record.location}</td>

//                 </tr>
//         ))}
      
    
    
//       </tbody>
//       </Table>
//                 ) 
          
          
// }
// }

// Table.propTypes = {
//     drugs: PropTypes.array
// }

// export default Tab