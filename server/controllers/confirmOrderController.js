
const ConfirmOrder = require("../models/confirmOrderModel")

const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// Create new Order
exports.confirmOrder = catchAsyncErrors(async (req, res, next) => {
    const {
      username,
      email,
      linkedin,
      github,
      about,
      twitter,
      dp,
      autocompleteValues,
      services,
      description,
      projects,
      pdescription,
    } = req.body;
  
    const order = await ConfirmOrder.create({
      username,
      email,
      linkedin,
      github,
      about,
      twitter,
      dp,
      autocompleteValues,
      services,
      description,
      projects,
      pdescription,
      paidAt: Date.now(),
      user: req.user._id,
    });
  
    res.status(201).json({
      success: true,
      order,
    });
  });