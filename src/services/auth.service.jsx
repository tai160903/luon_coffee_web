import instance from "../utils/instance";

const authService = {
  register: async (userData) => {
    const response = await instance.post("/User/Register", userData);
    return response.data;
  },
};

export default authService;
