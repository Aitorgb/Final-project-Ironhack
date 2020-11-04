const createError = require('http-errors');
require('dotenv').config()
const Comment = require('../models/comment.model');
const Space = require('../models/space.model');
const Review = require('../models/review.model');
const Booking = require('../models/booking.model');
const stripe = require("stripe")(process.env.STRIKE);

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
		.catch((e) => next(createError(400, e)));
};

module.exports.searchSpace = (req, res, next) => {
	const criteria = new RegExp(req.params.search, 'i');

	Space.find({ 'location.direction': { $text: { $search: criteria } } })
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
		.catch((e) => next(createError(400, e)));
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
		.catch((e) => next(createError(400, e)));
};

module.exports.newSpace = (req, res, next) => {
	console.log(req.files);
	let body = req.body;
	body.user = req.session.user.id;
	body.image = req.files ? req.files.map((file) => file.url) : undefined;
	body.location = {
		coordinates: body.coordinates,
		direction: body.direction,
		extraDirection: body.extraDirection,
		city: body.city
	};
	body.schedule = {
		day: body.day,
		available: body.available,
		checkIn: body.checkIn,
		checkOut: body.checkOut
	};

	delete body.coordinates;
	delete body.direction;
	delete body.checkIn;
	delete body.checkOut;
	delete body.day;
	delete body.available;
	delete body.city;
	delete body.extraDirection;

	Space.findOne({ type: body.type, 'location.coordinates': body.location.coordinates }).then((space) => {
		if (!space) {
			const newSpace = new Space(body);
			newSpace
				.save()
				.then((space) => {
					res.status(201).json(space);
				})
				.catch((e) => next(createError(400, e)));
		} else {
			next(createError(400, 'Space is repeat'));
		}
	});
};
module.exports.pay = (req, res) => {
	const { pay } = req.body;
	const payNow = async () => { 
	
	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: pay,
		currency: 'ES'
	});
	res.send({
		clientSecret: paymentIntent.client_secret
	});
	}
	payNow()
};

module.exports.deleteSpace = (req, res, next) => {
	const spaceId = req.params.id;

	Promise.all([
		Space.findByIdAndDelete(spaceId),
		Comment.deleteMany({ space: spaceId }),
		Review.deleteMany({ space: spaceId })
	])
		.then(() => res.json())
		.catch((e) => next(createError(400, e)));
};

module.exports.editSpace = (req, res, next) => {
	const body = [ ...req.body ];
	const spaceId = req.params.id;
	body.image = req.file ? req.file.url : undefined;

	Space.findByIdAndUpdate(spaceId, { $set: { body } })
		.then((space) => res.status(200).json(space))
		.catch((e) => next(createError(400, e)));
};
