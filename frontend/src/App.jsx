import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import FloatingCartButton from './components/FloatingCartButton/FloatingCartButton'

const App = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  return (
    <>
    {showLoginPopup ? <LoginPopup setShowLoginPopup={setShowLoginPopup}/> : <></>}
    <div className='app'>
      <Navbar setShowLoginPopup={setShowLoginPopup}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/myorders' element={<MyOrders />} />
      </Routes>
      <FloatingCartButton />
    </div>
    <Footer />
    </>
  )
}

export default App