require('dotenv').config()
const express = require('express')
const app= express();
const mongoose = require('mongoose')
const authRoute  = require('./routes/auth');
const session = require('express-session')
const mongodbSession = require('connect-mongodb-session')(session)
const cookieParser = require("cookie-parser");

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("Connected to DB"))
.catch((err)=>console.log(err))

const store = new mongodbSession({
    uri:process.env.DATABASE_URL,
    collection:'mysession'
})

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 1000*60 },
    resave: false
}));
//middleware
app.use(cookieParser());
app.use("/api/auth",authRoute);

app.listen(3000)

