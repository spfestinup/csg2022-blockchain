import React, { Component } from 'react';
import axios from 'axios';
import { Form,Button } from 'react-bootstrap';

export class ChangeUserID1 extends Component {
    state={
        id:'',
        userId1:''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault();
        this.changeHolder(this.state);
        this.setState({ id: '',userId1:''});
    }

    changeHolder = (state) =>{
        //console.log(id);
        axios.put(`http://localhost:8080/api/contact/${state.id}/userid1}`,{
            'userid1':state.userId1
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
<Form.Label>User ID 1</Form.Label>
<Form.Control type='text' name='userid1' placeholder='New User ID 1' value={this.state.userId1} onChange={this.onChange} />
</Form.Group>



<Button variant="primary" type="submit" onClick={this.onSubmit}>
Change User ID 1
</Button>
</Form>

        </div>
        </React.Fragment>
        
    );
  }
}


export default ChangeUserID1;