const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllUsersController,
  getAllStylistsController,
  changeAccountStatusController,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/getAllUsers", authMiddleware, getAllUsersController);

router.get("/getAllStylists", authMiddleware, getAllStylistsController);

router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;
