const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
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
    about : {
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
    dp: {
        public_id: {
          type: String,
        //   required: true,
        },
        url: {
          type: String,
        //   required: true,
        },
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      // paymentInfo: {
      //   id: {
      //     type: String,
      //     required: true,
      //   },
      //   status: {
      //     type: String,
      //     required: true,
      //   },
      // },
      paidAt: {
        type: Date,
        required: true,
      },
      itemsPrice: {
        type: Number,
        required: true,
        default: 0,
      },
      totalPrice: {
        type: Number,
        required: true,
        default: 0,
      },
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

})

const Order = mongoose.model("Order",orderSchema)

module.exports = Order