const userModel=require('../models/user.modal')


exports.getHome=(req,res,next)=>{
    res.render('home', {
        pageTitle: 'Home',
        isUser:req.session.userId,
        friendRequests:req.friendRequests
    })
}