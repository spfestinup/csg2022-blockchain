import React, {useState, useEffect} from 'react';
import API from '../api/api'
import Home from '../components/Home';
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

        <Routes>
            <Route path="/" element={<Home drugs={drugs}/>} />
            <Route path="/search" element={<Result/>} />
            <Route path="/addDrug" element={<AddDrug/>} />
            <Route path="/changeHolder" element={<ChangeHolder/>} />
            <Route path="/changeLocation" element={<ChangeLocation/>} />
        </Routes>
      }
    </div>  
  )
}

