import { useState } from 'react';
import dayjs from 'dayjs'
import API from '../api/api'
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

export default function AddQuery() {
  const queryid = ''
  const userid = ''
  const adminid = ''
  const timestamp = dayjs().format("MMM D, YYYY")
  
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    queryid,
    adminid,
    userid,
    timestamp
  })

  const handleChange = (param) => (event) => {
    setValues({ ...values, [param]: event.target.value });
  }

  const navigate = useNavigate();
  
  async function doAdd() {
    try {
      setLoading(true)

      const query = values
      console.log(query)

      const res = await API.addQuery(query)
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
            Add Query
          </Typography>
        </Grid>
        <Grid item>
          <TextField label="Query ID" variant="outlined" fullWidth onChange={handleChange('queryid')} />
        </Grid>
        <Grid item>
          <TextField label="Admin ID" variant="outlined" fullWidth onChange={handleChange('adminid')} />
        </Grid>
        <Grid item>
          <TextField label="User ID" variant="outlined" fullWidth onChange={handleChange('userid')} />
        </Grid>
        <Grid item>
          <TextField defaultValue={timestamp} label="Timestamp" variant="outlined" fullWidth onChange={handleChange('timestamp')} />
        </Grid>
        <Grid item>
          <LoadingButton loading={loading} variant="contained" color="success" onClick={doAdd}> SUBMIT </LoadingButton>
        </Grid>
      </Grid>
    </Container>
  )
}