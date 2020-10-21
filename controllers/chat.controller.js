const createError = require('http-errors');
const Chat = require('../controllers/chat.controller')


module.exports.createChat = (req, res, next) => {
  const {message, userId} = req.body
  
  const chat = new Chat({
    text: message, 
    owner: req.session.user.id,
    user: userId
  })
  chat.save()
  .then((chat) => res.json(chat)).catch(next);
}

module.exports.updateChat = (req, res, next) => {
  const user = req.session.user.id
  Chat.find({user: user, owner: user})
    .then()
}