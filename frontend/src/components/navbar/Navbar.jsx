import React, {useContext, useState} from 'react'
import assets from '../../assets/assets'
import './navbar.css'
import { Link } from 'react-router-dom'
import { FoodContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {
  const {getTotalCartAmount} = useContext(FoodContext);
  const [menu, setMenu] = useState("home")
  return (
    <div className='navbar'>
      <Link to = '/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className='navbarMenu'>
        <Link to='/' onClick = {() => setMenu('home')}className={menu === 'home' ? 'active' : ""}>Home</Link>
        <a href='#exploreMenu' onClick = {() => setMenu('menu')} className={menu === 'menu' ? 'active' : ""}>Menu</a>
        <a href='#appDownload' onClick = {() => setMenu('mobile')} className={menu === 'mobile' ? 'active' : ""}>Mobile App</a>
        <a href='#footer' onClick = {() => setMenu('conatct')} className={menu === 'conatct' ? 'active' : ""}>Contact Us</a>
      </ul>
      <div className="navbarRight">
        <img src= {assets.search_icon} alt="" srcSet="" />
        <div className="searchIcon">
        <Link to='/cart'><img src= {assets.basket_icon} alt="" srcSet="" /></Link>
        <div className={getTotalCartAmount() ? 'dot' : ''}></div>
        </div>
        <button onClick = {() => setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  )
}

export default Navbar
