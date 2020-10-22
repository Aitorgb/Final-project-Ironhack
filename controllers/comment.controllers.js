const createError = require('http-errors');
const Comment = require('../models/comment.model');

module.exports.addComment = (req, res, next) => {
	const spaceId = req.params.id;

	const comment = new Comment({
		text: req.body.text,
		user: req.session.user.id,
		space: spaceId
	});

	comment.save().then((comment) => res.json(comment)).catch(next);
};

module.exports.deleteComment = (req, res, next) => {
	const spaceId = req.params.id;

	Comment.findByIdAndDelete(spaceId)
			.then((space) => {
				if(space) {
					res.status(200).json()
				} else {
					next(createError(403, "Comment not delete"))
				}
			}
			).catch(next);
};

module.exports.editComment = (req, res, next) => {
	const spaceId = req.params.id;
	const userId = req.session.user.id
	const { text } = req.body
	console.log(userId)

	Comment.findOne({$and : [
					{"_id" : spaceId },
					{"user" : userId }
	]})
		.then(comment => {
			comment.text = text
			comment.save()
				.then(comment => res.status(200).json(comment))
				.catch(next)
		})
		.catch(next)
};


