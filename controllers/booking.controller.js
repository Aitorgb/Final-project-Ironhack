const createError = require('http-errors');
const Booking = require('../models/booking.model');

module.exports.booking = (req, res, next ) => {
  const spaceId = req.params.id
  const {checkIn, checkOut} = req.body

  Booking.find({ space: spaceId, checkIn: {$lte: checkIn}, checkOut: {$gte: checkOut}})
  .then((bookings) => {
    if(bookings) {


    }
  })

}