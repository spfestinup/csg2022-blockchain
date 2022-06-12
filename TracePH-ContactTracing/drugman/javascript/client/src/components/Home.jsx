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
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [displayedUsers, setDisplayedUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState({})
    const [newEmail, setNewEmail] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newLocation, setNewLocation] = useState('')
    const [formDialog, setFormDialog] = useState(false);

    const [emailError, setEmailError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [locationError, setLocationError] = useState(false)
  
    const [emailHelperText, setEmailHelperText] = useState('')
    const [phoneHelperText, setPhoneHelperText] = useState('')
    const [locationHelperText, setLocationHelperText] = useState('')

    //componentDidMount
    useEffect(() => {
        // This is some React trick for useEffect to not show errors
        // https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
        async function queryAllUsers() {
          try {
            setLoading(true)
            const res = await API.getAllUsers()
            const parsedUsers = JSON.parse(res.data.response)
            setUsers(parsedUsers)
            setDisplayedUsers(parsedUsers)
            setLoading(false)
          }
          catch(e) {
            //TO DO: Display error
            console.log(e)
          }
        }
        
        queryAllUsers()
    }, [])

    function searchTermChange(e) {
      const searchTerm = e.target.value.toLowerCase()

      const toDisplay = []
      for(let user of users) {
        const email = user.Record.email.toLowerCase()
        const phone = user.Record.phone.toLowerCase()
        const location = user.Record.location.toLowerCase()

        if(email.includes(searchTerm) || phone.includes(searchTerm) || location.includes(searchTerm)) {
          toDisplay.push(user)
        }

        setDisplayedUsers(toDisplay)
      }
    }

    const showUser = (user) => (e) => {
      setSelectedUser(user)
      setNewEmail(user.Record.email)
      setNewPhone(user.Record.phone)
      setNewLocation(user.Record.location)
      
      openFormDialog()
    }

    function openFormDialog() {
      setFormDialog(true)
    }

    function closeFormDialog() {
      setFormDialog(false)
    }

    async function doUpdateEmail() {
      try {
        setEmailError(false)
        setEmailHelperText('')

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(newEmail).toLowerCase())) {
          setUpdateLoading(true)

          const res = await API.updateEmail({id: selectedUser.Id, email: newEmail})
          console.log(res.data)

          navigate(0)
        }
        else {
          setEmailError(true)
          setEmailHelperText('Please enter a valid email.')
        }
      }
      catch(e) {
        setUpdateLoading(false)
        console.log(e)
      }
    }

    async function doUpdatePhone() {
      try {
        setPhoneError(false)
        setPhoneHelperText('')

        if(newPhone.length > 0) {
          setUpdateLoading(true)

          const res = await API.updatePhone({id: selectedUser.Id, phone: newPhone})
          console.log(res.data)

          navigate(0)
        }
        else {
          setPhoneError(true)
          setPhoneHelperText('Cannot set empty value.')
        }
      }
      catch(e) {
        setUpdateLoading(false)
        console.log(e)
      }
    }

    async function doUpdateLocation() {
      try {
        setLocationError(false)
        setLocationHelperText('')

        if(newLocation.length > 0) {
          setUpdateLoading(true)

          const res = await API.updateLocation({id: selectedUser.Id, location: newLocation})
          console.log(res.data)

          navigate(0)
        }
        else {
          setLocationError(true)
          setLocationHelperText('Cannot set empty value.')
        }
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
              Users
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
                            <StyledTableCell align="center"> User ID </StyledTableCell>
                            <StyledTableCell align="center"> Email </StyledTableCell>
                            <StyledTableCell align="center"> Phone </StyledTableCell>
                            <StyledTableCell align="center"> Location </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedUsers.map(user => (
                            <StyledTableRow key={user.Id} onClick={showUser(user)}>
                                <StyledTableCell align="center"> {user.Id} </StyledTableCell>
                                <StyledTableCell align="center"> {user.Record.email} </StyledTableCell>
                                <StyledTableCell align="center"> {user.Record.phone} </StyledTableCell>
                                <StyledTableCell align="center"> {user.Record.location} </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>   
          </Grid>
          <Grid item>
                <Button variant="outlined" href="/addUser" endIcon={<Add/>}> ADD USER </Button>
            </Grid>
        </Grid>
        }
        <Dialog open={formDialog} fullWidth>
          <DialogTitle> 
            <Typography variant="h4" component='div'>
                Change User Info
            </Typography> 
          </DialogTitle>
          <DialogContent>
            <Grid container direction="column" rowSpacing={2}>
              <Grid item sx={{mt: 1}}>
                <TextField defaultValue={newEmail} label="Email" error={emailError} helperText={emailHelperText} onChange={(e) => {setNewEmail(e.target.value)}} fullWidth></TextField>
              </Grid>
              <Grid item>
                <LoadingButton loading={updateLoading} variant="contained" color="primary" onClick={doUpdateEmail}>CHANGE EMAIL</LoadingButton>
              </Grid>
              <Grid item sx={{mt: 4}}>
                <TextField defaultValue={newPhone} label="Phone" error={phoneError} helperText={phoneHelperText} onChange={(e) => {setNewPhone(e.target.value)}} fullWidth></TextField>
              </Grid>
              <Grid item>
                <LoadingButton loading={updateLoading} variant="contained" color="warning" onClick={doUpdatePhone}>CHANGE PHONE</LoadingButton>
              </Grid>
              <Grid item sx={{mt: 4}}>
                <TextField defaultValue={newLocation} label="Location" error={locationError} helperText={locationHelperText} onChange={(e) => {setNewLocation(e.target.value)}} fullWidth></TextField>
              </Grid>
              <Grid item>
                <LoadingButton loading={updateLoading} variant="contained" color="secondary" onClick={doUpdateLocation}>CHANGE LOCATION</LoadingButton>
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

