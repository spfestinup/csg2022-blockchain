import React, { Component } from 'react';
import axios from 'axios';
import { Form,Button } from 'react-bootstrap';

export class ChangeTimestmap extends Component {
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
        axios.put(`http://localhost:8080/api/query/${state.id}/timestamp`,{
            'timestamp':state.timestamp
        })
      }

  render() {
    return (
        <React.Fragment>
            <div className='search'>

<Form>
<Form.Group controlId="formBasicEmail">
<Form.Label>Query ID</Form.Label>
<Form.Control type='text' name='id' placeholder='Query ID' value={this.state.id} onChange={this.onChange} />
</Form.Group>

<Form.Group controlId="formBasicEmail">
<Form.Label>Timestamp</Form.Label>
<Form.Control type='text' name='timestamp' placeholder='Timestamp' value={this.state.timestamp} onChange={this.onChange} />
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


export default ChangeTimestmap;