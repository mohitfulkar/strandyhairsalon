const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyStylistController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllStylistsController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

//routes
router.post("/login", loginController);

router.post("/register", registerController);

router.post("/getUserData", authMiddleware, authController);

router.post("/apply-Stylist", authMiddleware, applyStylistController);

router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

router.get("/getAllStylists", authMiddleware, getAllStylistsController);

router.post('/book-appointment', authMiddleware, bookAppointmentController);

router.post('/booking-availability', authMiddleware, bookingAvailabilityController);

router.get('/user-appointments', authMiddleware, userAppointmentsController);

module.exports = router;
