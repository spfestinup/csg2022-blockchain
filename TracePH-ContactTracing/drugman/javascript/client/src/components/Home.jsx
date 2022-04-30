import React, {useState, useEffect} from 'react';
import API from '../api/api'
import { styled } from '@mui/material/styles';
import { 
    CircularProgress,
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

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [drugs, setDrugs] = useState([])

    //componentDidMount
    useEffect(() => {
        // This is some React trick for useEffect to not show errors
        // https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
        async function queryAllDrugs() {
          try {
            setLoading(true)
            const res = await API.getAllDrugs()
            const parsedDrugs = JSON.parse(res.data.response)
            setDrugs(parsedDrugs)
    
            setLoading(false)
          }
          catch(e) {
            //TO DO: Display error
            console.log(e)
          }
        }
        
        queryAllDrugs()
    }, [])

    return(
        <div>
            {loading?
                <CircularProgress/>:
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
            }
        </div>
    )
}

