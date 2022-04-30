import { useState } from 'react';
import API from '../api/api'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

export default function AddDrug() {
  const drugid = ''
  const drugname = ''
  const timestamp = dayjs().format("MMM DD, YYYY")
  const holder = ''
  const location = ''
  
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    drugid,
    drugname,
    timestamp,
    holder,
    location
  })

  const handleChange = (param) => (event) => {
    setValues({ ...values, [param]: event.target.value });
  }

  const navigate = useNavigate();
  
  async function doAdd() {
    try {
      setLoading(true)

      const drug = values
      console.log(drug)

      const res = await API.addDrug(drug)
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
            Add Drug
          </Typography>
        </Grid>
        <Grid item>
          <TextField label="ID" variant="outlined" fullWidth onChange={handleChange('drugid')} />
        </Grid>
        <Grid item>
          <TextField label="Drug Name" variant="outlined" fullWidth onChange={handleChange('drugname')} />
        </Grid>
        <Grid item>
          <TextField defaultValue={timestamp} label="Timestamp" variant="outlined" fullWidth onChange={handleChange('timestamp')} />
        </Grid>
        <Grid item>
          <TextField label="Holder" variant="outlined" fullWidth onChange={handleChange('holder')} />
        </Grid>
        <Grid item>
          <TextField label="Location" variant="outlined" fullWidth onChange={handleChange('location')} />
        </Grid>
        <Grid item>
          <LoadingButton loading={loading} variant="contained" onClick={doAdd}> ADD DRUG </LoadingButton>
        </Grid>
      </Grid>
    </Container>
  )
}