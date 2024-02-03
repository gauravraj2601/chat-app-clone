const { User_Model } = require("../Model/user.model");
const generateToken = require("../config/generateToken");
const bcrypt= require("bcrypt")

const allUsers= async(req, res)=>{
    try {
        
        const keyword= req.query.search? {
            $or: [
                {name: {$regex: req.query.search, $options: "i"}},
                {email: {$regex: req.query.search, $options: "i"}},
            ]
        }:{};
        
        const users= await User_Model.find(keyword).find({_id: { $ne: req.user._id } })
        const modifiedUsers = users.map(user => {
            const { name, email, avatar, createdAt, updatedAt, _id } = user;
            return { name, email, avatar, createdAt, updatedAt, _id };
        });

        res.send(modifiedUsers);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}


const registerUser= async(req,res)=>{
    const {name,email, password, avatar}= req.body;
    if(!name || !email || !password ){
        res.status(400).json({error:"All fields are required"})
    }    
    const userExists= await User_Model.findOne({email});
    if(userExists){
        res.status(400).json({error:"User with email Already exist"})
    }    

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const user= await User_Model.create({
        name,
        email,
        password: hashedPass,
        avatar
    })    
    if(user){
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            avatar:user.avatar,
            token: generateToken(user._id)
        })    
    }    
    else{
        res.status(400).json({error:"Failed to create User"})
    }    
}    

const authUser=async(req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await User_Model.findOne({ email });
        // console.log(user)
        if (!user) {
          res.status(401).json({ error: "User not found" });  
        }  
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res
              .status(200)
              .json({ message: "Login successful", 
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar,
                        token: generateToken(user._id)
            });            
        }    
        else{
            res.status(401).json({ error: "Invalid credentials" });
        }    
        // const { _id: id, name } = user;
        // const token = jwt.sign({ id, name }, "masai");
      } catch (error) {
        res  
          .status(401)
          .json({ error: error.message, err: "this is the catch error" });
      }    
}      



module.exports={
    registerUser,
    authUser,
    allUsers
}