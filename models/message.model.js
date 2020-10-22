const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
	{
		message: {
			type: text,
			required: true
		},
		chat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Chat',
			required: true
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

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
