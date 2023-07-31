const mongoose=require('mongoose')

const messageSchema=mongoose.Schema({
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'chat'
    },
    content:String,
    sender:String,
    timestamp:Number,
})

const Message=mongoose.model('message',messageSchema)

// exports.Message=Message;

exports.getMessage= async chatId=>{
    try{
                            // null = projection (select only this key to show),sort : (option)  ترتيب تصاعدي
        let messages=await Message.find({chat:chatId}, null,{sort: { timestamp: 1}}).populate({
            path:'chat', //from message 
            model:'chat', // from module or collection chat
            populate:{
                path:'users',
                model:'user',
                select:'username image'
            } 
        })
        return messages
    } catch(e){
        throw new Error(e)
    }
}

exports.newMessage=async (msg)=>{
    try{
        msg.timestamp=Date.now()
        let newMsg=new Message(msg)
        await newMsg.save()
        return;
    } catch(e){
        throw new Error(e)
    }
}