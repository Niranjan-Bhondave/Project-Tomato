import React from 'react'
import './footer.css'
import assets from '../../assets/assets'
const Footer = () => {
  return (
    <div>
      <div className='footer' id="footer">
        <div className="footerContent">
            <div className="footerContentLeft">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est laborum dolorem debitis consectetur magni commodi accusamus atque eaque dignissimos, iste, ipsum quis praesentium dolore similique assumenda. Animi aliquam dignissimos nemo doloribus beatae rerum est eos! Ex dolores eaque labore consectetur, eveniet ad laudantium nemo natus? Itaque illo magnam cum dolor!</p>
                <div className="footerSocialIcons">
                    <img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} alt="" /><img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footerContentCenter">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footerContentRight">
                <h2>Get in touch</h2>
                <ul>
                    <li>+1-234-567-890</li>
                    <li>contact@email.com</li>
                </ul>
            </div>
        </div>
      </div>
      <hr />
      <p className="footerCopyright">Copyright 2024 @ Tomato.com</p>
    </div>
  )
}

export default Footer
