import UserModel from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//login user
const loginUser = async (req, res) => {
      const {email,password} = req.body;
      try {
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
                success : false,
                message : "User doesn't exist"
            })
        }

        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword){
            return res.status(400).json({
                success : false,
                message : "Incorrect password"
            })
        }

        const token = createToken(user._id);
        res.status(200).json({
            success : true,
            message : "User logged in successfully",
            token
        })
      } catch (error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error logging in user"
        })
      }
}

//register user 
const registerUser = async (req, res) => {
    const {name,email,password} = req.body;
    try {
        //check if user already exists
        const exists = await UserModel.findOne({email});
        if(exists){
            return res.status(400).json({
                success : false,
                message : "User already exists"
            })
        }  
        //validate email format and strong password
        if(!validator.isEmail(email)){
            return res.status(400).json({
                success : false,
                message : "Please enter a valid email"
            })
        }

        if(password.length < 8){
            return res.status(400).json({
                success : false,
                message : "Password must be at least 8 characters long"
            })
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create user
        const newUser = new UserModel({
            name : name,
            email : email,
            password : hashedPassword
        });
        const user = await newUser.save();
        const token = createToken(user._id);

        res.status(200).json({
            success : true,
            message : "User registered successfully",
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error registering user"
        }) 
        
    }
}

export { loginUser, registerUser };

