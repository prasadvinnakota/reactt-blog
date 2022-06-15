const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieparser = require("cookie-parser")
const config = require("./config/key")
const User = require("./models/user")

const app = express()

//Data base connection
mongoose.connect(config.mongoURI,{})
.then(()=>console.log("DB connected"))
.catch((error)=>console.log(error))

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieparser())

//saving the user to database
app.post("/api/users/register",(req,res)=>
{
    
    const user = new User(req.body)
    
    
    user.save().then((user)=>res.status(200).json({user})).catch(error=>console.log(error))
})


app.listen(5000, ()=>{console.log("App is listening")})