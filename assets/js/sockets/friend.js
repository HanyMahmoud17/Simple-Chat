const addFriend=document.getElementById('addFriend')


const myId=document.getElementById('myId').value
const myName=document.getElementById('myName').value
const myImage=document.getElementById('myImage').value
const friendId=document.getElementById('friendId').value
const friendImage=document.getElementById('friendImage').value
const friendName=document.getElementById('friendName').value
// const socket=io();
// console.log(myId);

addFriend.onclick=(e)=>{
    console.log(socket);
    e.preventDefault();
    // i use socket direct because i was initial it global in init.js and i import this script file before my friend.js file 
    socket.emit('sendFriendRequest',{
        myId,
        myImage,
        myName,
        friendId,
        friendName,
        friendImage
    })
}
socket.on('requestSent',()=>{
    addFriend.remove()
    document.getElementById('friend-form').innerHTML += '<input type="submit" class="btn btn-danger" value="Cancel Friend" formaction="/friend/cancel">'
})