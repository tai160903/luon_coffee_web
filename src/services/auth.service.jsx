import instance from "../utils/instance";

const authService = {
  login: async (credentials) => {
    const response = await instance.post("/User/login-customer", credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await instance.post("/User/register-customer", userData);
    return response.data;
  },
};

export default authService;
