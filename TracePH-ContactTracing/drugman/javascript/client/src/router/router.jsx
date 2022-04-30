import Home from '../components/Home';
import AddDrug from '../components/AddDrug';

import {
  Routes,
  Route,
} from "react-router-dom";

export default function Router() {
  return (
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addDrug" element={<AddDrug/>} />
      </Routes>
  )
}

