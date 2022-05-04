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
      console.log(user)

      const res = await API.addUser(user)
      console.log(res.data)

      navigate('/')
    }
    catch(e) {
      setLoading(false)
      console.log(e)
    }
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