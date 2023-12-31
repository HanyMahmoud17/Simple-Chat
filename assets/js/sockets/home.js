socket.emit('getOnlineFriends',Id)

socket.on('onlineFriends',friends=>{
    // console.log(friends);
    let div=document.getElementById('onlineFriends')
    if(friends.length ==0){
        div.innerHTML = `
        <p class="alert alert-danger">No Online Friends Found</p>
        `
    } else {
        let items =`
        <div class="row" >
        `
        for(let friend of friends){
            items +=`
            <div class="col col-12 col-md-6 col-lg-6">
            <img src="/${friend.image}">
            <div>
            <h3><a href="/profile/${friend.id}">${friend.name}</a></h3>
            <a href="/chat/${friend.chatId}" class="btn btn-success">Chat Now</a>
            </div>
            </div>
            `
        }
        items+=`
        </div>
        `
        div.innerHTML= items
    }
})

