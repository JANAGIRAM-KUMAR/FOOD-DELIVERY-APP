import React from 'react'
import './FloatingCartButton.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
const FloatingCartButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    if (location.pathname === "/") {
        return (
            <div className='floating-cart-button'>
                <img src={assets.basket_icon} onClick={() =>navigate('/cart')}></img>
            </div>
        )
    }
}

export default FloatingCartButton