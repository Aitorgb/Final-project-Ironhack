const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
	{
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
		type: {
			office: {
				type: Number,
				default: 0,
				price : Number
			},
			desk: {
				type: Number,
				default: 0,
				price : Number
			},
			meetingRoom: {
				type: Number,
				default: 0,
				price : Number
			},
			others: {
				type: Number,
				default: 0,
				price : Number
			}
		}
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true
		}
	}
);

bookingSchema.methods.checkBooking = function(password) {
	return bcrypt.compare(password, this.password);
};

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
