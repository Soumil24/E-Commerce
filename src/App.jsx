import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Order from './pages/order/Order'
import Dashboard from './pages/admin/dashboard/Dashboard'
import Cart from './pages/cart/Cart'
import Nopage from './pages/nopage/Nopage'
import Mystate from './context/data/Mystate'
import Login from './pages/registration/login'
import Signup from './pages/registration/signup'
import ProductInfo from './pages/productinfo/ProductInfo'
import Addproduct from './pages/admin/page/Addproduct'
import Updateproduct from './pages/admin/page/Updateproduct'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Allproduct from './pages/allproduct/Allproduct'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Mystate>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/order' element={
            <ProtectedRoute>
              <Order/>
            </ProtectedRoute>
          } />
          <Route path='/cart' element={<Cart />} />
          <Route path='/dashboard' element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/addproduct' element={
            <ProtectedRouteForAdmin>
              <Addproduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/Updateproduct' element={
            <ProtectedRouteForAdmin>
              <Updateproduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path='allproducts/productinfo/:id' element={<ProductInfo />} />
          <Route path='/productinfo/:id' element={<ProductInfo />} />
          <Route path='/allproducts' element={<Allproduct />} />
          <Route path='/*' element={<Nopage />} />
        </Routes>
        <ToastContainer/>
      </Router>
    </Mystate>

  )
}

export default App


export const ProtectedRoute = ({children}) =>{
  const user = localStorage.getItem("user")
  if (user) {
    return children
  } else {
    console.log("errorpr");
    
    return <Navigate to={'/login'}/>
  }
}




export const ProtectedRouteForAdmin = ({children}) =>{
  
  const user = JSON.parse(localStorage.getItem('user'))
  if (user.user.email == "soumil24@gmail.com") {
    return children
  } else {
    console.log("errorprfa");
    return <Navigate to={'/login'}/>
    
  }
}