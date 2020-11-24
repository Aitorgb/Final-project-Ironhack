const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const DNI_PATTERN = /^[0-9]{8,8}[A-Za-z]$/
const SALT_WORK_FACTOR = 10;

const generateRandomToken = () => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  return token;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name needs at last 8 chars'],
    trim: true
  },
  lastName: {
    type: String,
    minlength: [3, 'Name needs at last 8 chars'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [EMAIL_PATTERN, 'Email is invalid']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password needs at last 8 chars']
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/dbldxawid/image/upload/v1598365694/Kiui/user_lqfimt.png'
  },
  number: {
    type: Number
  },
  nif: {
    type: String
  },
  razonSocial: {
    type: String,
  },
  direccion: {
    type: String,
  },
  activation: {
    active: {
      type: Boolean,
      default: false
    },
    token: {
      type: String,
      default: generateRandomToken
    }
  },
  social: {
    google: String,
    facebook: String,
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      delete ret.activation;
      delete social;
      return ret;
    }
  }
})

userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
          .then(hash => {
            user.password = hash;
            next();
          });
      })
      .catch(error => next(error));
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

userSchema.virtual('comments', {
	ref: 'Comment',
	localField: '_id',
	foreignField: 'user',
	justOne: false
});

userSchema.virtual('space', {
	ref: 'Space',
	localField: '_id',
	foreignField: 'user',
	justOne: false
});

userSchema.virtual('bookings', {
	ref: 'Booking',
	localField: '_id',
	foreignField: 'user',
	justOne: false
});

userSchema.virtual('chat', {
	ref: 'Chat',
	localField: '_id',
	foreignField: 'user',
	justOne: false
});
userSchema.virtual('chatOwner', {
	ref: 'Chat',
	localField: '_id',
	foreignField: 'owner',
	justOne: false
});

const User = mongoose.model('User', userSchema);

module.exports = User;
