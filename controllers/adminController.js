const stylistModel = require("../models/stylistModel.js");
const userModel = require("../models/userModel.js");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "Users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching users",
      error,
    });
  }
};

const getAllStylistsController = async (req, res) => {
  try {
    const stylists = await stylistModel.find({});
    res.status(200).send({
      success: true,
      message: "Stylists datalist",
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

//stylist account status controller
const changeAccountStatusController = async(req, res) => {
    try {
        const {stylistId, status} = req.body;
        const stylist = await stylistModel.findByIdAndUpdate(stylistId, {status});
        const user = await userModel.findOne({_id:stylist.userId});
        const notification = user.notification;
        notification.push({
            type: 'stylist-account-request-updated',
            message: `Your stylist request is ${status}`,
            onClickPath:'/notification'
        });
        user.isStylist = status === 'approved' ? true : false;
        await user.save();
        res.status(201).send({
            success:true,
            message:"Account Status has been changed successfully",
            data:stylist,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Internal server error",
            error
        })
    }
};

module.exports = {
  getAllUsersController,
  getAllStylistsController,
  changeAccountStatusController,
};
