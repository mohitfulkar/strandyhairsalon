const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getStylistInfoController,
  updateProfileController,
  getStylistByIdController,
  stylistAppointmentsController,
  updateStatusController,
} = require("../controllers/stylistController");

const router = express.Router();

router.post("/getStylistInfo", authMiddleware, getStylistInfoController);

router.post("/updateProfile", authMiddleware, updateProfileController);

router.post("/getStylistById", authMiddleware, getStylistByIdController);

router.get(
  "/stylist-appointments",
  authMiddleware,
  stylistAppointmentsController
);

router.post('/update-status', authMiddleware, updateStatusController);

module.exports = router;
