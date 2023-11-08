const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = 3500

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});
const User = mongoose.model('User', userSchema);


const server=express();

const allowedOrigins = ['https://portfolio-1lr3.onrender.com'];

server.use(cors({
    origin: function (origin, callback) {
        // Check if the request origin is in the allowed origins list
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

server.use(bodyParser.json());

server.post('/',async (req,res)=>{
    let user=new User();
    user.name=req.body.name;
    user.email=req.body.email;
    user.message=req.body.message;
    const doc=await user.save();
    console.log(doc)
    res.json(doc);
});

server.listen(PORT,()=>{
    console.log("Server Started");
})