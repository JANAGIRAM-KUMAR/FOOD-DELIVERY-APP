import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div>
        <div className="footer" id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" className='logo'/>
                    <p>Choose from a diverse menu featuring a delectable selection of dishes that will satisfy your cravings. Order now and indulge in a culinary experience that will leave you craving for more.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt=""/>
                        <img src={assets.twitter_icon} alt=""/>
                        <img src={assets.linkedin_icon} alt=""/>
                    </div>
                </div>
                <div className="footer-content-middle">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1 797-693-1450</li>
                        <li>contact@jk.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                © 2025 Food Delivery. All rights reserved.
            </p>
        </div>
    </div>
  )
}

export default Footer