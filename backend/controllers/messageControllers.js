const { Chat_Model } = require("../Model/chat.model");
const { Message } = require("../Model/message.model");
const { User_Model } = require("../Model/user.model");

const sendMessage =async(req, res)=>{
    const {content, chatId} = req.body;

    if(!content || !chatId){
        console.log("Invalid content data || chatId")
        return res.status(400);
    }
    let newMessage={
        sender: req.user._id,
        content: content,
        chat: chatId
    }

    try {
        let message= await Message.create(newMessage);

        message= await message.populate("sender","name avatar");
        message= await message.populate("chat");
        message= await User_Model.populate(message,{
            path: "chat.users",
            select:"name avatar email"
        })

        await Chat_Model.findByIdAndUpdate(req.body.chatId,{
            latestMessage: message
        });

        res.json(message)
    } catch (error) {
        res.status(400).send({"error":error.message})
    }
}

const allMessages=async(req, res)=>{
    try {
        const messages= await Message.find({chat: req.params.chatId})
        .populate("sender","name avatar email").populate("chat")
        res.json(messages)
    } catch (error) {
        res.status(400).send({"error":error.message})

    }


}



module.exports={
    sendMessage,
    allMessages
}