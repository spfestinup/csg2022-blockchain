import React from 'react';
import { styled } from '@mui/material/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper 
} from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

export default function Tab(props) {
    const drugs = props.drugs

    return(
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell> Drug Name </StyledTableCell>
                        <StyledTableCell> Timestamp </StyledTableCell>
                        <StyledTableCell> Holder </StyledTableCell>
                        <StyledTableCell> Location </StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {drugs.map(drug => (
                        <StyledTableRow key={drug.Id}>
                            <StyledTableCell> {drug.Record.drug} </StyledTableCell>
                            <StyledTableCell> {drug.Record.timestamp} </StyledTableCell>
                            <StyledTableCell> {drug.Record.holder} </StyledTableCell>
                            <StyledTableCell> {drug.Record.location} </StyledTableCell>
                        </StyledTableRow>
                    ))}
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