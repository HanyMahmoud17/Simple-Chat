
const chatId=document.getElementById('chatId').value
const msg=document.getElementById('message')
const sendMsg=document.getElementById('sendMsg')
const callBtn=document.getElementById('callBtn')
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


// video call
let peer=new Peer()
let peerId=null
peer.on('open', function(id) {
    peerId=id
	console.log('My peer ID is: ' + id);
  });

  callBtn.onclick=()=>{

      socket.emit('reqPeerId',chatId)
  }
  socket.on('getPeerId',()=>{
    socket.emit('sendPeerId',{
        chatId: chatId,
        peerId: peerId
    });
  })
  socket.on('recievePeerId',id =>{
    // console.log(id);
    navigator.mediaDevices.getUserMedia({audio:true, video:true}).then((stream)=>{
        let call= peer.call(id,stream)
        call.on('stream',showvideoCall)
    }).catch(err =>console.log(err))
  })

  peer.on('call',call=>{
    navigator.mediaDevices.getUserMedia({audio:true, video:true}).then((stream)=>{
        call.answer(stream)
        call.on('stream',showvideoCall)
    }).catch(err =>console.log(err))
  })

  function showvideoCall(stream){
    let video=document.createElement('video')
    video.srcObject = stream
    document.body.append(video)
    video.play()
  }