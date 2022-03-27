import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Tab from './components/Table';
import Result from './components/Result';
import AddContact from './components/AddContact';
import ChangeTimestamp from './components/ChangeTimestamp';
import ChangeUserId1 from './components/ChangeUserID1';
import ChangeUserId2 from './components/ChangeUserID2';
import Navi from './components/Navi';
import './App.css';


class App extends Component {

  state={
    contacts:[{"Id":"","Record":{"timestamp":"","userId1":"","userId2":""}}]
  }



  componentDidMount(){
    axios.get('http://localhost:8080/api/contacts') 
    .then(res => this.setState({contacts: JSON.parse(res.data.response)}))
  }

 
  




  render(){
    return (
      <div className='container'>
        <Navi />
      <Router>
        <Route exact path='/' render={props=>(
        <React.Fragment>
          <div className='table'>
          <Tab  contacts={this.state.contacts}  />
          
            {console.log(this.state.contacts)}
          </div>
        </React.Fragment>
        )}/>

<Route exact path='/search' render={props=>(
        <React.Fragment>
          
         <Result/>
          <div>
            {console.log(this.state.contacts)}
          </div>
        </React.Fragment>
        )}/>

<Route exact path='/addContact' render={props=>(
        <React.Fragment>
          
         <AddContact />
          <div>
            {console.log(this.state.contacts)}
          </div>
        </React.Fragment>
        )}/>

<Route exact path='/changeTimestamp' render={props=>(
        <React.Fragment>
          
         <ChangeTimestamp />
          <div>
            {console.log(this.state.contacts)}
          </div>
        </React.Fragment>
        )}/>
<Route exact path='/changeUserId1' render={props=>(
        <React.Fragment>
          
         <ChangeUserId1 />
          <div>
            {console.log(this.state.contacts)}
          </div>
        </React.Fragment>
        )}/>
<Route exact path='/changeUserId2' render={props=>(
        <React.Fragment>
          
         <ChangeUserId2 />
          <div>
            {console.log(this.state.contacts)}
          </div>
        </React.Fragment>
        )}/>

      </Router>
      </div>
    );
  }
  
}

export default App;
