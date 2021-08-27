const mongoose = require("mongoose")
const replyModel={
    senderName:{
        type:String,
        require:true
    },
    text:{
        type:String,
        require:true
    }

}
const tweetSchema = new mongoose.Schema({
    userID:{
        type:String
    },
    post:{
        type:String,
        required:true
    }
   


    },
    {
        timestamps:true
    }

)
module.exports = mongoose.model("Tweet",tweetSchema)