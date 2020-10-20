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
        type: {
			office: {
				quantity: {
					type: Number,
					default: 0
				},
				price: {
                    type: Number
                },
			},
			desk: {
				quantity: {
					type: Number,
					default: 0
				},
				price: {
                    type: Number
                }
			},
			meetingRoom: {
				quantity: {
					type: Number,
					default: 0
				},
				price: {
                    type: Number,
                },
            },
            others: {
				quantity: {
					type: Number,
					default: 0
				},
				price: {
                    type: Number
                },
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

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
