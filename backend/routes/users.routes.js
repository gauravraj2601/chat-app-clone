const express= require("express")
const { registerUser, authUser, allUsers } = require("../controllers/userController");
const { auth } = require("../middleware/authMiddleware");

const userRoute= express.Router()


userRoute.post("/register",registerUser)
userRoute.post("/login", authUser);

userRoute.get("/users", auth , allUsers)









module.exports={userRoute}