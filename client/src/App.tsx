import { Route, Routes } from "react-router"
import { BrowserRouter as Router } from "react-router"
import Home from "./pages/Home"
import './assets/css/index.css'
import LoginPage from "./pages/LoginPage"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
