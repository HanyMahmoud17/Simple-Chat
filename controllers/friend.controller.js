const userModel=require('../models/user.modal')


// exports.add=(req,res,next)=>{
//     userModel.sendFriendRequest(req.body).then(()=>{
//         // console.log(req.body.friendId);
//         res.redirect('/profile/' + req.body.friendId)
//     }).catch(err=>{
//         res.redirect('/error')
//     })
// }

exports.cancel=(req,res,next)=>{
    userModel.cancelFriendRequest(req.body).then(()=>{
        res.redirect('/profile/' + req.body.friendId)
    }).catch(err=>{
        res.redirect('/error')
    })
}


exports.accept=(req,res,next)=>{
    userModel.acceptFriendRequest(req.body).then(()=>{
        res.redirect('/profile/' + req.body.friendId)
    }).catch(err=>{
        res.redirect('/error')
    })
}

exports.reject=(req,res,next)=>{
    userModel.rejectFriendRequest(req.body).then(()=>{
        res.redirect('/profile/' + req.body.friendId)
    }).catch(err=>{
        res.redirect('/error')
    })
}

exports.delete=(req,res,next)=>{
    userModel.deleteFriendRequest(req.body).then(()=>{
        res.redirect('/profile/' + req.body.user)
    }).catch(err=>{
        res.redirect('/error')
    })
}

