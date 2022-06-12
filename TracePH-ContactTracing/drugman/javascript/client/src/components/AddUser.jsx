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
  const navigate = useNavigate();

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

  const [useridError, setUseridError] = useState(true)
  const [emailError, setEmailError] = useState(true)
  const [phoneError, setPhoneError] = useState(true)
  const [locationError, setLocationError] = useState(true)

  const [useridHelperText, setUseridHelperText] = useState('')
  const [emailHelperText, setEmailHelperText] = useState('')
  const [phoneHelperText, setPhoneHelperText] = useState('')
  const [locationHelperText, setLocationHelperText] = useState('')

  const requiredValueValidator = {
    checker: (value) => {
      return value.length > 0
    },
    errorText: 'This value is required.'
  }

  const emailPatternMatchValidator = {
    checker: (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    errorText: 'Please input a valid email.'
  }

  var IDValidatorObject = {
    valid: useridError,
    setter: setUseridError,
    helperTextSetter: setUseridHelperText,
    validators: [requiredValueValidator]
  }

  var emailValidatorObject = {
    valid: emailError,
    setter: setEmailError,
    helperTextSetter: setEmailHelperText,
    validators: [requiredValueValidator, emailPatternMatchValidator]
  }

  var phoneValidatorObject = {
    valid: phoneError,
    setter: setPhoneError,
    helperTextSetter: setPhoneHelperText,
    validators: [requiredValueValidator]
  }

  var locationValidatorObject = {
    valid: locationError,
    setter: setLocationError,
    helperTextSetter: setLocationHelperText,
    validators: [requiredValueValidator]
  }
  
  const inputValidators = [
    {
      fieldName: 'userid',
      validatorObject: IDValidatorObject 
    },
    {
      fieldName: 'email',
      validatorObject: emailValidatorObject 
    },
    {
      fieldName: 'phone',
      validatorObject: phoneValidatorObject 
    },
    {
      fieldName: 'location',
      validatorObject: locationValidatorObject 
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
      const user = values

      if(validateInput(user)) {
        setLoading(true)

        const res = await API.addUser(user)

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
            Add User
          </Typography>
        </Grid>
        <Grid item>
          <TextField label="ID" error={!IDValidatorObject.valid} helperText={useridHelperText} variant="outlined" fullWidth onChange={handleChange('userid')} />
        </Grid>
        <Grid item>
          <TextField label="Email" error={!emailValidatorObject.valid} helperText={emailHelperText} variant="outlined" fullWidth onChange={handleChange('email')} />
        </Grid>
        <Grid item>
          <TextField label="Phone" error={!phoneValidatorObject.valid} helperText={phoneHelperText}  variant="outlined" fullWidth onChange={handleChange('phone')} />
        </Grid>
        <Grid item>
          <TextField label="Location" error={!locationValidatorObject.valid} helperText={locationHelperText}  variant="outlined" fullWidth onChange={handleChange('location')} />
        </Grid>
        <Grid item>
          <LoadingButton loading={loading} variant="contained" color="success" onClick={doAdd}> SUBMIT </LoadingButton>
        </Grid>
      </Grid>
    </Container>
  )
}