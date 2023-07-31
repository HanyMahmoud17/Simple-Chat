// const fs=require('fs')

module.exports=io=>{
    io.on('connection',socket=>{
        socket.on('joinNotificationRoom', id=>{
            socket.join(id);
            console.log('joined',id);
        })

        // handle inter the online user

        socket.on('goOnline',id=>{
            // this refer to key that is refer to id 
            io.onlineUsers[id] = true;
            // console.log("before",io.onlineUsers);
            socket.on('disconnect',()=>{
                io.onlineUsers[id] = false;
                // console.log("after",io.onlineUsers);
            })
        })

    })

}