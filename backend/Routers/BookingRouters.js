const { createBooking } = require("../Controllers/BookingController/createBooking");

const router = require("express").Router();

router.post("/", createBooking);

module.exports = router;
