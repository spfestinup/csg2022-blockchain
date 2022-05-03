import Home from '../components/Home';
import AddUser from '../components/AddUser';

import {
  Routes,
  Route,
} from "react-router-dom";

export default function Router() {
  return (
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addUser" element={<AddUser/>} />
      </Routes>
  )
}

