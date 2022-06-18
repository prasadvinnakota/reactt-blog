const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieparser = require("cookie-parser")
const config = require("./config/key.js")
const {User} = require("./models/user")
const {auth} = require("./midddlewares/auth")
const app = express()

//Data base connection
mongoose.connect(config.mongoURI,{})
.then(()=>console.log("DB connected"))
.catch((error)=>console.log(error))

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieparser())

app.get("/", (req,res)=>
{
    res.json({message:"success"})
})

app.get("/auth", auth, (req,res)=>
{
    res.status(200).json({
        _id:req.user._id,
        isAdmin:req.user.role===0?false:true,
        email:req.user.email,
        isAuth:true,
        name:req.user.name,
        lastName:req.user.lastName,
        role:req.user.role,
        image:req.user.image

    })


})


//saving the user to database
app.post("/api/users/register",(req,res)=>
{
    console.log("hi")
    const user = new User(req.body)
    console.log(user)
    
    
    user.save().then((user)=>res.status(200).json({user})).catch(error=>console.log(error))
})

app.post("/api/users/login",(req,res)=>
{
    //email verfication
    User.findOne({email:req.body.email},(err,user)=>
    {
        if(!user)
        {
            res.status(400).json({message:"Not found"})
        }
        user.comparePassword(req.body.password,(err,isMatch)=>
    {
        if(!isMatch)
        {
            res.status(400).json({message:"check the credentials once again"})
        }
       
       
        user.generateToken((err, user)=>
    {
        if(err) return res.status(400).jsn({message:"not found"})
        res.cookie("x_auth",user.token).status(200).json({message:"loginsuccess"})
    })
    })

    })

    

    


})


app.get("/api/users/logout", auth, (req,res)=>{

    User.findOneAndUpdate({_id:req.user._id},{token:""},(err,user)=>
    {
        if(err)
        {
            return res.status(400).json({success:"false"})
        }
        res.status(200).json({message:true})

    })



})
const Port= process.env.PORT || 5000
app.listen(Port, ()=>{console.log("App is listening")})
