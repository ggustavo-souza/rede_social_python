import { Route, Routes } from "react-router"
import { BrowserRouter as Router } from "react-router"
import Home from "./pages/Home"
import './assets/css/index.css'
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { AuthProvider } from "./auth/AuthContext"
import { ProtectedRoute } from "./auth/ProtectedRoute"
import CreatePost from "./pages/CreatePost"

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/create-post" element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registrar" element={<RegisterPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
