import instance from "../utils/instance";

const authService = {
  login: async (username, password) => {
    const response = await instance.post("/User/login", {
      username,
      password,
    });
    return response;
  },

  register: async (userData) => {
    const response = await instance.post("/User/register-customer", userData);
    return response.data;
  },
  verifyOTP: async (ussername, code) => {
    const response = await instance.post("/User/verify", { ussername, code });
    return response.data;
  },
  // resendOTP: async () => {
  //   const response = await instance.post("/User/send-otp", {});
  //   return response.data;
  // },
};

export default authService;
