const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
	{
		text: String,
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
		rating: {
			generalExperience: {
				type: Number,
				min: 0,
				max: 5,
				default: 2
			},
			clean: {
				type: Number,
				min: 0,
				max: 5,
				default: 2
			},
			veracity: {
				type: Number,
				min: 0,
				max: 5,
				default: 2
			},
			location: {
				type: Number,
				min: 0,
				max: 5,
				default: 2
			},
			arrival: {
				type: Number,
				min: 0,
				max: 5,
				default: 2
			},
			services: {
				type: Number,
				min: 0,
				max: 5,
				default: 2
			},
			communication: {
				type: Number,
				min: 0,
				max: 5,
				default: 2
			}
		}
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (doc, ret) => {
				ret.id = doc._id;
				delete ret._id;
				delete ret.__v;
				return ret;
			}
		}
	}
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
