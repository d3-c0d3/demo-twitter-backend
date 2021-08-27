//-------------------------
//<npm start> to run server |
//-------------------------
require('dotenv').config()
const express = require('express')
const app= express();
//essestial npm packages 
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const cookieParser = require("cookie-parser");
//router paths
const messageRoute = require('./routes/message')
const authRoute  = require('./routes/auth');
const tweetRoute = require('./routes/tweet');

//creating server
const http=require('http').createServer(app)

//middlewares for using json and forms
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//connecting Database
//DATABASE_URL imported from .env
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("DB Connected"))
.catch((err)=>console.log(err))

//store for login sessions
var store = new MongoDBStore({
    uri: process.env.DATABASE_URL,
    collection: 'mySessions'
  });


//middlewares

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 1000*60 },
    resave: false,
    store:store,
}));


app.use(cookieParser());
//Handels user register & login
app.use("/api/auth",authRoute);

//Handels conversation
app.use("/api/message",messageRoute);

//Handles tweet creation, read, update ,and delete
app.use("/api/tweet",tweetRoute);


//server at http://localhost:3000 
http.listen(3000)


