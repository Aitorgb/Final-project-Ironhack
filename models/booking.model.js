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
		dayShift: {
			type: String,
			enum: ['Mañana', 'Tarde', 'Todo el día']
		},
		dates: {
			type: [Date],
			required: true
		},
		price: {
			type: [Number],
		},
		type: { 
			String,
			enum : ['office', 'desk', 'meetingRoom']
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
