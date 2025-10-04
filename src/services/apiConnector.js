// import axios from "axios";

//  //export const axiosInstance = axios.create({});

// // export const apiConnector = (method, url, bodyData, headers, params) => {
// //   return axiosInstance({
// //     method: `${method}`,
// //     url: `${url}`,
// //     data: bodyData ? bodyData : null,
// //     headers: headers ? headers : null,
// //     params: params ? params : null,
// //   });
// // };
  

// // import axios from "axios";

// export const apiConnector = async (method, endpoint, data = null, headers = {}) => {
//   const baseURL = process.env.REACT_APP_API_BASE_URL;
//   try {
//     const response = await axios({
//       method,
//       url: `${baseURL}${endpoint}`,
//       data,
//       headers,
//     });
//     return response;
//   } catch (error) {
//     // You can throw or return the error object
//     throw error;
//   }
// };


// import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",  // ✅ ensure JSON is sent
//   },
//   withCredentials: true, // only if using cookies/JWT
// });

// export const apiConnector = async (
//   method,
//   endpoint,
//   data = null,
//   headers = {},
//   params = null
// ) => {
//   try {
//     const response = await axiosInstance({
//       method,
//       url: endpoint,
//       data: data || null,
//       headers: {
//         "Content-Type": "application/json",
//         ...headers, // merge custom headers if any
//       },
//       params: params || null,
//     });

//     return response;
//   } catch (error) {
//     if (error.response) {
//       console.error("API Error Response:", error.response);
//     } else {
//       console.error("API Error:", error.message);
//     }
//     throw error;
//   }
// };



import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://edtech-studynotion-h7zw.onrender.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT automatically if exists
axiosInstance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiConnector = async (method, endpoint, data = null, headers = {}, params = null) => {
  try {
    const response = await axiosInstance({
      method,
      url: endpoint,
      data: data || null,
      headers: { ...headers },
      params: params || null,
    });
    return response;
  } catch (error) {
    if (error.response) console.error("API Error Response:", error.response);
    else console.error("API Error:", error.message);
    throw error;
  }
};
