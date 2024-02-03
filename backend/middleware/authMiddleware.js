const jwt = require("jsonwebtoken");
const { User_Model } = require("../Model/user.model");


const auth= async(req, res, next)=>{
    let token;
    if(req.headers.authorization ){
        try{
            token= req.headers.authorization.split(" ")[1];
            console.log(token)
            const decoded= jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded)
            req.user= await User_Model.findById(decoded.id).select("-password")
            next()
        }
        catch (error){
            res.status(401).json({error:`Not authorized token failed${error.message}`})
        }

    }
    if(!token){
        res.status(401).json({error:`Not authorized, no token`})

    }
}

module.exports={auth}