import React from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

import star_rating_3 from '../../assets/star_rating_3.png';
import star_rating_4 from '../../assets/star_rating_4.png';
import star_rating_5 from '../../assets/star_rating_5.png';

const ratings = {
    3: star_rating_3,
    4: star_rating_4,
    5: star_rating_5
}
const FoodItem = ({id, name, price, description, image, rating}) => {
    const {cartItems, addToCart, removeFromCart, url} = React.useContext(StoreContext);
  return (
    <div>
        <div className="food-item">
            <div className="food-item-image-container">
                <img className='food-item-image' src={url+"/images/"+image} alt="" />
                {!cartItems[id] ?
                <img className='add-icon' onClick={() => addToCart(id)} src={assets.add_icon_white} alt=""/> :
                <div className="food-item-counter">
                    <img onClick={() => removeFromCart(id) } src={assets.remove_icon_red}  alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt=""/>
                </div>  
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={ratings[rating]} alt=""/>
                </div>
                <p className='food-item-description'>{description}</p>
                <p className='food-item-price'>₹ {price}</p>
            </div>
        </div>
    </div>
  )
}

export default FoodItem 