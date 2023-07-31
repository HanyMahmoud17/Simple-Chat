
const chatId=document.getElementById('chatId').value
const msg=document.getElementById('message')
const sendMsg=document.getElementById('sendMsg')
const msgContainer=document.getElementById('messages-container')

socket.emit('joinChat',chatId)

sendMsg.onclick=()=>{
    let content=msg.value

    socket.emit('sendMessage',{
        chat:chatId,
        content:content,
        sender:Id
    },()=>{
        msg.value=''
    })
}

socket.on('newMessage',msg=>{
    msgContainer.innerHTML+=msg.content
})