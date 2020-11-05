const createError = require('http-errors');
const User = require('../models/user.model');
const nodemailer = require('../config/mailer.config');
const mongoose = require('mongoose');
const Space = require('../models/space.model');

module.exports.login = (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw createError(400, 'Missing credentials');
	}
	User.findOne({ email })
		.then((user) => {
			if (!user) {
				res.json(400).json('wrong credentials invalid username or password');
				//throw createError(400, "wrong credentials invalid username or password");
			} else {
				return user.checkPassword(password).then((match) => {
					if (!match) {
						throw createError(400, 'wrong credentials invalid username or password');
					} else {
						req.session.user = user;
						res.json(user);
					}
				});
			}
		})
		.catch((e) => next(e));
};

module.exports.logout = (req, res, next) => {
	req.session.destroy();
	res.status(200).json();
};

module.exports.createUser = (req, res, next) => {
	const user = req.body
	user.name = user.firstName
	delete user.firstName
	
	const user = new User({
		...req.body,
		avatar: req.file ? req.file.path : undefined
	});

	user
		.save()
		.then((user) => {
			nodemailer.sendValidationEmail(user.email, user.activation.token, user.name);
			res.status(200).json({
				message: 'Check your email for activation'
			});
		})
		.catch((error) => {
			if (error instanceof mongoose.Error.ValidationError) {
				throw createError(400, 'Wrong credentials');
			} else if (error.code === 11000) {
				// error when duplicated user
				throw createError(400, 'User already exists');
			} else {
				next(error);
			}
		})
		.catch((error) => next(error));
};

module.exports.activateUser = (req, res, next) => {
	User.findOne({ 'activation.token': req.params.token })
		.then((user) => {
			if (user) {
				user.activation.active = true;
				user
					.save()
					.then((user) => {
						res.status(200).json({
							user,
							message: 'Your account has been activated, log in below!'
						});
					})
					.catch((error) => next(error));
			} else {
				throw createError(400, 'Wrong credentials');
			}
		})
		.catch((error) => next(error));
};

module.exports.upDateProfile = (req, res, next) => {
  
  User.findByIdAndUpdate(req.params.id, { $set : req.body.user})
      .then (user => {
        if (user) {
          res.status(200).json(user)
        } else {
          res.status(400).json('Not modify')
        }
      })
      .catch(next)
}

module.exports.showUser = (req, res, next) => {
	const userId = req.params.id;

	User.findById(userId)
		.populate('space')
		.populate('chat')
    .populate('comments')
		.populate('reviews')
		.populate({
			path: 'chat',
			options: {
				sort: {
					createdAt: -1
				}
			},
			populate: [{
				path: 'message'
      },
      {
				path: 'owner'
      },
      {
				path: 'user'
      }
    
    ]
		})
		.populate({
			path: 'comments',
			options: {
				sort: {
					createdAt: -1
				}
			},
			populate: {
				path: 'user'
			}
    })
    .populate({
			path: 'space',
			populate: [{
				path: 'comments'
      },
      {
				path: 'bookings'
      },
      {
				path: 'reviews'
      }]
      
		})
		.populate({
			path: 'reviews',
			populate: {
				path: 'user'
			}
		})
		.then((user) => {
			if (user) {
				res.status(200).json(user);
			} else {
				throw createError(404, 'Space not found');
			}
		})
		.catch((e) => next(createError(400, e)));
};
