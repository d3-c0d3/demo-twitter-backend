const router = require("express").Router()

const User  = require('../models/User');

//for hashing passwords
const bcrypt= require('bcrypt');

//Register
router.post("/register",async (req,res)=>{
    
    try{
        //hashes password
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password,salt);

        //creates a new user object
        const newUser= new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass
        })
        //creates session
        let session = req.session
        session.userid=req.body.username
        //saves in database
        const user = await newUser.save()
        
        res.status(200).json("Successfully registered");
    }catch(err){
        res.status(500).send('Internal Server Error')
    }
})

//Login

router.post('/login',async(req,res)=>{
    //session info
    let sessionss = req.session
    sessionss.userid=req.body.username
    try{
        //finds by unique username 
        const user = await User.findOne({username:req.body.username})
        
        if(!user ){
            res.status(400).send("Wrong Credentials ")
        }
        else{    
            //compares password using bcrypt
            const validate = await bcrypt.compare(req.body.password,user.password)
            
            if(!validate){
                res.status(400).json('Wrong Credentials ')
            }
            else{
                const {password, ...others} = user._doc;
                
                res.status(200).json(others)
            }
        }   
    }catch(err){
        res.status(500).send('Internal Server Error ! ')
    }
})

module.exports = router


 