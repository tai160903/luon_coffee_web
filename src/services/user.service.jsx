import instance from "../utils/instance";

const userService = {
  getProfile: async () => {
    try {
      const response = await instance.get("/Customer/get-customer");
      return response;
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
      return null;
    }
  },
};

export default userService;
