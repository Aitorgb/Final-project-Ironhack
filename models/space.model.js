const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [ true, 'Title is required' ],
			minlength: [ 10, 'Description needs 10 chars' ]
		},
		description: {
			type: String,
			required: [ true, 'Description is required' ],
			minlength: [ 20, 'Description needs 20 chars' ]
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		location: {
			type: {
				type: String,
				default: 'Point'
			},
			coordinates: [ Number ],
			direction: String
		},
		services: {
			type: [ String ]
		},
		number: {
			type: Number
		},
		type: {
			office: {
				quantity: {
					type: Number,
					default: 0
				},
				price: {
                    type: Number,
                    duration : {
                        type: String,
                        enum: ['day', 'month', 'year']
                    }
                },
				capacity: Number
			},
			desk: {
				quantity: {
					type: Number,
					default: 0
				},
				price: {
                    type: Number,
                    duration : {
                        type: String,
                        enum: ['day', 'month', 'year']
                    }
                },
				capacity: Number
			},
			meetingRoom: {
				quantity: {
					type: Number,
					default: 0
				},
				price: {
                    type: Number,
                    duration : {
                        type: String,
                        enum: ['day', 'month', 'year']
                    }
                },
				capacity: Number
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



const Space = new mongoose.model('Space', spaceSchema);

module.exports = Space;