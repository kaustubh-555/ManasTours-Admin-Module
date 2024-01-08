const path=require("path")
const express=require("express")
const router=express.Router()
const [Userlogin,userRegisteration,getUser,logout]=require("../controllers/authController")
const [getHomePageTours,addTour,getTourData,getAllTours,updateRating,editTourData,deleteTour]=require("../controllers/getTours")

router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","index.html"))
})
router.get("*/tourPage.html*",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","tourPage.html"))
   }   )
router.get("*/editPage.html*",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","editPage.html"))
   }   )
router.get("*.html",(req,res)=>{
    fileName=req.url.substr(req.url.lastIndexOf('/'));  
    res.sendFile(path.join(__dirname,"..","public",fileName));
})
router.get("*.css",(req,res)=>{
    fileName=req.url.substr(req.url.lastIndexOf('/'));  
    res.sendFile(path.join(__dirname,"..","public","styles",fileName));
})
router.get("*.js",(req,res)=>{
    fileName=req.url.substr(req.url.lastIndexOf('/'));  
    res.sendFile(path.join(__dirname,"..","public","scripts",fileName));
})

router.get("*.jpg",(req,res)=>{
    fileName=req.url.substr(req.url.lastIndexOf('/'));  
    res.sendFile(path.join(__dirname,"..","public","images",fileName));
})
router.get("*.jpeg",(req,res)=>{
    fileName=req.url.substr(req.url.lastIndexOf('/'));  
    res.sendFile(path.join(__dirname,"..","public","images",fileName));
})
router.get("*.png",(req,res)=>{
    fileName=req.url.substr(req.url.lastIndexOf('/'));  
    res.sendFile(path.join(__dirname,"..","public","images",fileName));
})
router.get("*.svg",(req,res)=>{
    fileName=req.url.substr(req.url.lastIndexOf('/'));  
    res.sendFile(path.join(__dirname,"..","public","images",fileName));
})

router.get("/getUser",getUser)
router.get("/getAllTours",getAllTours)
router.post("/updateRating",updateRating)
router.get("/getHomePageTours",getHomePageTours)

router.post("/login",Userlogin)
router.post("/addTour",addTour)
router.post("/getTourData",getTourData)
router.post("/editTourData",editTourData)
router.post("/deleteTour",deleteTour)
router.get("/logout",logout);
router.post("/register",userRegisteration)


module.exports=router