import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import morgan from "morgan";

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express()


//middlewares for json
//built in middleware to enable urlencoded data
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser());

//built-in middleware for json
app.use(express.json())



//we set the connection
mongoose.connect(process.env.MONGO_Url_Connect, {
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`server running on Port ${PORT} and connected to mongoCluster`))
}).catch((error) => console.log(`${error} try again later`))

mongoose.connection.on("disconnected", () => {
    console.log("mongo disconnected")
})

mongoose.connection.on("connected", () => {
    console.log("mongo connected")
})