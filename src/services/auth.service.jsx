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
    const response = await instance.post("/User/verify", {
      userName: ussername,
      code,
    });
    return response.data;
  },
  resendOTP: async (ussername) => {
    const response = await instance.post("/User/send-otp", {
      userName: ussername,
    });
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await instance.post("/User/forgot-password", {
      email,
    });
    return response.data;
  },

  resetPassword: async (token, newPassword) => {
    const response = await instance.post("/User/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  },
};

export default authService;
