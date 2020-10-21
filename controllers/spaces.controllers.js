const createError = require('http-errors');
const Comment = require('../models/comment.model');
const Space = require('../models/space.model');
const Review = require('../models/review.model')



module.exports.viewDetail = (req, res, next) => {
	const spaceId = req.params.id;

	Space.findById(spaceId)
		.populate('user')
		.populate('comments')
		.populate('reviews')
		.populate({
            path: 'comments',
            options: {
                sort: {
                  createdAt: -1
                }
            },
			populate: {
				path: 'user'
			}
		})
		.populate({
			path: 'reviews',
			populate: {
				path: 'user'
			}
		})
		.then((space) => {
			if (space) {
				res.json(space);
			} else {
				throw createError(404, 'Space not found');
			}
		})
		.catch(e => next(createError(400, e)));
};

module.exports.newSpace = (req, res, next) => {
	const body = [ ...req.body ];
    body.user = req.currentUser.id;
    body.image = req.file ? req.file.url : undefined

    Space.find({ title: body.title, 'location.coordinates': body.location.coordinates })
        .then((space) => {
		if (!space) {
			const newSpace = new Space(body);

            newSpace.save()
                .then((tweet) => res.status(201).json(tweet))
                .catch(e => next(createError(400, e)));
		} else {
            throw createError(401, 'Space is repeat')
        }
	});
};


module.exports.deleteSpace = (req, res, next) => {
    const spaceId = req.params.id;

    Promise.all([
        Space.findByIdAndDelete(spaceId),
        Comment.deleteMany({space : spaceId}),
        Review.deleteMany({space : spaceId})
    ]).then(() => res.json())
    .catch(e => next(createError(400, e)))
    
};

module.exports.editSpace = (req, res, next) => {
	const body = [ ...req.body ];
	const spaceId = req.params.id;
	body.image = req.file ? req.file.url : undefined

	Space.findByIdAndUpdate(spaceId, {$set : { body }})
		.then(space => res.status(200).json(space))
		.catch(e => next(createError(400, e)))

}

module.exports.showUser = (req, res, next) => {
	const userId = req.session.user

	Space.find({user : userId})
		.populate('user')
		.populate('comments')
		.populate('reviews')
		.populate({
            path: 'comments',
            options: {
                sort: {
                  createdAt: -1
                }
            },
			populate: {
				path: 'user'
			}
		})
		.populate({
			path: 'reviews',
			populate: {
				path: 'user'
			}
		})
		.then((space) => {
			if (space) {
				res.json(space);
			} else {
				throw createError(404, 'Space not found');
			}
		})
		.catch(e => next(createError(400, e)));
};

