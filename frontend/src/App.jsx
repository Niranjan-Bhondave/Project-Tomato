// App.jsx
import React, {useState} from 'react';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import Cart from './pages/cart/Cart';
import { FoodProvider } from './context/StoreContext';
import Footer from './components/footer/Footer';
import LoginPopUp from './components/loginPopUp/LoginPopUp';
import Verify from './pages/verify/Verify';
import MyOrders from './pages/myOrders/MyOrders';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    
    <FoodProvider>
    {showLogin ? <LoginPopUp setShowLogin = {setShowLogin}/> : <></>}
      <div className='app'>
        <Navbar setShowLogin = {setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeOrder' element={<PlaceOrder />} />
          <Route path='/verify' element = {<Verify />}/>
          <Route path='/myorders' element = {<MyOrders />}/>
        </Routes>
      </div>
    </FoodProvider>
    <Footer />
    </>
  );
};

export default App;
