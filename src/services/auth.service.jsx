import instance from "../utils/instance";

const authService = {
  register: async (userData) => {
    const response = await instance.post("/User/register-customer", userData);
    return response.data;
  },
};

export default authService;
