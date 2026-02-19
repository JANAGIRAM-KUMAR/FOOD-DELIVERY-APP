import React, { useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({setShowLoginPopup}) => {
    const {url, setToken} = useContext(StoreContext);

    const [currentState , setCurrentState] = React.useState("login");
    const [data, setData] = React.useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if(currentState === "sign up"){
            newUrl = `${url}/api/user/register`;
        }else{
            newUrl = `${url}/api/user/login`;
        }
        
        const response = await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token); // to save the token
            localStorage.setItem("token",response.data.token); 
            setShowLoginPopup(false); 
        }
        else {
            alert(response.data.message);
        }
    }

  return (
    <div className='login-popup'>
        <form className='login-popup-container' onSubmit={onSubmitHandler}>
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img src={assets.cross_icon} alt="" onClick={() => setShowLoginPopup(false)}/>
            </div>
            <div className="login-popup-input">
                {currentState === "login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name}type='text' placeholder='Your name' required/>}
                <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required/>
                <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Your password' required/>
            </div>
            <button type='submit'>{currentState === "sign up" ? "create account" : "login"}</button>
            <div className="login-popup-condition">
                <input type='checkbox' required/>
                <p> By continuing, you agree to our <span>Terms and Conditions</span></p>
            </div>
            {
            currentState === "login" ? 
            <p>Create a new account? <span onClick={() => setCurrentState("sign up")}>Click here</span></p> :
            <p>Already have an account? <span onClick={() => setCurrentState("login")}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopup