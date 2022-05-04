import Home from '../components/Home';
import AddQuery from '../components/AddQuery';

import {
  Routes,
  Route,
} from "react-router-dom";

export default function Router() {
  return (
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addQuery" element={<AddQuery/>} />
      </Routes>
  )
}

