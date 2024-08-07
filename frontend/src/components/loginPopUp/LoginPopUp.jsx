import React , {useContext, useEffect, useState} from 'react'
import './loginPopUp.css'
import {assets} from '../../assets/assets'
import { FoodContext } from '../../context/StoreContext'

import axios from 'axios'
const LoginPopUp = ({setShowLogin}) => {
    const [data, setData] = useState({
      name: "",
      email: "",
      password: ""
    })
    
    const {url, token, setToken} = useContext(FoodContext);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData(data=>({...data, [name]: value}))
  }

  const onLogin = async(event) => {
      event.preventDefault();
      let newUrl = url;
      newUrl+= (currentState === "login") ? "/api/user/login" : "/api/user/register";
      const response =  await axios.post(newUrl, data); 
      console.log(response);
      
      if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);
      }

      else alert(response.data.message);
  }

    const [currentState, setCurrentState] = useState("signup");
  return (
    <div className='loginPopUp'>
      <form className="loginPopUpContainer" onSubmit={onLogin}>
        <div className="loginPopUpTitle">
            <h2>{currentState}</h2>
            <img src= {assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
        </div>
        <div className="loginPopUpInput">
            {currentState === "login" ? <></> : <input type="text" placeholder='Your Name' required onChange={handleChange} value={data.name} name = 'name' />}
            <input type="email" placeholder='Your Email' required name = 'email' onChange={handleChange} value={data.email}/ >
            <input type="password" placeholder='Your Password' required onChange={handleChange} value={data.password} name = 'password' />
            <button type='submit'>{currentState === "signup" ? "Create Account" : "login"}</button>
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
