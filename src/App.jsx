import UsersPage from "./Components/UserPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Components/Navbar";

export default function App() {
  return (
    <BrowserRouter>

        <Navbar/>        
        <Routes>
          <Route path="/" element={<UsersPage />}/>
        </Routes>
      
    </BrowserRouter>

  )

}
