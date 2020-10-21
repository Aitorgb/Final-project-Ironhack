const createError = require('http-errors');
const Comment = require('../models/comment.model');

module.exports.addComment = (req, res, next) => {
	const spaceId = req.params.id;

	const comment = new Comment({
		text: req.body.text,
		user: req.currentUser.id,
		space: spaceId
	});

	comment.save().then((comment) => res.json(comment)).catch(next);
};

module.exports.deleteComment = (req, res, next) => {
	const spaceId = req.params.id;

	Comment.findByIdAndDelete(spaceId).then(() => res.json()).catch(next);
};

module.exports.editComment = (req, res, next) => {
    const spaceId = req.params.id;
    const { text } = req.body

    Comment.findByIdAndUpdate(spaceId, { $set: { text: text }})
        .then((comment) => res.json(comment))
        .catch(next);
};


