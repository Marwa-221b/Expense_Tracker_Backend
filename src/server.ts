import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import autRoutes from "./routes/authroutes"
// import cookieParser from "cookieParser"

dotenv.config()

mongoose.connect(process.env.MONGO_URI as string)
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(`Db error ${err}`))


const PORT=3000
const server= express() 

server.use(express.json())
// server.use(cookieParser)

server.use("/api/auth", autRoutes);

server.listen(PORT,()=>{
    console.log(`Server is running in port ${PORT}`)

})