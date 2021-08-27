const Tweet = require("../models/Tweet")
const router = require("express").Router()

//Create Post
router.post("/",async (req,res)=>{

    try{
        //new tweet object
        const newTweet= new Tweet({
            userID:req.body.userID,
            post:req.body.post
        })
        //saves new tweet
        const tweet = await newTweet.save()
        res.status(200).json("Successfully tweeted");
    }catch(err){
        res.status(500).send('Internal Tweet Error ')
    }
})

//get posts
router.get('/',async (req,res)=>{

    try{
        //returns all tweets as response
        await Tweet.find({},(err,tweets)=>{
            if(err) console.log(err)
            res.status(200).json(tweets)
        })
       
    }
    catch(err){
        console.log(err)
    }
})

//Update Post
router.put('/',async(req,res)=>{
    try{
        const updatedPost = req.body.post
        //finds post by ID
        await Tweet.findOneAndUpdate({_id:req.body.postID},(err,tweet)=>{
            if(err) console.log(err);
            //updates post
            tweet.post=updatedPost;
            //saves the update
            tweet.save();
        })
        res.status(200).json("Tweet Updated");
    }catch(err){
        res.status(500).send('Internal Tweet Error '+err)
    }
})
//Delete post

router.delete('/',async(req,res)=>{
    try{
        const postID=req.body.postID;
        //finds a post by ID and deletes it
        await Tweet.findByIdAndDelete({_id:postID})
        res.status(200).send("Deleted")
    }catch(err){
        console.log(err)
    };
})

module.exports = router


 