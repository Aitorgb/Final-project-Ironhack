const createError = require('http-errors');
const Review = require('../models/review.model');
const Booking = require('../models/booking.model');
const { param } = require('../config/routes');
const { date } = require('faker');

module.exports.createReview = (req, res, next) => {
	const review = req.body;
	const dateNow = new date.now();
	const params = {
		user: req.session.user.id,
		space: req.params.id,
		//    booking: req.params.id,
	};

	Booking.find(params)
		.then((bookings) => {
			if (!bookings) {
				throw createError(403, 'user doesn´t have enough permissions to proceed further');
			} else {
				const bookingPast = bookings.filter((booking) => booking.checkOut < dateNow);
				if (bookingPast.length > 0) {
					const newReview = new Review(review);
					newReview.save().then((review) => res.status(200).json(review)).catch((e) => createError(400, e));
				}
			}
		})
		.catch((e) => next(createError(400, e)));
};

module.exports.deleteReview = (req, res, next) => {
	const reviewId = req.params.id;

	Review.findByIdAndDelete(reviewId)
		.then((review) => {
			if (review) {
				res.status(200).json();
			} else {
				next(createError(403, 'user doesn´t have enough permissions to proceed further'));
			}
		})
		.catch((e) => next(createError(400, e)));
};

module.exports.editReview = (req, res, next) => {
	const params = {
		user: req.session.user.id,
		space: req.params.id,
		//    booking: req.params.id,
		review: req.body
	};

	Review.findOne(params)
		.then((review) => {
			review = req.body;
			review.save().then((review) => res.status(200).json(review)).catch((e) => createError(400, e));
		})
		.catch((e) => createError(400, e));
};

//Controlador para pedir todas las reviews de un usuario
module.exports.userReviews = (req, res, next) => {
	Review.find({user: req.params.id})
		.then((reviews) => {
			res.status(200).json(reviews);
		})
		.catch((e) => createError(400, e));
};
