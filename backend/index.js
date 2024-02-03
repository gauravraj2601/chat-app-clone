const express= require("express")
const cors= require("cors");
const { connection } = require("./db");
const { userRoute } = require("./routes/users.routes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { chatRoute } = require("./routes/chat.routes");

const app= express();

app.use(express.json())
app.use(cors())

app.use("/api",userRoute)
app.use("/api/chat", chatRoute)
app.use(notFound)
app.use(errorHandler)


app.get("/",async(req, res)=>{
    res.send("Chat Server")
})


app.listen(8080,async()=>{
    try {
        await connection
        console.log("Server is running ")
    } catch (error) {
        console.error(error.message)
    }
})