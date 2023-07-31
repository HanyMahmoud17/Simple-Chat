const {sendFriendRequest,getFriends}=require('../models/user.modal')


module.exports= io =>{
    io.on('connection',socket=>{
        // console.log(socket);
        socket.on('sendFriendRequest', data =>{
            // console.log(data); 
            sendFriendRequest(data).then(()=>{
            // send notif to the user who sent 
            socket.emit('requestSent')
    
            // send to other user
            io.to(data.friendId).emit('newFriendRequest',{name: data.myName,id: data.myId})
            }).catch((err)=>{
                socket.emit('requestFailedd')
            });
        })

        socket.on('getOnlineFriends',(id)=>{
            getFriends(id).then((friends)=>{
                // console.log(friends);
                let onlineFriends = friends.filter((friend)=>io.onlineUsers[friend.id])
                console.log(onlineFriends);
                socket.emit('onlineFriends',onlineFriends)
            })
        })


    })

}