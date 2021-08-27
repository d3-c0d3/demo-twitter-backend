const mongoose = require("mongoose")

const Message={
    textMcg:{
        type:Array
    },
    sender:{
        type:String,
        require:true
    }
}
const conversationSchema = new mongoose.Schema({
    initialised:{
        type:Boolean
    },
    participant1:{
        type:String,
        required:true
    },
    participant2:{
        type:String,
        required:true
    },
    text:{type:Array}

    }

)
module.exports = mongoose.model("Conversation",conversationSchema)