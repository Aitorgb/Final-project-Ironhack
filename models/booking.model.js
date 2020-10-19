const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		space: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Space',
			required: true
		},
		checkIn: {
			type: Date,
			required: true
		},
		checkOut: {
			type: Date,
			required: true
		},
		duration: {
			type: Number,
			required: true
		}
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true
		}
	}
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
