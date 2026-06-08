import { Route, Routes } from "react-router"
import { BrowserRouter as Router } from "react-router"
import Home from "./pages/Home"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/"><Home /></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
