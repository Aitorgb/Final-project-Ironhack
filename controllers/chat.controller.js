const createError = require('http-errors');
const Chat = require('../models/chat.model');
const Message = require('../models/message.model');

module.exports.createChat = (req, res, next) => {
	const userId = req.params.id;

	Chat.findOne({
		$or: [ { owner: req.session.user.id, user: userId }, { owner: userId, user: req.session.user.id } ]
	})
		.then((chat) => {
			if (!chat) {
				const chat = new Chat({
					owner: req.session.user.id,
					user: userId
				});

				chat
					.save()
					.then((chat) => res.status(200).json(chat))
					.catch(next(createError(404, 'Chat not created')));
			} else {
				res.status(200).json('Chat exist');
			}
		})
		.catch((e) => createError(400, e));
};

module.exports.sendMessage = (req, res, next) => {
	const { message } = req.body;
	const chatId = req.params.id;
	const userId = req.session.user.id;



	Message.find({ chat: chatId })
		.then((arrayMessage) => {
			if (arrayMessage.length === 0) {
				const messageNew = new Message({
					messages: [
						{
							message: message,
							user: userId
						}
					],
					chat: chatId
				});

				messageNew
					.save()
					.then((chat) => {
						if (chat) {
							res.status(200).json(chat);
						} else {
							res.json(404, 'Message not created.');
						}
					})
					.catch(createError(404, 'Message not created'));
			} else {
				arrayMessage[0].messages = [ ...arrayMessage[0].messages, { message: message, user: userId } ];
				arrayMessage[0]
					.save()
					.then((chat) => {
						if (chat) {
							res.status(200).json(chat);
						} else {
							res.json(404, 'Message not created.');
						}
					})
					.catch(createError(404, 'Message not created'));
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
				throw createError(404, 'Chat not found');
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

module.exports.chatBetweenTwo = (req, res, next) => {
	const user = req.session.user.id;
	const userId = req.params.id;

	Chat.find({
		$or: [ { owner: req.session.user.id, user: userId }, { owner: userId, user: req.session.user.id } ]
	})
		.populate('message')
		.then((chats) => {

			if (chats.length > 0) {
				
				res.status(200).json(chats);
			} else {
				res.status(200).json(null);
			}
		})
		.catch((e) => createError(400, e));
};
