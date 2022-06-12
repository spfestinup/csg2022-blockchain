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
  const navigate = useNavigate();

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

  const [useridError, setUseridError] = useState(true)
  const [queryidError, setQueryidError] = useState(true)
  const [adminidError, setAdminidError] = useState(true)
  const [timestampError, setTimestampError] = useState(true)

  const [useridHelperText, setUseridHelperText] = useState('')
  const [queryidHelperText, setQueryidHelperText] = useState('')
  const [adminidHelperText, setAdminidHelperText] = useState('')
  const [timestampHelperText, setTimestampHelperText] = useState('')

  const requiredValueValidator = {
    checker: (value) => {
      return value.length > 0
    },
    errorText: 'This value is required.'
  }

  var userIDValidatorObject = {
    valid: useridError,
    setter: setUseridError,
    helperTextSetter: setUseridHelperText,
    validators: [requiredValueValidator]
  }

  var queryIDValidatorObject = {
    valid: queryidError,
    setter: setQueryidError,
    helperTextSetter: setQueryidHelperText,
    validators: [requiredValueValidator]
  }

  var adminIDValidatorObject = {
    valid: adminidError,
    setter: setAdminidError,
    helperTextSetter: setAdminidHelperText,
    validators: [requiredValueValidator]
  }

  var timestampValidatorObject = {
    valid: timestampError,
    setter: setTimestampError,
    helperTextSetter: setTimestampHelperText,
    validators: [requiredValueValidator]
  }
  
  const inputValidators = [
    {
      fieldName: 'userid',
      validatorObject: userIDValidatorObject 
    },
    {
      fieldName: 'queryid',
      validatorObject: queryIDValidatorObject 
    },
    {
      fieldName: 'adminid',
      validatorObject: adminIDValidatorObject 
    },
    {
      fieldName: 'timestamp',
      validatorObject: timestampValidatorObject 
    },
  ]

  function validateValue(value, validatorObject) {
    for(let validator of validatorObject.validators) {
      // Reset valid value back to true
      validatorObject.setter(true)
      validatorObject.helperTextSetter('')

      if(!validator.checker(value)) {
        validatorObject.setter(false)
        validatorObject.helperTextSetter(validator.errorText)

        return false
      }
    }

    return true
  }

  function validateInput(values) {
    var allInputValid = true

    for(let validatorObject of inputValidators) {
      if(!validateValue(values[validatorObject.fieldName], validatorObject.validatorObject)) {
        allInputValid = false
      }
    }

    return allInputValid
  }

  const handleChange = (param) => (event) => {
    setValues({ ...values, [param]: event.target.value });
  }

  async function doAdd() {
    try {
      const query = values

      if(validateInput(query)) {
        setLoading(true)

        const res = await API.addQuery(query)

        navigate('/')
      }  
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
          <TextField label="Query ID" error={!queryIDValidatorObject.valid} helperText={queryidHelperText}  variant="outlined" fullWidth onChange={handleChange('queryid')} />
        </Grid>
        <Grid item>
          <TextField label="Admin ID" error={!adminIDValidatorObject.valid} helperText={adminidHelperText}  variant="outlined" fullWidth onChange={handleChange('adminid')} />
        </Grid>
        <Grid item>
          <TextField label="User ID" error={!userIDValidatorObject.valid} helperText={useridHelperText}  variant="outlined" fullWidth onChange={handleChange('userid')} />
        </Grid>
        <Grid item>
          <TextField defaultValue={timestamp} error={!timestampValidatorObject.valid} helperText={timestampHelperText}  label="Timestamp" variant="outlined" fullWidth onChange={handleChange('timestamp')} />
        </Grid>
        <Grid item>
          <LoadingButton loading={loading} variant="contained" color="success" onClick={doAdd}> SUBMIT </LoadingButton>
        </Grid>
      </Grid>
    </Container>
  )
}