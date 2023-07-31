const socket=io()
// remove color of button aftre i receive notif
const FriendReqs=document.getElementById('FriendReqs')
let Id=document.getElementById('userId').value

socket.on('connect',()=>{

    socket.emit('joinNotificationRoom',Id)
    socket.emit('goOnline',Id)
})

socket.on('newFriendRequest',data=>{
    // console.log(data);
    const friendRequests=document.getElementById('friendRequests')
   const span=friendRequests.querySelector('span')
    if(span) span.remove()
    friendRequests.innerHTML +=`
    <li><a class="dropdown-item" href="/profile/${data.id}">
        ${data.name}
    </a></li>
    `

    
    FriendReqs.classList.remove('btn-info')
    FriendReqs.classList.add('btn-danger')

})

FriendReqs.onclick=(e)=>{
    FriendReqs.classList.add('btn-info')
    FriendReqs.classList.remove('btn-danger')
}