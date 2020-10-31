const mongoose = require('mongoose');
const Comment = require('../models/comment.model');
const Reviews = require('../models/review.model');

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
		image: [ String ],
		services: {
			type: [ String ],
			enum: [
				'Gestion de agencias',
				'Oficina Virtual',
				'Recepción de emails',
				'Sala de reuniones',
				'Recepción',
				'Pizarra/Flipchart',
				'TV',
				'Parking',
				'Cacina',
				'Catering',
				'Aire Acondicionado',
				'Domiciliación Fiscal',
				'Intert + WIFI',
				'Impresora',
				'Equipo de sonido',
				'Acceso 24/7',
				'Gestión de eventos',
				'Recepción de llamadas',
				'Recepción paquetería',
				'Secretaría',
				'Impresora',
				'Uso de Dirección',
				'Niños permitidos',
				'Coworking Visa',
				'Café de cortesía',
				'Fruta',
				'Alarma',
				'Domiciliación Social',
				'Mascotas permitidas',
				'Fotocopiadora',
				'Escáner'
			]
		},
		number: {
			type: Number
		},
		schedule: {
			day: {
				type: [ String ]
			},
			available: {
				type: String,
				enum: [ 'Mañana', 'Tarde', 'Todo el día', 'No disponible' ]
			},
			checkInMorning: {
				type: Number,
				min: 0,
				max: 23,
				default: 8
			},
			checkInAfternoon: {
				type: Number,
				min: 0,
				max: 23,
				default: 14
			},
			checkOutMorning: {
				type: Number,
				min: 0,
				max: 23,
				default: 14
			},
			checkOutAfternoon: {
				type: Number,
				min: 0,
				max: 23,
				default: 20
			}
		},
		price: {
			type: [ Number ],
			required: true
		},
		bond: {
			type: Number
		},
		type: {
			office: {
				quantity: {
					type: Number,
					default: 0
				},
				capacity: Number
			},
			desk: {
				quantity: {
					type: Number,
					default: 0
				},
				capacity: Number
			},
			meetingRoom: {
				quantity: {
					type: Number,
					default: 0
				},
				capacity: Number
			},
			others: {
				quantity: {
					type: Number,
					default: 0
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

spaceSchema.virtual('comments', {
	ref: 'Comment',
	localField: '_id',
	foreignField: 'space',
	justOne: false
});
spaceSchema.virtual('bookings', {
	ref: 'Booking',
	localField: '_id',
	foreignField: 'space',
	justOne: false
});

spaceSchema.virtual('reviews', {
	ref: 'Review',
	localField: '_id',
	foreignField: 'space',
	justOne: false
});

const Space = new mongoose.model('Space', spaceSchema);

module.exports = Space;
