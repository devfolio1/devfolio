const instance = require("../index");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const Payment = require("../models/paymentModel");
const sendEmail = require("../utils/sendEmail");
const confirmOrder = require("../models/confirmOrderModel");

var arr = []

const checkout = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });

    const options = {
      amount: Number(req.body.amount * 100), // amount in smallest currency unit
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const paymentVerification = async (req, res) => {
  const {
    
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here
    arr.push( razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,)
    

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    

    console.log(arr)

    
      
      const username = arr[0]
   const email = arr[1]
   const  linkedin = arr[2]
   const  github = arr[3]
   const  about = arr[4]
   const twitter = arr[5]
   const dp = arr[6]
   const  services = arr[7]
    const autocompleteValues = arr[8]
   const projects = arr[9]
  const razorpay_order_id1 = arr[10]
  const    razorpay_payment_id1 = arr[11]
   const  razorpay_signature1 = arr[12]
      
   const obj = {
    username,
    email,
    linkedin,
    github,
    about,
    twitter,
    dp,
    services,
    autocompleteValues,
    projects,
    paidAt: Date.now(),
    
    
    razorpay_payment_id1,
    
   } 

    await confirmOrder.create(obj)

   
  const message = `we will get back to you with a sharable link for your portfolio in 1-2 days, if there is any delay in delivery please reply to this mail, Your payment id is :${razorpay_payment_id}`;
   
    
  try {
    await sendEmail({
      email,
      subject: `Welcome to Devfolio `,
      message,
    });
  
   
  } catch (error) {
    alert(error)
  }
      
    

    res.redirect(
      `/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

const confirmDetails = async(req,res)=>{

  const {
    username,
    email,
    linkedin,
    github,
    about,
    twitter,
    dp,
    services,
    autocompleteValues,
    projects,

    
  } = req.body;

  arr.push(   username,
    email,
    linkedin,
    github,
    about,
    twitter,
    dp,
    services,
    autocompleteValues,
    projects,)

  // const Orderdetails = {
  //   username,
  //   email,
  //   linkedin,
  //   github,
  //   about,
  //   twitter,
  //   dp,
  //   services,

  //   projects,
  // };
  // console.log(Orderdetails)
  // sendDetails(Orderdetails)
  // await confirmOrder.create(Orderdetails);

}

// const sendDetails=(Orderdetails)=>{
//   console.log(Orderdetails)
// }


module.exports = { checkout, paymentVerification, confirmDetails };
