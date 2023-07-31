const messageModel=require('../models/message.model')
const getChat=require('../models/chat.model').getChat


exports.getChat=(req,res,next)=>{

    let chatId=req.params.id
    
    messageModel.getMessage(chatId).then(messages=>{
        if(messages.length === 0){
            getChat(chatId).then(chat=>{
                let friendData=chat.users.find(user=>user._id != req.session.userId)
                res.render("chat", {
                pageTitle: friendData.username,
                isUser:req.session.userId,
                myName:req.session.name,
                friendRequests:req.friendRequests,
                messages:messages,
                friendData:friendData,
                chatId:chatId,
                
            })
            })

        } else {
            let friendData=messages[0].chat.users.find(user=>user._id != req.session.userId)
            // console.log("name ..",friendData.username);
            res.render("chat", {
            pageTitle: friendData.username,
            isUser:req.session.userId,
            myName:req.session.name,
            friendRequests:req.friendRequests,
            messages:messages,
            friendData:friendData,
            chatId:chatId,
            
        })
        }

    })

}