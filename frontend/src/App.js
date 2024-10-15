import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import './App.css'

import RootLayout from "./layouts/RootLayout"

import About from './pages/About'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import LandingPage from './pages/LandingPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />}/>
      <Route path='landingpage' element={<LandingPage />}/>
      <Route path='about' element={<About />}/>
      <Route path='login' element={<Login />}/>
      <Route path='signup' element={<SignUp />}/>
    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App