const mongoose = require("mongoose")

const confirmOrderSchema = mongoose.Schema({
    username : {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email : {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    linkedin : {
        type : String,
        unique: true,
    },
    github : {
        type : String,
        unique: true,
    },
    about: {
        type : String,
        
    },
    twitter : {
        type : String,
        unique: true,
    },
    autocompleteValues :{
        type : Array
    },
    services : {
        type : String
    },
    description : {
        type : String
    },
    projects : {
        type : String,
    },
    pdescription : {
        type : String
    },
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    //     required: true,
    //   },
    
    //   totalPrice: {
    //     type: Number,
    //     required: true,
    //     default: 0,
    //   },
      orderStatus: {
        type: String,
        required: true,
        default: "Processing",
      },
      deliveredAt: Date,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    //   razorpay_payment_id1: {
    //     type: String,
    //     required:true
    //   }
     

})

const ConfirmOrder = mongoose.model("ConfirmOrder",confirmOrderSchema)

module.exports = ConfirmOrder