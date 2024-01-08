const path=require("path");
const express = require("express");
const app= express();
require("dotenv").config();
const router=require("./routes/routes");
const PORT = process.env.PORT||3500;

const cookieParser=require("cookie-parser");
app.use(cookieParser());

const mongoose = require("mongoose")
const connectDB=require("./config/dbConnect")

connectDB();

let db=mongoose.connection;

db.once('open',()=>{
   console.log("connected to DB !")
})


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use((req,res,next)=>{
    console.log(req.url);
    next();
})
app.use(router);

app.listen(PORT,(req,res)=>{
    console.log("server is running !");
})