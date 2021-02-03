const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = async ()=>{ 
    try {
      await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false}, async()=>{
        console.log('Connected to MongoDB..');
    })} 
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}
connectDB();