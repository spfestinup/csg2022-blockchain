import React, { Component } from 'react';
import axios from 'axios';
import { Form,Button } from 'react-bootstrap';

export class ChangeUserId2 extends Component {
    state={
        id:'',
        userId2:''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.changeHolder(this.state);
        this.setState({ id: '',userId2:''});
    }

    changeHolder = (state) =>{
        //console.log(id);
        axios.put(`http://localhost:8080/api/contact/${state.id}/userid2}`,{
            'userid2':state.userId2
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
<Form.Label>User ID 2</Form.Label>
<Form.Control type='text' name='timestamp' placeholder='New User ID 2' value={this.state.userId2} onChange={this.onChange} />
</Form.Group>



<Button variant="primary" type="submit" onClick={this.onSubmit}>
Change User ID 2
</Button>
</Form>

        </div>
        </React.Fragment>
        
    );
  }
}


export default ChangeUserId2;