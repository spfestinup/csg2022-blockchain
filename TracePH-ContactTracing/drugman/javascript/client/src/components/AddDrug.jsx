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
    <div>
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
    </div>
  )
}

// export class AddDrug extends Component {
//     state={
//         id:'',
//         drugname:'',
//         timestamp:'',
//         holder:'',
//         location:''
//     }

//     onChange = (e) => this.setState({ [e.target.name]: e.target.value })

//     onSubmit = (e) => {
//         e.preventDefault();
//         this.addDrug(this.state);
//         this.setState({
//         id:'', 
//         drugname:'',
//         timestamp:'',
//         holder:'',
//         location:''});
//     }

//     addDrug = (state) =>{
//         //console.log(id);
//         axios.post(`http://localhost:8080/api/adddrug`,{
//             'drugid':state.id,
//             'drugname':state.drugname,
//             'timestamp':state.timestamp,
//             'holder':state.holder,
//             'location':state.location
//         })
//       }

//   render() {
//     return (
//         <React.Fragment>
//             <div className='search'>

//     <Form>
//   <Form.Group controlId="formBasicEmail">
//     <Form.Label>DrugID</Form.Label>
//     <Form.Control type='text' name='id' placeholder='Add Drug ID' value={this.state.id} onChange={this.onChange} />
//   </Form.Group>

//   <Form.Group controlId="formBasicEmail">
//     <Form.Label>Drug Name</Form.Label>
//     <Form.Control type='text' name='drugname' placeholder='Drug Name' value={this.state.drugname} onChange={this.onChange} />
//   </Form.Group>

//   <Form.Group controlId="formBasicEmail">
//     <Form.Label>Timestamp</Form.Label>
//     <Form.Control type='text' name='timestamp' placeholder='Timestamp' value={this.state.timestamp} onChange={this.onChange} />
//   </Form.Group>

//   <Form.Group controlId="formBasicEmail">
//     <Form.Label>Holder</Form.Label>
//     <Form.Control type='text' name='holder' placeholder='Holder' value={this.state.holder} onChange={this.onChange} />
//   </Form.Group>

//   <Form.Group controlId="formBasicEmail">
//     <Form.Label>Location</Form.Label>
//     <Form.Control type='text' name='location' placeholder='Location' value={this.state.location} onChange={this.onChange} />
//   </Form.Group>

//   <Button variant="primary" type="submit" onClick={this.onSubmit}>
//     Add Drug
//   </Button>
// </Form>

//             </div>
//         </React.Fragment>
        
//     );
//   }
// }


// export default AddDrug;