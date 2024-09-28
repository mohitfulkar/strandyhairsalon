const stylistModel = require("../models/stylistModel.js");
const appointmentModel = require( "../models/appointmentModel.js" );
const userModel = require("../models/userModel.js");

const getStylistInfoController = async (req, res) => {
  try {
    const stylist = await stylistModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      data: stylist,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching details",
      error,
    });
  }
};

//update profile
const updateProfileController = async (req, res) => {
    try {
        const stylist = await stylistModel.findOneAndUpdate({userId: req.body.userId}, req.body);
        res.status(201).send({
            success:true,
            message:"Profile has been updated successfully" ,
            data : stylist,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error,
        })
    }
};

//get single stylist
const getStylistByIdController = async(req, res) => {
  try {
    const stylist = await stylistModel.findOne({_id: req.body.stylistId});
    res.status(200).send({
      success:true,
      message:"Fetched successfully",
      data : stylist,
  })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error fetching stylist',
      error,
  })
  }
};

//stylist appointments
const stylistAppointmentsController = async(req, res) => {
  try {
    const stylist = await stylistModel.findOne({userId:req.body.userId});
    const appointments = await appointmentModel.find({stylistId:stylist._id});
    res.status(200).send({
      success: true,
      message: "Appointment list fetched Successfully",
      data:appointments
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error fetching appointments',
      error,
  })
  }
};

//update appointment status
const updateStatusController = async(req, res) => {
  try {
    const {appointmentsId, status} = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId, {status});
    const user = await userModel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "status-updated",
      message: `Your appointment is ${status}`,
      onClickPath: "/stylist-appointments",
    });
    await user.save();
    res.status(200).send({
      success:true,
      message:"Appointment status updated"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error updating status',
      error,
  })
  }
};

module.exports = { getStylistInfoController, updateProfileController, getStylistByIdController, stylistAppointmentsController, updateStatusController };
