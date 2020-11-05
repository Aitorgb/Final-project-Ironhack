const { date } = require('faker');
const createError = require('http-errors');
const Booking = require('../models/booking.model');

module.exports.booking = (req, res, next) => {
	const spaceId = req.params.id;

	Booking.find(spaceId).then((bookings) => {
		if (!bookings) {
			res.status(204).json();
		} else {
			res.status(200).json(bookings);
		}
	});
};

module.exports.newBooking = (req, res, next) => {
	const spaceId = req.params.id;
	const { dayShift, dates } = req.body;
  const dateNow = Date.now();
  const booking = req.body.booking
  booking.user = req.session.user.id
  booking.space = spaceId
  console.log(booking)

	Booking.find({ space: spaceId })
		.then((bookings) => {
 
			if (bookings.length === 0) {
        const newBooking = new Booking(booking);
				newBooking.save().then((booking) => res.status(200).json(booking)).catch((e) => createError(400, e));
      } 
      else {
				const availability = bookings.filter((booking) => booking.dates.includes(dates));
				if (availability.length === 0) {
					const newBooking = new Booking(booking);
					newBooking
						.save()
						.then((booking) => res.status(200).json(booking))
						.catch((e) => createError(400, e));
				} else {
          res.status(200).json({
            messageError: 'Space is already booked'
          })
				}
			}
		})
		.catch((e) => next(createError(400, 'The reserve not created')));
};

module.exports.deleteBooking = (req, res, next) => {
	const bookingId = req.params.id;

	Booking.findByIdAndDelete(bookingId)
		.then((bookings) => {
			if (!bookings) {
				next(createError(400, 'Booking not found'));
			} else {
				res.status(200).json();
			}
		})
		.catch((e) => next(createError(403, e)));
};
