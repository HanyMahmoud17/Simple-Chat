const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image:{
        type: String,
        default: 'userImage.png'
    },
    // isOnline:{
    //     type: Boolean,
    //     default: false
    // },
    friends: {
        type: [{name:String,image:String,id:String,chatId:String}],
        default:[]
    },
    friendRequests:{
        type: [{name:String,id:String}],
        default:[]
    },
    sentRequests: {
        type: [{name:String,id:String}],
        default:[]
    }
})

const User=mongoose.model('user',userSchema)

const Chat=require('./chat.model').Chat

exports.User=User;

exports.getUserData = (id) => {
    // console.log(id);
    return new Promise((resolve, reject) => {
    User.findById(id)
    // console.log("user..",user)
      .then(data => {
        resolve(data)
      }).catch(err => reject(err));
  })
};

//friend controller
exports.sendFriendRequest= async (data)=> {
    // console.log("data".data);
    try{
        await User.updateOne({_id: data.friendId}, {$push: {friendRequests:{name:data.myName,id:data.myId}}});
        await User.updateOne({_id: data.myId}, {$push: {sentRequests:{name:data.friendName,id:data.friendId}}});
        return;
    } catch(err){
        throw new Error(err)
    }

};
exports.cancelFriendRequest=async (data)=> {
    try{

        await User.updateOne({_id: data.friendId}, {$pull: {friendRequests:{id:data.myId}}});
        await User.updateOne({_id: data.myId}, {$pull: {sentRequests:{id:data.friendId}}});
        return;
    } catch(err){
        throw new Error(err)
    }

};

exports.acceptFriendRequest=async (data)=> {
    try{
        let newChat=new Chat({
            users:[data.myId,data.friendId]
        })
        let chatDoc=await newChat.save()

        await User.updateOne({_id: data.friendId}, {$push: {friends:{name:data.myName,id:data.myId,image:data.myImage,chatId:chatDoc._id}}});
        await User.updateOne({_id: data.myId}, {$push: {friends:{name:data.friendName,id:data.friendId,image:data.friendImage,chatId:chatDoc._id}}});
        await User.updateOne({_id: data.friendId}, {$pull: {sentRequests:{id:data.myId}}});
        await User.updateOne({_id: data.myId}, {$pull: {friendRequests:{id:data.friendId}}});
        return;
    } catch(err){
        throw new Error(err)
    }

};
exports.rejectFriendRequest=async (data)=> {
    try{
        await User.updateOne({_id: data.friendId}, {$pull: {sentRequests:{id:data.myId}}});
        await User.updateOne({_id: data.myId}, {$pull: {friendRequests:{id:data.friendId}}});
        return;
    } catch(err){
        throw new Error(err)
    }

};
exports.deleteFriendRequest=async (data)=> {
    try{
        await User.updateOne({_id: data.friendId}, {$pull: {friends:{id:data.myId}}});
        await User.updateOne({_id: data.myId}, {$pull: {friends:{id:data.friendId}}});
        return;
    } catch(err){
        throw new Error(err)
    }

};

exports.getFriendRequests= async (id)=>{
    try{
       let data = await User.findById(id,{friendRequests:true})
        return data.friendRequests
    } catch(err){
        throw new Error(err)
    }
}

exports.getFriends= async (id)=>{
    try{
       let data = await User.findById(id,{friends:true})
        return data.friends
    } catch(err){
        throw new Error(err)
    }
}