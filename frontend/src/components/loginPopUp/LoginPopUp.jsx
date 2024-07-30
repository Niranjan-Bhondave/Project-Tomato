import React , {useState} from 'react'
import './loginPopUp.css'
import {assets} from '../../assets/assets'
const LoginPopUp = ({setShowLogin}) => {
    const [currentState, setCurrentState] = useState("signup");
  return (
    <div className='loginPopUp'>
      <form className="loginPopUpContainer">
        <div className="loginPopUpTitle">
            <h2>{currentState}</h2>
            <img src= {assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
        </div>
        <div className="loginPopUpInput">
            {currentState === "login" ? <></> : <input type="text" placeholder='Your Name' required />}
            <input type="email" placeholder='Your Email' required />
            <input type="password" placeholder='Your Password' required />
            <button>{currentState === "signup" ? "Create Account" : "login"}</button>
        </div>
       
        <div className="loginPopUpCondition">
            <input type="checkbox" required/>
            <p>By continuing I agree to T&C</p>
        </div>
        {currentState === "login" ? <p>Create a new Account ? <span onClick={() => setCurrentState("signup")}>Click Here</span></p> : <p>Already have an account ? <span onClick={() => setCurrentState("login")}>Login here</span></p>}
        
      </form>
    </div>
  )
}

export default LoginPopUp
