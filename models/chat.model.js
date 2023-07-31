const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]
});

const Chat = mongoose.model('chat', chatSchema);

module.exports = {
  Chat: Chat,
  getChat: async (chatId) => {
    try {
      let chat = await Chat.findById(chatId).populate('users');
      return chat;
    } catch (e) {
      throw new Error(e);
    }
  }
};