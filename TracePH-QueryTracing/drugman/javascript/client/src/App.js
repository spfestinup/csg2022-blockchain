import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Tab from './components/Table';
import Result from './components/Result';
import AddQuery from './components/AddQuery';
import ChangeTimestamp from './components/ChangeTimestamp';
import ChangeUserId from './components/ChangeUserId';
import Navi from './components/Navi';
import './App.css';


class App extends Component {

  state={
    queries:[{"Key":"","Record":{"timestamp":"","userId":""}}]
  }



  componentDidMount(){
    axios.get('http://localhost:8080/api/queries') 
    .then(res => this.setState({queries: JSON.parse(res.data.response)}))
  }

 
  




  render(){
    return (
      <div className='container'>
        <Navi />
      <Router>
        <Route exact path='/' render={props=>(
        <React.Fragment>
          <div className='table'>
          <Tab  queries={this.state.queries}  />
          
            {console.log(this.state.queries)}
          </div>
        </React.Fragment>
        )}/>

<Route exact path='/search' render={props=>(
        <React.Fragment>
          
         <Result/>
          <div>
            {console.log(this.state.queries)}
          </div>
        </React.Fragment>
        )}/>

<Route exact path='/addQuery' render={props=>(
        <React.Fragment>
          
         <AddQuery />
          <div>
            {console.log(this.state.queries)}
          </div>
        </React.Fragment>
        )}/>

<Route exact path='/changeTimestamp' render={props=>(
        <React.Fragment>
          
         <ChangeTimestamp />
          <div>
            {console.log(this.state.queries)}
          </div>
        </React.Fragment>
        )}/>
<Route exact path='/changeUserId' render={props=>(
        <React.Fragment>
          
         <ChangeUserId />
          <div>
            {console.log(this.state.queries)}
          </div>
        </React.Fragment>
        )}/>

      </Router>
      </div>
    );
  }
  
}

export default App;
