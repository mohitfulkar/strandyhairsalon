const userModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const stylistModel = require("../models/stylistModel.js");
const appointmentModel = require("../models/appointmentModel.js");
const moment = require("moment");

const registerController = async (req, res) => {
  try {
    // Check if the email is already in use
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    // Hash the password before saving it to the
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res
      .status(201)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `register controller ${error.message}`,
    });
  }
};

const loginController = async (req, res) => {
  try {
    //find the user
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }
    //check password match
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }
    //create a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .send({ message: "Logged in successfully", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `login controller error: ${error}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

//apply stylist controller
const applyStylistController = async (req, res) => {
  try {
    const newStylist = await stylistModel({ ...req.body, status: "pending" });
    await newStylist.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-Stylist-request",
      message: `${newStylist.firstName} ${newStylist.lastName} has applied for a Stylist, please verify it`,
      data: {
        stylistId: newStylist._id,
        name: newStylist.firstName + " " + newStylist.lastName,
        onClickPath: "/admin/stylists",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Your application is sent to the Admin",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Some error occurred",
    });
  }
};

//notification controller
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seenNotification = user.seenNotification;
    const notification = user.notification;
    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "All notifications marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notifications",
      success: false,
      error,
    });
  }
};

//delete notification
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications deleted",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to delete all notifications",
      error,
    });
  }
};

//get all stylists
const getAllStylistsController = async (req, res) => {
  try {
    const stylists = await stylistModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "List of Stylists fetced successfully",
      data: stylists,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching stylists",
      error,
    });
  }
};

//book appointment
const bookAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.stylistInfo.userId });
    user.notification.push({
      type: "New-appointment-request",
      message: `You have a new Appointment request from ${req.body.userInfo.name}`,
      onClickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Booked Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error booking appointment",
      error,
    });
  }
};

//booking availability
const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
    const fromTime = moment(req.body.time, 'HH:mm')
      .subtract(1, 'hours')
      .toISOString();
    const toTime = moment(req.body.time, 'HH:mm')
      .add(1, 'hours')
      .toISOString();
    const stylistId = req.body.stylistId;
    const appointments = await appointmentModel.find({ stylistId, 
      date, 
      time:{
        $gte:fromTime,
        $lte:toTime
      } });
      if(appointments.length > 0){
        return res.status(200).send({
          message: 'The selected time is not available',
          success:true
        })
      } else {
        return res.status(200).send({
          success:true,
          message: 'The selected time is available'
        })
      }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in availability",
      error,
    });
  }
};

//user appointments
const userAppointmentsController = async(req, res) => {
  try {
    const appointments = await appointmentModel.find({userId:req.body.userId});
    res.status(200).send({
      success:true,
      message: 'User Appointments listed Successfully',
      data:appointments
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in appointments",
      error,
    });
  }
};   

module.exports = {
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
};
