const path =require("path");
const bcrypt=require("bcrypt")
const User=require("../models/userSchema")

const Userlogin=async(req,res)=>{
    let userobj=req.body;
    console.log(req.body);
    const result=await User.findOne({username:userobj.username,password: userobj.password});
    console.log(result);
    if(result==null){
        res.json({status: false,msg: "Invalid username or password !"})
    }
    else{
        res.cookie("user",userobj,{maxAge: 1000*60*60*24,httpOnly: true});
        res.json({status: true,msg: "Authenication successful !"})
    }
}

const userRegisteration=async(req,res)=>{
    let userobj=req.body;
    console.log(req.body);
    const duplicate=await User.findOne({username: userobj.username});
    let status=false;
    if(duplicate!=null){
        res.json({status:status,msg:"Username already exists please use another username !"})
    }
    else{
        // userobj.password=pass;
        const result=await User.create(userobj);
        if(result){
            status=true;
        }
        res.json({status:status,msg:"User created successfully !"})
    }
}


const getUser=async(req,res)=>{
    let userobj=req.cookies.user;
    if(userobj){
        res.json({status:true,user:userobj})
    }
    else{
        res.json({status:false,msg:"User not logged in !"})
    }
}

const logout=async(req,res)=>{
    res.clearCookie("user");
    res.json({status:true,msg:"User logged out successfully !"})
}


const fxns=[Userlogin,userRegisteration,getUser,logout];
module.exports=fxns;