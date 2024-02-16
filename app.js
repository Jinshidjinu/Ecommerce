
const express=require('express')
const app=express()
const multer=require('multer')
const mongoose=require('mongoose')
const session=require('express-session')
require('dotenv').config()
const twilio=require('twilio')
const path=require("path")
const port=process.env.port || 8086
const userRoute=require('./router/user')
const adminRoute=require('./router/admin')

app.use(session({
    secret:"key",
    resave:false,
    saveUninitialized:true
}))

app.use(express.urlencoded({ extended:true }))
app.use(express.static("public"))
app.use(express.json())

app.use('/',userRoute)
app.use('/admin',adminRoute)

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

// Connect to mongodb
mongoose.connect("mongodb://localhost:27017/Ecommerce")
    .then(()=>{
        // Make application listenable 
        app.listen(port,()=>{
            console.log(`started ${port}`)
        })
    })
    .catch(()=>{
        console.log('failed to connect');
    })


