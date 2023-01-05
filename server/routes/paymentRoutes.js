require("dotenv").config({ path: "server/.env" });
const express = require("express");


const {checkout, paymentVerification, confirmDetails} = require("../controllers/paymentController");

const router = express.Router();

router.route("/checkout").post(checkout);
router.route("/paymentverification").post(paymentVerification);
router.route("/confirmdetails").post(confirmDetails)




module.exports = router;
