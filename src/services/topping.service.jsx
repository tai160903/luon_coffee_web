import instance from "../utils/instance";

const topingService = {
  getToppings: async () => {
    try {
      const response = await instance.get("/Topping");
      return response.data;
    } catch (error) {
      console.error("Error fetching toppings:", error);
      throw error;
    }
  },
};

export default topingService;
