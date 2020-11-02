const mongoose = require('mongoose');
const Comment = require('../models/comment.model');
const Reviews = require('../models/review.model');
const HOURS = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/

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
			direction: String,
			extraDirection: String,
			city: String
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
			day: [
				{
					type: String,
					enum: [ 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo' ]
				}
			],
			available: {
				type: String,
				enum: [ 'Mañana', 'Tarde', 'Todo el día' ]
			},
			checkIn: {
				type: String,
				match: [HOURS, 'Hour is invalid']
			},
			checkOut: {
				type: String,
				match: [HOURS, 'Hour is invalid']
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
			type: [ String ],
			enum: [ 'office', 'desk', 'meetingRoom' ]
		},
		quantity: {
			type: Number,
			default: 0
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
