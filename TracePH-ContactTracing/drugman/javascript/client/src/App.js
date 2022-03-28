import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Tab from './components/Table';
import Result from './components/Result';
import AddUser from './components/AddUser';
import ChangeTimestamp from './components/ChangeTimestamp';
import ChangeUserId1 from './components/ChangeUserID1';
import ChangeUserId2 from './components/ChangeUserID2';
import Navi from './components/Navi';
import './App.css';


class App extends Component {

  state={
    users:[{"Id":"","Record":{"userid":"","location":"","phone":"","email":""}}]
  }



  componentDidMount(){
    axios.get('http://localhost:8080/api/users') 
    .then(res => this.setState({users: JSON.parse(res.data.response)}))
  }

 
  




  render(){
    return (
      <div className='container'>
        <Navi />
      <Router>
        <Route exact path='/' render={props=>(
        <React.Fragment>
          <div className='table'>
          <Tab  users={this.state.users}  />
          
            {console.log(this.state.users)}
          </div>
        </React.Fragment>
        )}/>

<Route exact path='/search' render={props=>(
        <React.Fragment>
          
         <Result/>
          <div>
            {console.log(this.state.users)}
          </div>
        </React.Fragment>
        )}/>

<Route exact path='/addUser' render={props=>(
        <React.Fragment>
          
         <AddUser />
          <div>
            {console.log(this.state.users)}
          </div>
        </React.Fragment>
        )}/>

<Route exact path='/changeTimestamp' render={props=>(
        <React.Fragment>
          
         <ChangeTimestamp />
          <div>
            {console.log(this.state.users)}
          </div>
        </React.Fragment>
        )}/>
<Route exact path='/changeUserId1' render={props=>(
        <React.Fragment>
          
         <ChangeUserId1 />
          <div>
            {console.log(this.state.users)}
          </div>
        </React.Fragment>
        )}/>
<Route exact path='/changeUserId2' render={props=>(
        <React.Fragment>
          
         <ChangeUserId2 />
          <div>
            {console.log(this.state.users)}
          </div>
        </React.Fragment>
        )}/>

      </Router>
      </div>
    );
  }
  
}

export default App;
