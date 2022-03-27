import React, { Component } from 'react';
import axios from 'axios';
import { Form,Button } from 'react-bootstrap';

export class ChangeTimestamp extends Component {
    state={
        id:'',
        timestamp:''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.changeHolder(this.state);
        this.setState({ id: '',timestamp:''});
    }

    changeHolder = (state) =>{
        //console.log(id);
        axios.put(`http://localhost:8080/api/contact/${state.id}/timestamp}`,{
            'timestamp':state.timestamp
        })
      }

  render() {
    return (
        <React.Fragment>
            <div className='search'>

<Form>
<Form.Group controlId="formBasicEmail">
<Form.Label>Contact ID</Form.Label>
<Form.Control type='text' name='id' placeholder='Contact ID' value={this.state.id} onChange={this.onChange} />
</Form.Group>

<Form.Group controlId="formBasicEmail">
<Form.Label>Timestamp</Form.Label>
<Form.Control type='text' name='timestamp' placeholder='New Timestamp' value={this.state.timestamp} onChange={this.onChange} />
</Form.Group>



<Button variant="primary" type="submit" onClick={this.onSubmit}>
Change Timestamp
</Button>
</Form>

        </div>
        </React.Fragment>
        
    );
  }
}


export default ChangeTimestamp;