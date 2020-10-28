const createError = require('http-errors');
const Comment = require('../models/comment.model');
const Space = require('../models/space.model');
const Review = require('../models/review.model')
const Booking = require('../models/booking.model')


module.exports.spacesAll = (req, res, next) => {

	Space.find()
		.populate('user')
		.populate('reviews')
		.populate({
			path: 'reviews',
			populate: {
				path: 'user'
			}
		})
		.then((spaces) => {
			if (spaces) {
				res.json(spaces);
			} else {
				throw createError(404, 'Space not found');
			}
		})
		.catch(e => next(createError(400, e)));
};

module.exports.searchSpace = (req, res, next) => {
	const criteria = new RegExp(req.params.search, "i")
	
	Space.find({"location.direction" : { $text: { $search: criteria }}})
		.populate('user')
		.populate('reviews')
		.populate({
			path: 'reviews',
			populate: {
				path: 'user'
			}
		})
		.then((spaces) => {
			if (spaces) {
				res.json(spaces);
			} else {
				throw createError(404, 'Space not found');
			}
		})
		.catch(e => next(createError(400, e)));
};







module.exports.viewDetail = (req, res, next) => {
	const spaceId = req.params.id;

	Space.findById(spaceId)
		.populate('user')
		.populate('comments')
		.populate('reviews')
		.populate('bookings')
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
	let body = req.body;
    body.user = req.session.user.id;
	body.image = req.files ? req.files.map(file => file.url) : undefined
	body.location = {
		coordinates : body.coordinates,
		direction : body.direction
	}
	const type = ['office', 'desk', 'meetingRoom', 'others']

	type.map(type => {
		if (type in body) {
			body[type] = {
				quantity : body[type][0],
				price : body[type][1],
				duration : body[type][2],
				capacity : body[type][3]
			}
		}
	})
	
	delete body.coordinates;
	delete body.direction;

    Space.findOne({ title: body.title, 'location.coordinates': body.location.coordinates })
        .then((space) => {
		if (!space) {
			const newSpace = new Space(body);
            newSpace.save()
                .then((space) => res.status(201).json(space))
                .catch(e => next(createError(400, e)));
		} else {
            next(createError(400, 'Space is repeat'))
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

