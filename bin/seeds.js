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
const spaceType = ['office', 'desk', 'meetingRoom']
const scheduleDay = [ 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo' ]
const shift = [ 'Mañana', 'Tarde', 'Todo el día' ]

const randomNumber = () => Math.floor(Math.random() * 5);

function getRandomDay(arr, n) {
	var result = new Array(n),
			len = arr.length,
			taken = new Array(len);
	if (n > len)
			throw new RangeError("getRandom: more elements taken than available");
	while (n--) {
			var x = Math.floor(Math.random() * len);
			result[n] = arr[x in taken ? taken[x] : x];
			taken[x] = --len in taken ? taken[len] : len;
	}
	return result;
}
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
			name: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			password: '123123123',
			number: '616790551',
			avatar: faker.image.avatar(),
			createdAt: faker.date.past(),
			razonSocial: faker.company.companyName(),
			nif: `B-${faker.random.number(9999999)}`,
			direccion: faker.address.streetAddress("###"),
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
							direction: faker.address.streetAddress("###"),
							city: faker.address.city()
						},
						image: imageCoworking[j],
						number: '687463663',
						price: randomNumber() * 20 + 30,
						quantity: randomNumber() * 5,
						type: spaceType[Math.floor(Math.random()*spaceType.length)],
						services: services
							.sort(() => Math.random() - Math.random())
							.slice(0, randomNumber() * 5),
						createdAt: faker.date.past(),
						schedule: {
							day:  getRandomDay(scheduleDay, randomNumber()),
							available: shift[Math.floor(Math.random()*shift.length)],
							checkIn: '09:00',
							checkOut: '20:00',
						}
					});
				

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
								c.save();
							}
						})
						.catch(console.error);
				}
			})
			.catch(console.error);
	}
});
