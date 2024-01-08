const mongoose=require("mongoose");
const path=require("path");
const tourSchema=require("../models/tourSchema");
const getHomePageTours=async(req,res)=>{
    const popularTours = await tourSchema.aggregate([
        {
          $sort: { visits: -1 } 
        },
        {
          $limit: 4
        }
      ]);
    const discountTours=await tourSchema.find({discount:{$gt:0}}).limit(4);
    const homepageTours={
        popularTours: popularTours,
        discountTours: discountTours
    }
    res.json(homepageTours);    
}
const addTour=async(req,res)=>{
    const tour=req.body;
    const result=await tourSchema.create(tour);
    if(result==null){
        res.json({status: false,msg: "Tour not added !"})
    }
    else{
        res.json({status: true,msg: "Tour added successfully !"})
    }
}
const getTourData=async(req,res)=>{
    let tid=req.body.id;
    console.log(req.body)
    let tour=await tourSchema.findOne({_id:tid});
    res.json({tour: tour});
    tour.visits+=1;
    tour.save();
}
const getAllTours=async(req,res)=>{
    const tours=await tourSchema.find();
    res.json({tours: tours});
}
const updateRating=async(req,res)=>{
    let {id,rating}=req.body;
    const tour=await tourSchema.findOne({_id:id});
    rating=parseInt(rating);
    rating = (tour.AverageRating+rating)/2;
    tour.AverageRating=rating;
    tour.save();
}

const editTourData=async(req,res)=>{
    console.log("route ok!")
    let tour=req.body;
    console.log(tour)
    let old=await tourSchema.findOne({_id: tour.id});
    console.log(old);

    try{
        old.visits=tour.visits;
        old.name=tour.name;
        old.description=tour.description;
        old.price=tour.price;
        old.duration=tour.duration;
        old.stay=tour.stay;
        old.discount=tour.discount;
        old.food=tour.food;
        old.places=tour.places;
        old.AverageRating=tour.AverageRating;
        old.save();

    }
    catch(err){
        // console.log(err.message);
        console.log("error");
    }
    res.json({status: true,msg: "Tour edited successfully !"})
}
const deleteTour=async(req,res)=>{
    let id=req.body.id;
    console.log(id)
    const result=await tourSchema.findByIdAndRemove(id);
    if(result==null){
        res.json({status: false,msg: "Tour not deleted !"})
    }
    else{
        res.json({status: true,msg: "Tour deleted successfully !"})
    }
    
        // res.json({status: true,msg: "Tour deleted successfully !"})
}
const fxns=[getHomePageTours,addTour,getTourData,getAllTours,updateRating,editTourData,deleteTour];
module.exports=fxns;