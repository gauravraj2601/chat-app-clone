const express= require("express");
const { accessChat, fetchChats } = require("../controllers/chat.controllers");
const { auth } = require("../middleware/authMiddleware");

const chatRoute= express.Router();

chatRoute.post("/", auth ,accessChat)
chatRoute.get("/", auth ,fetchChats)










module.exports={chatRoute}