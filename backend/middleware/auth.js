import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({
            success : false,
            message : "Unauthorized Token not found"
        })
    }
    try{
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
        req.body = req.body || {}; //temporary fix for empty req.body
        req.body.userId = tokenDecode.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success : false,
            message : "Unauthorized"
        })
        
    }
}

export default authMiddleware; 