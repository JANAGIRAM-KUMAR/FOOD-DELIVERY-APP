import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
const Cart = () => {
    const {food_list, cartItems, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext);
    const navigate = useNavigate();
    const deliveryAmount = 39;
  return (
    <div className='cart'>
        <div className='cart-items'>
            <div className="cart-items-title">
                <p>Items</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <br />
            <hr />
            {food_list.map((item, index) => {
                if(cartItems[item._id] > 0){
                    return (
                        <>
                        <div className="cart-items-title cart-items-item">
                            <img src={url+"/images/"+item.image} alt="" className='item-image'/>
                            <p>{item.name}</p>
                            <p>₹ {item.price}</p>
                            <p>{cartItems[item._id]}</p>
                            <p>₹ {item.price * cartItems[item._id]}</p>
                            <img src={assets.remove} onClick={() => removeFromCart(item._id)} alt="" className="remove-icon" />
                        </div>
                        <hr />
                        </>
                    )
                }
            })}
        </div>
        <div className="cart-bottom">
            <div className="cart-total">
                <h2>Cart Totals</h2>
                <div>
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>₹ {getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p>₹ {getTotalCartAmount() === 0 ? 0 : deliveryAmount}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>₹ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryAmount}</b>
                    </div>
                </div>
                <button onClick={() => navigate('/order')}>Proceed to checkout</button>
            </div>
            <div className="cart-promocode">
                <div>
                    <p>If you have a promocode, please enter it here</p>
                    <div className='cart-promocode-input'>
                        <input type='text' placeholder='Promocode' />
                        <button>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart