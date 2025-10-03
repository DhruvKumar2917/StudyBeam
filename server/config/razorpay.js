// const Razorpay = require("razorpay");
// require("dotenv").config();

// console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
// console.log("Razorpay Secret:", process.env.RAZORPAY_KEY_SECRET);


// const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// module.exports = instance;
// config/razorpay.js
const Razorpay = require("razorpay");
require("dotenv").config();

 console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("Razorpay Secret:", process.env.RAZORPAY_KEY_SECRET);

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

module.exports = { instance };
