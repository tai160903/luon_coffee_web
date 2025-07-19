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
  getToppingById: async (id) => {
    try {
      const response = await instance.get(`/Topping/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching topping with id ${id}:`, error);
      throw error;
    }
  },
  createTopping: async (toppingData) => {
    try {
      const response = await instance.post("/Topping", toppingData);
      return response.data;
    } catch (error) {
      console.error("Error creating topping:", error);
      throw error;
    }
  },
  updateTopping: async (id, toppingData) => {
    try {
      const response = await instance.put(`/Topping/${id}`, toppingData);
      return response.data;
    } catch (error) {
      console.error(`Error updating topping with id ${id}:`, error);
      throw error;
    }
  },
  deleteTopping: async (id) => {
    try {
      const response = await instance.delete(`/Topping/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting topping with id ${id}:`, error);
      throw error;
    }
  },
};

export default topingService;
