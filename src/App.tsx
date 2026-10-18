import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

import Login from './components/Login'
import Main from './components/Main'
import Register from './components/Register'


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
              <Main />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
