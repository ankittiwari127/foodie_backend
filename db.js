const  mongoose = require("mongoose");
const { db } = require("./models/User");
const mongoUri="mongodb://ankittiwari:AnkitTiwari@ac-6wzceca-shard-00-00.tdvdbju.mongodb.net:27017,ac-6wzceca-shard-00-01.tdvdbju.mongodb.net:27017,ac-6wzceca-shard-00-02.tdvdbju.mongodb.net:27017/Foodiidata?ssl=true&replicaSet=atlas-drch7z-shard-0&authSource=admin&retryWrites=true&w=majority"
const mongoDB= async()=>{
 await mongoose.connect(mongoUri,{useNewUrlParser:true},(err,result)=>{
    if(err){
        console.log("---",err);
    }
    else{
    console.log("Connected"); 
    //how we get stored data from our database is here
    //iske ander jo stored data hai usko kewal admin change kr sakta hai not user
    const fetched_data=  mongoose.connection.db.collection("food_items");
    fetched_data.find({}).toArray( async function(err,data){
       const foodCategory= await mongoose.connection.db.collection("foodcategory");
        foodCategory.find({}).toArray(function(err,catData){
            if(err){console.log(err);
            }
            else{
                global.food_items=data;
                global.foodcategory=catData;
                
            }
        })
       
    })
    }
});
}
module.exports=mongoDB();