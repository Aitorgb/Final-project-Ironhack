const { date } = require('faker');
const createError = require('http-errors');
const Booking = require('../models/booking.model');

module.exports.booking = (req, res, next ) => {
  const spaceId = req.params.id

  Booking.find(spaceId)
  .then((bookings) => {
    if(!bookings) {
      next(res.status(204, 'No Content').json())
    } else {
      res.status(200).json(bookings)
    }
  })
}

module.export.createBooking = (req, res, next) => {
  const spaceId = req.params.id
  const booked = req.body
  const dateNow = new date.now()


  Booking.find({ space: spaceId, dates: {$ne: booked}})
  .then((bookings) => {
    if (!bookings) {
      const newBooking = new Booking(booking)
      newBooking.save()
        .then((booking) => res.status(200).json(booking))
        .catch((e) => createError(400, e))
    } else {
      res.status(400).json({
        messageError: 'The reservation could not be created'
      })
    }
  })
  .catch((error) => next(error))



}

