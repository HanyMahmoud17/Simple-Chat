const userModel=require('../models/user.modal')

exports.getProfile=(req,res,next)=>{
    let id=req.params.id
    if(!id) return res.redirect('/profile/' + req.session.userId)
    userModel.getUserData(id).then((data)=>
    {
        // console.log("data received",data);
        res.render("profile",{
            authError: req.flash('authError')[0],
            validationErrors: req.flash('validationErrors'),
            myId:req.session.userId,
            myName:req.session.name,
            myImage:req.session.image,
            isUser:req.session.userId,
            pageTitle:data.username,
            friendId:data.id,
            friendName:data.username,
            friendImage:data.image,
            isOwner: id === req.session.userId,
            isFriends:data.friends.find(friend=>friend.id === req.session.userId),
            friendRequests: req.friendRequests,
            isFriendRequestSend:data.friendRequests.find(friend=>friend.id === req.session.userId),
            isFriendRequestRecieve:data.sentRequests.find(friend=>friend.id === req.session.userId),
        })
    })
    .catch(err=>
        {
            req.flash('authError', err)
            res.redirect('/login')
        });
}

