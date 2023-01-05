
const mongoose = require("mongoose")
require("dotenv").config()

const connectDatabase = () => {
    mongoose
      .connect("mongodb+srv://sohail:Sohail1973@cluster0.90lgz.mongodb.net/portfolio?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
      })
      .then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
      });
  };
  
  module.exports = connectDatabase;