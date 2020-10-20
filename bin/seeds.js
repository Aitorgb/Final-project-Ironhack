require('../config/db.config');

const User = require('../models/user.model');
const Space = require('../models/space.model');
const Comment = require('../models/comment.model');
const Review = require('../models/review.model');

const imageCoworking = [
	[
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129792/Modulo%203/1/04-2_oaktpz.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129792/Modulo%203/1/06_1_r8lh8g.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129792/Modulo%203/1/mg5617-hdrlr_mds2xn.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129792/Modulo%203/1/01barbaja_aue4n6.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129791/Modulo%203/1/05-2_rmelxg.jpg'
	],
	[
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129796/Modulo%203/2/utopicuscolegiata16_ppzm0y.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129794/Modulo%203/2/utopicuscolegiata7_mybol1.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129793/Modulo%203/2/utopicuscolegiata14_k2iogc.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129792/Modulo%203/2/utopicuscolegiata8_xtktcu.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129792/Modulo%203/2/merlin-twisttt-051_tbpvkc.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129792/Modulo%203/2/utopicuscolegiata9_m9vyhy.jpg'
	],
	[
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129793/Modulo%203/3/merlin-twisttt-034_t7zb7l.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129793/Modulo%203/3/merlin-twisttt-023_psxly5.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129793/Modulo%203/3/merlin-twisttt-025_g9wjch.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129793/Modulo%203/3/merlin-twisttt-009_fmd1i7.jpg'
	],
	[
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129794/Modulo%203/4/ag5_vzeep5.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129794/Modulo%203/4/img7760copy_gpccys.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129794/Modulo%203/4/img7751copy_i6ci5e.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129794/Modulo%203/4/img7744copy_q9sarh.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129794/Modulo%203/4/img7746copy_o20j03.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129794/Modulo%203/4/img7759copy_pku0yd.jpg'
	],
	[
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129795/Modulo%203/5/workspace_0_jbyavt.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129795/Modulo%203/5/ag5_lc1usr.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129795/Modulo%203/5/meetingrooms_hawr3g.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129795/Modulo%203/5/terraza_1_pgbs7o.jpg'
	],
	[
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129613/Modulo%203/1594806744_coolwork.es_WeWork_CalleEloyGonzalo27_Madrid_coworking_05_bj5qdu.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129613/Modulo%203/1594806744_coolwork.es_WeWork_CalleEloyGonzalo27_Madrid_coworking_03_wczaay.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129613/Modulo%203/1594806744_coolwork.es_WeWork_CalleEloyGonzalo27_Madrid_coworking_05_bj5qdu.jpg'
	],
	[
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129613/Modulo%203/1598440375_Spaces_Jose_Abascal_www.CoolWork.es_04_x1o5eg.png',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129613/Modulo%203/1598440375_Spaces_Jose_Abascal_www.CoolWork.es_coworking_madrid_01_hu9few.png',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129613/Modulo%203/1598440375_Spaces_Jose_Abascal_www.CoolWork.es_coworking_madrid_03_bsqklv.png'
	],
	[
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129613/Modulo%203/Manoteras-18-1536x712_s0zdva.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129615/Modulo%203/Manoteras-2-1536x712_ta4zrf.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129615/Modulo%203/Manoteras-3-1536x712_eiyvom.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129615/Modulo%203/Manoteras-4-1536x712_wkryef.jpg'
	],
	[
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129613/Modulo%203/Manoteras-5-1536x712_vltfbu.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129612/Modulo%203/Manoteras-6-1536x712_graghn.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129613/Modulo%203/Manoteras-7-1536x712_kf2mqb.jpg'
	],
	[
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129614/Modulo%203/cink_castellana_10_uycqbc.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129614/Modulo%203/cink_castellana_1_blcnph.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129617/Modulo%203/cink_castellana_2_jldr4y.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129614/Modulo%203/cink_castellana_3_hxxgrh.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129614/Modulo%203/cink_castellana_4_dadlc7.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129615/Modulo%203/cink_castellana_5_enucbc.jpg'
	],
	[
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129615/Modulo%203/cink_castellana_6_eglljl.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129615/Modulo%203/cink_castellana_7_umhk1f.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129615/Modulo%203/cink_castellana_8_kox8l8.jpg',
		'https://res.cloudinary.com/dpzqosy5b/image/upload/v1603129614/Modulo%203/cink_castellana_9_cc3oyc.jpg'
	]
];

const randomNumber = () => Math.floor(Math.random() * 5);
const time = [ 'hour', 'day', 'month', 'year' ];
const services = [
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
	'Proyector',
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
];

const faker = require('faker');
const Booking = require('../models/booking.model');
const { fake } = require('faker');

const userIds = [];

Promise.all([ User.deleteMany(), Space.deleteMany(), Comment.deleteMany(), Review.deleteMany() ]).then(() => {
	for (let i = 0; i < 20; i++) {
		const user = new User({
			name: faker.name.findName(),
			email: faker.internet.email(),
			password: '123123123',
			avatar: faker.image.avatar(),
			nif: '03934546L',
			createdAt: faker.date.past()
		});
		user.activation.active = true;

		user
			.save()
			.then((user) => {
				console.log(user.email);
        userIds.push(user._id);
        

				for (let j = 0; j < 11; j++) {
					const space = new Space({
						user: user._id,
						title: faker.name.title(),
						description: faker.lorem.paragraph(),
						location: {
							coordinates: [ faker.address.latitude(), faker.address.longitude() ],
							direction: faker.address.city(0)
						},
						image: imageCoworking[j],
						type: {
							office: {
								quantity: randomNumber(),
								price: randomNumber() * 20,
								duration: time[randomNumber()],
								capacity: randomNumber() * 5
							},
							desk: {
								quantity: randomNumber(),
								price: randomNumber() * 5,
								duration: time[randomNumber()],
								capacity: 2
							},
							meetingRoom: {
								quantity: randomNumber(),
								price: randomNumber() * 10,
								duration: time[randomNumber()],
								capacity: randomNumber()
							}
						},
						services: services
							.sort(() => Math.random() - Math.random())
							.slice(0, randomNumber() * 5),
						createdAt: faker.date.past()
					});
					console.log(space);

					space
						.save()
						.then((space) => {
							for (let k = 0; k < 10; k++) {
								const c = new Comment({
									user: userIds[Math.floor(Math.random() * userIds.length)],
									space: space._id,
									text: faker.lorem.paragraph(),
									createdAt: faker.date.past()
								});

								const booking = new Booking({
									owner: userIds[Math.floor(Math.random() * userIds.length)],
									user: userIds[Math.floor(Math.random() * userIds.length)],
									space: space._id,
									checkIn: faker.date.recent(),
									checkOut: faker.date.recent(randomNumber() * -1),
									type: {
										office: {
											quantity: Math.floor(space.type.office.quantity * Math.random())
										},
										desk: {
											quantity: Math.floor(space.type.desk.quantity * Math.random())
										},
										meetingRoom: {
											quantity: Math.floor(space.type.meetingRoom.quantity * Math.random())
										}
									}
								});
								const bookingType = booking.type;

								bookingType.office.price = bookingType.office.quantity * space.type.office.price;
								bookingType.desk.price = bookingType.desk.quantity * space.type.desk.price;
								bookingType.meetingRoom.price = bookingType.meetingRoom.quantity * space.type.meetingRoom.price;
						
								booking.save();
								c.save();
							}
						})
						.catch(console.error);
				}
			})
			.catch(console.error);
	}
});
