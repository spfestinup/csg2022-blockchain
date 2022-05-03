import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
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
    Paper,
    Typography,
    Container,
    Grid,
    TextField,
    Button,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { tableCellClasses } from '@mui/material/TableCell';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Search, Add } from '@mui/icons-material'
import InputAdornment from '@mui/material/InputAdornment';

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
    ':hover': {
      cursor: 'pointer'
    },
}));

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [queries, setQueries] = useState([])
    const [displayedQueries, setDisplayedQueries] = useState([])
    const [selectedQuery, setSelectedQuery] = useState({})
    const [newUserId, setNewUserId] = useState('')
    const [newTimestamp, setNewTimestamp] = useState('')
    const [formDialog, setFormDialog] = React.useState(false);

    const navigate = useNavigate()

    //componentDidMount
    useEffect(() => {
        // This is some React trick for useEffect to not show errors
        // https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
        async function queryAllQueries() {
          try {
            setLoading(true)
            const res = await API.getAllQueries()
            const parsedQueries = JSON.parse(res.data.response)
            setQueries(parsedQueries)
            setDisplayedQueries(parsedQueries)
            setLoading(false)
            console.log(parsedQueries)
          }
          catch(e) {
            //TO DO: Display error
            console.log(e)
          }
        }
        
        queryAllQueries()
    }, [])

    function searchTermChange(e) {
      const searchTerm = e.target.value.toLowerCase()

      const toDisplay = []
      for(let query of queries) {
        const adminId = query.Record.adminId.toLowerCase()
        const userId = query.Record.userId.toLowerCase()
        const timestamp = query.Record.timestamp.toLowerCase()

        if(adminId.includes(searchTerm) || userId.includes(searchTerm) || timestamp.includes(searchTerm)) {
          toDisplay.push(query)
        }

        setDisplayedQueries(toDisplay)
      }
    }

    const showQuery = (query) => (e) => {
      setSelectedQuery(query)
      setNewUserId(query.Record.userId)
      setNewTimestamp(query.Record.timestamp)
      
      openFormDialog()
    }

    function openFormDialog() {
      setFormDialog(true)
    }

    function closeFormDialog() {
      setFormDialog(false)
    }

    async function doUpdateUserId() {
      try {
        setUpdateLoading(true)

        const res = await API.updateUserId({id: selectedQuery.Id, userid: newUserId})
        console.log(res.data)

        navigate(0)
      }
      catch(e) {
        setUpdateLoading(false)
        console.log(e)
      }
    }

    async function doUpdateTimestamp() {
      try {
        setUpdateLoading(true)

        const res = await API.updateTimestamp({id: selectedQuery.Id, timestamp: newTimestamp})
        console.log(res.data)

        navigate(0)
      }
      catch(e) {
        setUpdateLoading(false)
        console.log(e)
      }
    }

    return(
      <Container>
        {loading?
        <CircularProgress/>:
        <Grid container direction="column" rowSpacing={2}>
          <Grid item>
            <Typography variant="h2" sx={{mb: 2}}>
              Queries
            </Typography>
            <TextField
              label="Search"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={searchTermChange}
            />
          </Grid>
          <Grid item>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center"> Query ID </StyledTableCell>
                            <StyledTableCell align="center"> Admin ID </StyledTableCell>
                            <StyledTableCell align="center"> User ID </StyledTableCell>
                            <StyledTableCell align="center"> Timestamp </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedQueries.map(query => (
                            <StyledTableRow key={query.Id} onClick={showQuery(query)}>
                                <StyledTableCell align="center"> {query.Id} </StyledTableCell>
                                <StyledTableCell align="center"> {query.Record.adminId} </StyledTableCell>
                                <StyledTableCell align="center"> {query.Record.userId} </StyledTableCell>
                                <StyledTableCell align="center"> {query.Record.timestamp} </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>   
          </Grid>
          <Grid item>
                <Button variant="outlined" href="/addQuery" endIcon={<Add/>}> ADD QUERY </Button>
            </Grid>
        </Grid>
        }
        <Dialog open={formDialog} fullWidth>
          <DialogTitle> 
            <Typography variant="h4" component='div'>
                Change Query Info
            </Typography> 
          </DialogTitle>
          <DialogContent>
            <Grid container direction="column" rowSpacing={2}>
              <Grid item sx={{mt: 1}}>
                <TextField defaultValue={newUserId} label="User ID" onChange={(e) => {setNewUserId(e.target.value)}} fullWidth></TextField>
              </Grid>
              <Grid item>
                <LoadingButton loading={updateLoading} variant="contained" color="warning" onClick={doUpdateUserId}>CHANGE USER ID</LoadingButton>
              </Grid>
              <Grid item sx={{mt: 4}}>
                <TextField defaultValue={newTimestamp} label="Phone" onChange={(e) => {setNewTimestamp(e.target.value)}} fullWidth></TextField>
              </Grid>
              <Grid item>
                <LoadingButton loading={updateLoading} variant="contained" color="success" onClick={doUpdateTimestamp}>CHANGE TIMESTAMP</LoadingButton>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={closeFormDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Container>
    )
}

