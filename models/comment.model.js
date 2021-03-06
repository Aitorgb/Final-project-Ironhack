const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
	{
		text: {
			type:String,
			required:true,
			minlength: [2, 'Comment too short']
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



const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
