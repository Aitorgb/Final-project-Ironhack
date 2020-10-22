const createError = require('http-errors');
const Chat = require('../models/chat.model');
const Message = require('../models/message.model');

module.exports.createChat = (req, res, next) => {
	const userId = req.params.id;

	const chat = new Chat({
		owner: req.session.user.id,
		user: userId
	});
	chat.save().then((chat) => res.json(chat)).catch(next);
};

module.exports.sendMessage = (req, res, next) => {
	const { message } = req.body;
  const chatId = req.params.id;
  const userId = req.session.user.id;

	Message.findOne({ chat: chatId }, { $push: { message: message, "message.user" : userId } })
		.then((message) => {
			if (message) res.status(200).json(message);
			else {
				res.status(400).json({
					messageError: 'Message doesn´t send'
				});
			}
		})
		.catch((e) => createError(400, e));
};

module.exports.getChat = (req, res, next) => {
	const chatId = req.params.id;

	Message.findOne({ chat: chatId })
		.then((message) => {
			if (message) res.status(200).json(message);
			else {
				throw createError(404, "Chat not found")
			}
		})
		.catch((e) => createError(400, e));
};

module.exports.updateChat = (req, res, next) => {
	const user = req.session.user.id;
  Chat.find({ $or: [ { user: user }, { owner: user } ] })
    .populate('message')
		.then((chats) => res.status(200).json(chats))
		.catch((e) => createError(400, e));
};
