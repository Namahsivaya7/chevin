import mongoose from "mongoose";

const connectDB = async ()=>{
 try{
    const conn=await mongoose.connect(process.env.MONGO_URL);
    console.log(`connectd to mongofb ${conn.connection.host}`);
 }
 catch(error){
    console.log(`error message ${error}`)

 }
}
export default connectDB;

