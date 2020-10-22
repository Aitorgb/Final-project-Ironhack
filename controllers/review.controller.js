const createError = require('http-errors');
const Review = require('../models/review.model');
const Booking = require('../models/booking.model');
const { param } = require('../config/routes');

module.exports.createReview = (req, res, next) => {

  const params = { 
    user: req.session.user.id,
    space: req.params.id,
//    booking: req.params.id,
    review: req.body
  }

  Booking.findOne(params)
    .then(booking => {
      if(!booking) {
        throw createError(403, "user doesn´t have enough permissions to proceed further")
      } else {
        const newReview = new Review(params)
        newReview.save()
          .then((review) => res.json(review))
          .catch((e) => createError(400, e))
      }
  })
  .catch((e) => createError(400, e))
}

module.exports.deleteReview = (req, res, next) => {
	const spaceId = req.params.id;

	Review.findByIdAndDelete(spaceId)
			.then((review) => {
				if(review) {
					res.status(200).json()
				} else {
					next(createError(403, "user doesn´t have enough permissions to proceed further"))
				}
			}
			).catch((e) => createError(400, e))
};

module.exports.editReview = (req, res, next) => {
	const params = { 
    user: req.session.user.id,
    space: req.params.id,
//    booking: req.params.id,
    review: req.body
  }

	Review.findOne(params)
		.then(review => {
			review = req.body
			review.save()
				.then(review => res.status(200).json(review))
				.catch((e) => createError(400, e))
		})
		.catch((e) => createError(400, e))
};