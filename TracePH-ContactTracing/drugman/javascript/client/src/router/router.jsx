import Home from '../components/Home';
import Result from '../components/Result';
import AddDrug from '../components/AddDrug';

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
      </Routes>
  )
}

