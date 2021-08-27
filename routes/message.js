const router = require("express").Router()

const Conversation = require('../models/Conversion')


//This is a demo how conversation might initialised
//takes senderID,receiverID,and initial message (if twitter introduces it like facebook)

 const onConnect=async(sender,receiver,message)=>{
     //A demo message object
    const demoMessage={
        text:message,
        sender:"612799b43cd3421114a3ae06"
    }

        try{
            const newConv= new Conversation({
                senderId:sender,
                receiverId:receiver,
                text:demoMessage
            })
           // console.log(newConv)
            const conv = await newConv.save();
            //res.status(200).json(conv);
        }catch(err){
            //res.status(500).send('Internal message Error ')
        }
   
}


//Insert Message
router.put("/",async (req,res)=>{
    try{
        //Finds a conversation by its unique ID and updates it
          Conversation.findByIdAndUpdate(req.body.conversationId, { '$push': { 'text': req.body.message } }, (err, docs) => {
            if(err)console.log(err)
        })
        res.status(200).json("Succeed updated") 
    }catch(err){
        res.status(500).send('Internal Server Error sending message'+err)
    }
})

module.exports = router