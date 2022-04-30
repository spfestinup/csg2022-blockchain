import Home from '../components/Home';
import Result from '../components/Result';
import AddDrug from '../components/AddDrug';
import ChangeHolder from '../components/ChangeHolder';
import ChangeLocation from '../components/ChangeLocation';

import {
  Routes,
  Route,
} from "react-router-dom";

export default function Router() {
  return (
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/search" element={<Result/>} />
          <Route path="/addDrug" element={<AddDrug/>} />
          <Route path="/changeHolder" element={<ChangeHolder/>} />
          <Route path="/changeLocation" element={<ChangeLocation/>} />
      </Routes>
  )
}

