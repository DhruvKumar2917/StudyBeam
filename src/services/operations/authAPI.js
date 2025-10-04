// import { toast } from "react-hot-toast"

// import { setLoading, setToken } from "../../slices/authSlice"
// import { resetCart } from "../../slices/cartSlice"
// import { setUser } from "../../slices/profileSlice"
// import { apiConnector } from "../apiConnector"
// import { endpoints } from "../apis"

// const {
//   SENDOTP_API,
//   SIGNUP_API,
//   LOGIN_API,
//   RESETPASSTOKEN_API,
//   RESETPASSWORD_API,
// } = endpoints

// export function sendOtp(email, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiConnector("POST", SENDOTP_API, {
//         email,
//         checkUserPresent: true,
//       })
//       console.log("SENDOTP API RESPONSE............", response)

//       console.log(response.data.success)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }

//       toast.success("OTP Sent Successfully")
//       navigate("/verify-email")
//     } catch (error) {
//       console.log("SENDOTP API ERROR............", error)
//       toast.error("Could Not Send OTP")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }

// export function signUp(
//   accountType,
//   firstName,
//   lastName,
//   email,
//   password,
//   confirmPassword,
//   otp,
//   navigate
// ) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiConnector("POST", SIGNUP_API, {
//         accountType,
//         firstName,
//         lastName,
//         email,
//         password,
//         confirmPassword,
//         otp,
//       })

//       console.log("SIGNUP API RESPONSE............", response)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }
//       toast.success("Signup Successful")
//       navigate("/login")
//     } catch (error) {
//       console.log("SIGNUP API ERROR............", error)
//       toast.error("Signup Failed")
//       navigate("/signup")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }

// export function login(email, password, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiConnector("POST", LOGIN_API, {
//         email,
//         password,
//       })

//       console.log("LOGIN API RESPONSE............", response)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }

//       toast.success("Login Successful")
//       dispatch(setToken(response.data.token))
//       const userImage = response.data?.user?.image
//         ? response.data.user.image
//         : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
//       dispatch(setUser({ ...response.data.user, image: userImage }))
//       localStorage.setItem("token", JSON.stringify(response.data.token))
//       navigate("/dashboard/my-profile")
//     } catch (error) {
//       console.log("LOGIN API ERROR............", error)
//       toast.error("Login Failed")
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }

// export function getPasswordResetToken(email, setEmailSent) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiConnector("POST", RESETPASSTOKEN_API, {
//         email,
//       })

//       console.log("RESETPASSTOKEN RESPONSE............", response)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }

//       toast.success("Reset Email Sent")
//       setEmailSent(true)
//     } catch (error) {
//       console.log("RESETPASSTOKEN ERROR............", error)
//       toast.error("Failed To Send Reset Email")
//     }
//     toast.dismiss(toastId)
//     dispatch(setLoading(false))
//   }
// }

// export function resetPassword(password, confirmPassword, token, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))
//     try {
//       const response = await apiConnector("POST", RESETPASSWORD_API, {
//         password,
//         confirmPassword,
//         token,
//       })

//       console.log("RESETPASSWORD RESPONSE............", response)

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }

//       toast.success("Password Reset Successfully")
//       navigate("/login")
//     } catch (error) {
//       console.log("RESETPASSWORD ERROR............", error)
//       toast.error("Failed To Reset Password")
//     }
//     toast.dismiss(toastId)
//     dispatch(setLoading(false))
//   }
// }

// export function logout(navigate) {
//   return (dispatch) => {
//     dispatch(setToken(null))
//     dispatch(setUser(null))
//     dispatch(resetCart())
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     toast.success("Logged Out")
//     navigate("/")
//   }
// }



import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

// Toast helper
const notify = {
  loading: (msg) => toast.loading(msg),
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
  dismiss: (id) => toast.dismiss(id),
};

// --------------------- ACTIONS ---------------------

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = notify.loading("Sending OTP...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SENDOTP_API, { email, checkUserPresent: true });

      if (!response.data.success) throw new Error(response.data.message);

      notify.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.error("SENDOTP ERROR:", error);
      notify.error(error.response?.data?.message || "Could Not Send OTP");
    } finally {
      dispatch(setLoading(false));
      notify.dismiss(toastId);
    }
  };
}

export function signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) {
  return async (dispatch) => {
    const toastId = notify.loading("Signing up...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      if (!response.data.success) throw new Error(response.data.message);

      notify.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.error("SIGNUP ERROR:", error);
      notify.error(error.response?.data?.message || "Signup Failed");
    } finally {
      dispatch(setLoading(false));
      notify.dismiss(toastId);
    }
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = notify.loading("Logging in...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, { email, password });

      if (!response.data.success) throw new Error(response.data.message);

      notify.success("Login Successful");
      dispatch(setToken(response.data.token));

      const user = response.data.user;
      const userImage = user?.image
        ? user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`;

      const userData = { ...user, image: userImage };
      dispatch(setUser(userData));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/dashboard/my-profile");
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      notify.error(error.response?.data?.message || "Login Failed");
    } finally {
      dispatch(setLoading(false));
      notify.dismiss(toastId);
    }
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = notify.loading("Sending reset email...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, { email });

      if (!response.data.success) throw new Error(response.data.message);

      notify.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.error("RESETPASSTOKEN ERROR:", error);
      notify.error(error.response?.data?.message || "Failed To Send Reset Email");
    } finally {
      dispatch(setLoading(false));
      notify.dismiss(toastId);
    }
  };
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = notify.loading("Resetting password...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token });

      if (!response.data.success) throw new Error(response.data.message);

      notify.success("Password Reset Successfully");
      navigate("/login");
    } catch (error) {
      console.error("RESETPASSWORD ERROR:", error);
      notify.error(error.response?.data?.message || "Failed To Reset Password");
    } finally {
      dispatch(setLoading(false));
      notify.dismiss(toastId);
    }
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    notify.success("Logged Out");
    navigate("/");
  };
}
