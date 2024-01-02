const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const port = process.env.PORT || 3005;
const dotenv = require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("connected")).catch(()=>console.log("disconnected"));

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type :String,unique:true},
    password: String,
    image:String
})

const userModel = mongoose.model('Users', userSchema);
app.use(morgan("dev"))
app.use(cors());
app.use(express.json({limit:'10mb'}))
app.post('/signup',async (req, res)=>{
    try{
        const email = req.body.email
        var user = await userModel.findOne({email})
        if(user){
            res.send({message:"Email is already in use",alert:false})
        }else{
            const data = userModel(req.body)
            const save = await data.save()
            res.send({message:"Signed up successfully",alert:true})
        }
    }catch(e){
    }
})

app.post('/login',async (req, res)=>{
    try{
        const {email} = req.body
        const {password} = req.body
        var user = await userModel.findOne({email,password})
        if(user){
            const dataSend ={
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                image: user.image
            }
            // console.log(dataSend)
            res.send({message:"Login is successfully",alert:true,data:dataSend})
        }else{
            res.send({message:"Email or password wrong",alert:false})
        }
    }catch(e){
        res.status(500).send({message:"failed to login",e})
    }
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))