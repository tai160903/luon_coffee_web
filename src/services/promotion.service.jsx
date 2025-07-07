import instance from "../utils/instance";

const promotionService = {
  getAllPromotion: async () => {
    try {
      const response = await instance.get("/Promotion");
      return response;
    } catch (error) {
      console.error("Error fetching all promotions:", error.message);
      return null;
    }
  },

  createPromotion: async (data) => {
    try {
      const response = await instance.post("/Promotion", data);
      return response;
    } catch (error) {
      console.error("Error creating promotion:", error.message);
      return null;
    }
  },
  updatePromotion: async (id, data) => {
    try {
      const response = await instance.put(`/Promotion/${id}`, data);
      return response;
    } catch (error) {
      console.error("Error updating promotion:", error.message);
      return null;
    }
  },
  deletePromotion: async (id) => {
    try {
      const response = await instance.delete(`/Promotion/${id}`);
      return response;
    } catch (error) {
      console.error("Error deleting promotion:", error.message);
      return null;
    }
  },
};

export default promotionService;
