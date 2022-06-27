import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
async  function connectToMongo  ()   {
    let connection ;
   try {
   connection = await  mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
     })
     console.log('connected succesfullty to the DB')
   }catch(err){
       console.log(err)
   }
    
return connection
  };


  export default connectToMongo