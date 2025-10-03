// // import { toast } from "react-hot-toast"

// // import rzpLogo from "../../assets/Logo/rzp_logo.png"
// // import { resetCart } from "../../slices/cartSlice"
// // import { setPaymentLoading } from "../../slices/courseSlice"
// // import { apiConnector } from "../apiConnector"
// // import { studentEndpoints } from "../apis"

// // const {
// //   COURSE_PAYMENT_API,
// //   COURSE_VERIFY_API,
// //   SEND_PAYMENT_SUCCESS_EMAIL_API,
// // } = studentEndpoints

// // // Load the Razorpay SDK from the CDN
// // function loadScript(src) {
// //   return new Promise((resolve) => {
// //     const script = document.createElement("script")
// //     script.src = src
// //     script.onload = () => {
// //       resolve(true)
// //     }
// //     script.onerror = () => {
// //       resolve(false)
// //     }
// //     document.body.appendChild(script)
// //   })
// // }

// // // Buy the Course
// // export async function BuyCourse(
// //   token,
// //   courses,
// //   user_details,
// //   navigate,
// //   dispatch
// // ) {
// //   const toastId = toast.loading("Loading...")
// //   try {
// //     // Loading the script of Razorpay SDK
// //     const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

// //     if (!res) {
// //       toast.error(
// //         "Razorpay SDK failed to load. Check your Internet Connection."
// //       )
// //       return
// //     }

// //     // Initiating the Order in Backend
// //     const orderResponse = await apiConnector(
// //       "POST",
// //       COURSE_PAYMENT_API,
// //       {
// //         courses,
// //       },
// //       {
// //         Authorization: `Bearer ${token}`,
// //       }
// //     )

// //     if (!orderResponse.data.success) {
// //       throw new Error(orderResponse.data.message)
// //     }
// //     console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data)

// //     // Opening the Razorpay SDK
// //     const options = {
// //       key: process.env.RAZORPAY_KEY,
// //       currency: orderResponse.data.data.currency,
// //       amount: `${orderResponse.data.data.amount}`,
// //       order_id: orderResponse.data.data.id,
// //       name: "studynotion",
// //       description: "Thank you for Purchasing the Course.",
// //       image: rzpLogo,
// //       prefill: {
// //         name: `${user_details.firstName} ${user_details.lastName}`,
// //         email: user_details.email,
// //       },
// //       handler: function (response) {
// //         sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
// //         verifyPayment({ ...response, courses }, token, navigate, dispatch)
// //       },
// //     }
// //     const paymentObject = new window.Razorpay(options)

// //     paymentObject.open()
// //     paymentObject.on("payment.failed", function (response) {
// //       toast.error("Oops! Payment Failed.")
// //       console.log(response.error)
// //     })
// //   } catch (error) {
// //     console.log("PAYMENT API ERROR............", error)
// //     toast.error("Could Not make Payment.")
// //   }
// //   toast.dismiss(toastId)
// // }

// // // Verify the Payment
// // async function verifyPayment(bodyData, token, navigate, dispatch) {
// //   const toastId = toast.loading("Verifying Payment...")
// //   dispatch(setPaymentLoading(true))
// //   try {
// //     const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
// //       Authorization: `Bearer ${token}`,
// //     })

// //     console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)

// //     if (!response.data.success) {
// //       throw new Error(response.data.message)
// //     }

// //     toast.success("Payment Successful. You are Added to the course ")
// //     navigate("/dashboard/enrolled-courses")
// //     dispatch(resetCart())
// //   } catch (error) {
// //     console.log("PAYMENT VERIFY ERROR............", error)
// //     toast.error("Could Not Verify Payment.")
// //   }
// //   toast.dismiss(toastId)
// //   dispatch(setPaymentLoading(false))
// // }

// // // Send the Payment Success Email
// // async function sendPaymentSuccessEmail(response, amount, token) {
// //   try {
// //     await apiConnector(
// //       "POST",
// //       SEND_PAYMENT_SUCCESS_EMAIL_API,
// //       {
// //         orderId: response.razorpay_order_id,
// //         paymentId: response.razorpay_payment_id,
// //         amount,
// //       },
// //       {
// //         Authorization: `Bearer ${token}`,
// //       }
// //     )
// //   } catch (error) {
// //     console.log("PAYMENT SUCCESS EMAIL ERROR............", error)
// //   }
// // }


// import { toast } from "react-hot-toast";
// import rzpLogo from "../../assets/Logo/rzp_logo.png";
// import { resetCart } from "../../slices/cartSlice";
// import { setPaymentLoading } from "../../slices/courseSlice";
// import { apiConnector } from "../apiConnector";
// import { studentEndpoints } from "../apis";

// const {
//   COURSE_PAYMENT_API,
//   COURSE_VERIFY_API,
//   SEND_PAYMENT_SUCCESS_EMAIL_API,
// } = studentEndpoints;

// function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// }

// export async function BuyCourse(
//   token,
//   courses,     // e.g. array of course IDs or objects expected by backend
//   user_details,
//   navigate,
//   dispatch
// ) {
//   const toastId = toast.loading("Initializing payment...");
//   try {
//     const sdkLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
//     if (!sdkLoaded) {
//       toast.error("Razorpay SDK failed to load. Please check your internet connection.");
//       return;
//     }

//     // Create order via backend
//     const orderResponse = await apiConnector(
//       "POST",
//       COURSE_PAYMENT_API,
//       { courses },
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     );

//     if (!orderResponse.data.success) {
//       throw new Error(orderResponse.data.message || "Failed to create order");
//     }

//     const { id: order_id, amount, currency } = orderResponse.data.data;

//     // Razorpay options
//     const options = {
//       key: process.env.RAZORPAY_KEY_ID,
//       amount: amount,     // in paise / smallest unit
//       currency: currency,
//       order_id: order_id,
//       name: "Your App Name",
//       description: "Course Purchase",
//       image: rzpLogo,
//       prefill: {
//         name: `${user_details.firstName} ${user_details.lastName}`,
//         email: user_details.email,
//       },
//       handler: function (response) {
//         // This is called after successful payment
//         verifyPayment({ ...response, courses }, token, navigate, dispatch, amount);
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);

//     paymentObject.open();

//     paymentObject.on("payment.failed", function (response) {
//       toast.error("Payment failed. Please try again.");
//       console.error("Payment failed:", response.error);
//     });

//   } catch (error) {
//     console.error("PAYMENT API ERROR:", error);
//     toast.error(error.response?.data?.message || error.message || "Payment failed");
//   } finally {
//     toast.dismiss(toastId);
//   }
// }

// async function verifyPayment(bodyData, token, navigate, dispatch, amount) {
//   const toastId = toast.loading("Verifying payment...");
//   dispatch(setPaymentLoading(true));
//   try {
//     const response = await apiConnector(
//       "POST",
//       COURSE_VERIFY_API,
//       bodyData,
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     );

//     if (!response.data.success) {
//       throw new Error(response.data.message || "Payment verification failed");
//     }

//     toast.success("Payment successful!");
//     // Maybe send confirmation email
//     await sendPaymentSuccessEmail(bodyData, amount, token);
//     dispatch(resetCart());  // clear cart
//     navigate("/dashboard/enrolled-courses");
//   } catch (error) {
//     console.error("VERIFY PAYMENT ERROR:", error);
//     toast.error(error.response?.data?.message || error.message || "Verification failed");
//   } finally {
//     toast.dismiss(toastId);
//     dispatch(setPaymentLoading(false));
//   }
// }

// async function sendPaymentSuccessEmail(bodyData, amount, token) {
//   try {
//     await apiConnector(
//       "POST",
//       SEND_PAYMENT_SUCCESS_EMAIL_API,
//       {
//         orderId: bodyData.razorpay_order_id,
//         paymentId: bodyData.razorpay_payment_id,
//         amount,
//       },
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     );
//   } catch (error) {
//     console.error("SEND EMAIL ERROR:", error);
//   }
// }


import { toast } from "react-hot-toast";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";
import { apiConnector } from "../apiConnector";
import { studentEndpoints } from "../apis";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

// Load Razorpay SDK
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// Buy a course using Razorpay
export async function BuyCourse(token, courses, user_details, navigate, dispatch) {
  const toastId = toast.loading("Initializing payment...");

  try {
    const sdkLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!sdkLoaded) {
      toast.error("Razorpay SDK failed to load. Please check your internet connection.");
      return;
    }

    // Create order on backend
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message || "Failed to create order");
    }

    const { id: order_id, amount, currency } = orderResponse.data.data;

    // Razorpay payment options
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Public key from .env
      amount: amount,
      currency: currency,
      order_id: order_id,
      name: "studynotion",
      description: "Thank you for purchasing the course!",
      image: rzpLogo,
      prefill: {
        name: `${user_details.firstName} ${user_details.lastName}`,
        email: user_details.email,
      },
      handler: function (response) {
        verifyPayment({ ...response, courses }, token, navigate, dispatch, amount);
      },
      theme: {
        color: "#47A5C5",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      toast.error("Payment failed. Please try again.");
      console.error("Razorpay payment failed:", response.error);
    });

  } catch (error) {
    console.error("PAYMENT API ERROR:", error);
    toast.error(error?.response?.data?.message || error.message || "Payment error occurred.");
  } finally {
    toast.dismiss(toastId);
  }
}

// Verify Razorpay payment
async function verifyPayment(bodyData, token, navigate, dispatch, amount) {
  const toastId = toast.loading("Verifying payment...");
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector(
      "POST",
      COURSE_VERIFY_API,
      bodyData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Payment verification failed");
    }

    toast.success("Payment successful! You are enrolled.");
    await sendPaymentSuccessEmail(bodyData, amount, token);
    dispatch(resetCart());
    navigate("/dashboard/enrolled-courses");

  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);
    toast.error(error?.response?.data?.message || error.message || "Verification failed.");
  } finally {
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
  }
}

// Send confirmation email after success
async function sendPaymentSuccessEmail(bodyData, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: bodyData.razorpay_order_id,
        paymentId: bodyData.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.error("SEND EMAIL ERROR:", error);
  }
}
