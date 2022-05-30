import { useState } from 'react';
import API from '../api/api'
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

export default function AddUser() {
  const userid = ''
  const email = ''
  const phone = ''
  const location = ''
  
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    userid,
    email,
    phone,
    location,
  })

  const handleChange = (param) => (event) => {
    setValues({ ...values, [param]: event.target.value });
  }

  const navigate = useNavigate();
  
  async function doAdd() {
    try {
      setLoading(true)

      const user = values
	  validate(user)

      const res = await API.addUser(user)
      console.log(res.data)

      navigate('/')
    }
    catch(e) {
      setLoading(false)
      console.log(e)
    }
  }
	
  const validate = (user) =>{
      console.log(user)
	  if(!validateLocation(user.location)){
		throw new Error('Invalid Location.');
	  }
	  if(!validateEmail(user.email)){
		throw new Error('Invalid Email.');
	  }
	  if(!validatePhone(user.phone)){
		throw new Error('Invalid Phone Number.');
	  }
  }
	
  const validateLocation = (location) =>{
	if((location >= 1000 && location <= 1090) || (location >= 2000 && location <= 2047) || (location >= 3000 && location <= 3012) || (location >= 4000 && location <= 4052)){
		return true
	}
	return false
  }
  
  const validateEmail = (email) =>{
	const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!email || regex.test(email) === false){
            return false;
        }
        return true;
  }

  const validatePhone = (phone) =>{
	const regex = /^\d{10}$/;
		  if(!phone || regex.test(phone) === false){
            return false;
        }
        return true;
  }

  return (
    <Container>
      <Grid container direction="column" rowSpacing={2}>
        <Grid item>
          <Typography variant="h2">
            Add User
          </Typography>
        </Grid>
        <Grid item>
          <TextField label="ID" variant="outlined" fullWidth onChange={handleChange('userid')} />
        </Grid>
        <Grid item>
          <TextField label="Email" variant="outlined" fullWidth onChange={handleChange('email')} />
        </Grid>
        <Grid item>
          <TextField label="Phone" variant="outlined" fullWidth onChange={handleChange('phone')} />
        </Grid>
        <Grid item>
          <TextField label="Location" variant="outlined" fullWidth onChange={handleChange('location')} />
        </Grid>
        <Grid item>
          <LoadingButton loading={loading} variant="contained" color="success" onClick={doAdd}> SUBMIT </LoadingButton>
        </Grid>
      </Grid>
    </Container>
  )
}