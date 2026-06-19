import { Route, Routes } from "react-router"
import { BrowserRouter as Router } from "react-router"
import Home from "./pages/Home"
import './assets/css/index.css'
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registrar" element={<RegisterPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
