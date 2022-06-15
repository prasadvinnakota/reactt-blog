const express = require("express")
const mongoose = require("mongoose")

const app = express()

//Data base connection
mongoose.connect("mongodb+srv://prasadvinnakota:Nanaji3011@cluster0.z3vy3.mongodb.net/?retryWrites=true&w=majority",{})
.then(()=>console.log("DB connected"))
.catch((error)=>console.log(error))

app.get("/", (req,res)=>
{
    res.send("Hi Prasad");
})

app.listen(5000, ()=>{console.log("App is listening")})