import React, {useState, useEffect} from 'react';
import API from '../api/api'
import Tab from '../components/Table';
import Result from '../components/Result';
import AddDrug from '../components/AddDrug';
import ChangeHolder from '../components/ChangeHolder';
import ChangeLocation from '../components/ChangeLocation';
import { CircularProgress } from '@mui/material'

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

export default function Router() {
  const [loading, setLoading] = useState(false)
  const [drugs, setDrugs] = useState([])

  useEffect(() => {
    // This is some React trick for useEffect to not show errors
    // https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
    async function queryAllDrugs() {
      try {
        setLoading(true)
        const res = await API.getAllDrugs()
        const parsedDrugs = JSON.parse(res.data.response)
        setDrugs(parsedDrugs)
        console.log("hey")
        setLoading(false)
      }
      catch(e) {
        //TO DO: Display error
        console.log(e)
      }
    }
    
    queryAllDrugs()
  }, [])

  return (
    <div>
      {loading?
        <CircularProgress/>:
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Tab drugs={drugs}/>} />
              <Route path="/search" element={<Result/>} />
              <Route path="/addDrug" element={<AddDrug/>} />
              <Route path="/changeHolder" element={<ChangeHolder/>} />
              <Route path="/changeLocation" element={<ChangeLocation/>} />
          </Routes>
        </BrowserRouter>
      }
    </div>  
  )
}

// class App extends Component {

//   state={
//     drugs:[{"Key":"","Record":{"drugname":"","timestamp":"","holder":"","location":""}}]
//   }

//   componentDidMount(){
//     axios.get('http://localhost:8080/api/queryalldrugs') 
//     .then(res => this.setState({drugs: JSON.parse(res.data.response)}))
//   }

// //   render(){
//     return (
//       <div className='container'>
//         <Navi />
//       <Router>
//         <Route exact path='/' render={props=>(
//         <React.Fragment>
//           <div className='table'>
//           <Tab  drugs={this.state.drugs}  />
          
//             {console.log(this.state.drugs)}
//           </div>
//         </React.Fragment>
//         )}/>

// <Route exact path='/search' render={props=>(
//         <React.Fragment>
          
//          <Result/>
//           <div>
//             {console.log(this.state.drugs)}
//           </div>
//         </React.Fragment>
//         )}/>

// <Route exact path='/addDrug' render={props=>(
//         <React.Fragment>
          
//          <AddDrug />
//           <div>
//             {console.log(this.state.drugs)}
//           </div>
//         </React.Fragment>
//         )}/>

// <Route exact path='/changeHolder' render={props=>(
//         <React.Fragment>
          
//          <ChangeHolder />
//           <div>
//             {console.log(this.state.drugs)}
//           </div>
//         </React.Fragment>
//         )}/>
// <Route exact path='/changeLocation' render={props=>(
//         <React.Fragment>
          
//          <ChangeLocation />
//           <div>
//             {console.log(this.state.drugs)}
//           </div>
//         </React.Fragment>
//         )}/>

//       </Router>
//       </div>
//     );
//   }
  
// }

// export default App;
