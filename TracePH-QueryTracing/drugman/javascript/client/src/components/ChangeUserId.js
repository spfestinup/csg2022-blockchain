import React, { Component } from 'react';
import axios from 'axios';
import { Form,Button } from 'react-bootstrap';

export class ChangeUserID extends Component {
    state={
        id:'',
        userId:''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.changeLocation(this.state);
        this.setState({ id: '',userId:''});
    }

    changeLocation = (state) =>{
        //console.log(id);
        axios.put(`http://localhost:8080/api/query/${state.id}/userid`,{
            'userid':state.userId
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
<Form.Label>User ID</Form.Label>
<Form.Control type='text' name='userId' placeholder='User ID' value={this.state.userId} onChange={this.onChange} />
</Form.Group>



<Button variant="primary" type="submit" onClick={this.onSubmit}>
Change User ID
</Button>
</Form>

        </div>
        </React.Fragment>
        
    );
  }
}


export default ChangeUserID;