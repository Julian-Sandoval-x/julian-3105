import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'


function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />} 
        />

        <Route
          path="/register"
          element={<Register />} 
        />

        <Route
          path="/"
          element=
          {
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
