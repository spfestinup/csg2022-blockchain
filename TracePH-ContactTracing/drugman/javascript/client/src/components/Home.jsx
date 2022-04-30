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
    const [drugs, setDrugs] = useState([])
    const [selectedDrug, setSelectedDrug] = useState({})
    const [newHolder, setNewHolder] = useState('')
    const [newLocation, setNewLocation] = useState('')
    const [formDialog, setFormDialog] = React.useState(false);

    const navigate = useNavigate()

    //componentDidMount
    useEffect(() => {
        // This is some React trick for useEffect to not show errors
        // https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
        async function queryAllDrugs() {
          try {
            setLoading(true)
            const res = await API.getAllDrugs()
            const parsedDrugs = JSON.parse(res.data.response)
            await setDrugs(parsedDrugs)
    
            setLoading(false)
          }
          catch(e) {
            //TO DO: Display error
            console.log(e)
          }
        }
        
        queryAllDrugs()
    }, [])

    const showDrug = (drug) => (e) => {
      setSelectedDrug(drug)
      setNewHolder(drug.Record.holder)
      setNewLocation(drug.Record.location)

      openFormDialog()
    }

    function openFormDialog() {
      setFormDialog(true)
    }

    function closeFormDialog() {
      setFormDialog(false)
    }

    async function doUpdateHolder() {
      try {
        setUpdateLoading(true)

        const res = await API.updateHolder({id: selectedDrug.Id, holder: newHolder})
        console.log(res.data)

        navigate(0)
      }
      catch(e) {
        setUpdateLoading(false)
        console.log(e)
      }
    }

    async function doUpdateLocation() {
      try {
        setUpdateLoading(true)

        const res = await API.updateLocation({id: selectedDrug.Id, location: newLocation})
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
        <Grid container direction="column" rowSpacing={2}>
          <Grid item>
            <Typography variant="h2">
              My Drugs
            </Typography>
          </Grid>
          <Grid item>
            {loading?
              <CircularProgress/>:
              <TableContainer component={Paper}>
                  <Table>
                      <TableHead>
                          <TableRow>
                              <StyledTableCell align="center"> Drug ID </StyledTableCell>
                              <StyledTableCell align="center"> Drug Name </StyledTableCell>
                              <StyledTableCell align="center"> Timestamp </StyledTableCell>
                              <StyledTableCell align="center"> Holder </StyledTableCell>
                              <StyledTableCell align="center"> Location </StyledTableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {drugs.map(drug => (
                              <StyledTableRow key={drug.Id} onClick={showDrug(drug)}>
                                  <StyledTableCell align="center"> {drug.Id} </StyledTableCell>
                                  <StyledTableCell align="center"> {drug.Record.drug} </StyledTableCell>
                                  <StyledTableCell align="center"> {drug.Record.timestamp} </StyledTableCell>
                                  <StyledTableCell align="center"> {drug.Record.holder} </StyledTableCell>
                                  <StyledTableCell align="center"> {drug.Record.location} </StyledTableCell>
                              </StyledTableRow>
                          ))}
                      </TableBody>
                  </Table>
              </TableContainer>
            }
          </Grid>
        </Grid>
        <Dialog open={formDialog} fullWidth>
          <DialogTitle> 
            <Typography variant="h4" component='div'>
                {selectedDrug?.Record?.drug}
            </Typography> 
          </DialogTitle>
          <DialogContent>
            <Grid container direction="column" rowSpacing={2}>
              <Grid item sx={{mt: 1}}>
                <TextField defaultValue={newHolder} label="Holder" onChange={(e) => {setNewHolder(e.target.value)}} fullWidth></TextField>
              </Grid>
              <Grid item>
                <LoadingButton loading={updateLoading} variant="contained" onClick={doUpdateHolder}>UPDATE HOLDER</LoadingButton>
              </Grid>
              <Grid item sx={{mt: 4}}>
                <TextField defaultValue={newLocation} label="Location" onChange={(e) => {setNewLocation(e.target.value)}} fullWidth></TextField>
              </Grid>
              <Grid item>
                <LoadingButton loading={updateLoading} variant="contained" onClick={doUpdateLocation}>UPDATE LOCATION</LoadingButton>
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

