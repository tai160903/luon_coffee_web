import instance from "../utils/instance";

const sizeService = {
  async getSizes() {
    try {
      const response = await instance.get("/Size");
      return response.data;
    } catch (error) {
      console.error("Error fetching sizes:", error);
      throw error;
    }
  },
  createSize: async (sizeData) => {
    try {
      const response = await instance.post("/Size", sizeData);
      return response.data; // Ensure only the data is returned
    } catch (error) {
      console.error("Error creating size:", error);
      throw error;
    }
  },
  editSize: async (sizeId, sizeData) => {
    try {
      const response = await instance.put(`/Size/${sizeId}`, sizeData);
      return response.data;
    } catch (error) {
      console.error("Error editing size:", error);
      throw error;
    }
  },
  deleteSize(sizeId) {
    try {
      const response = instance.delete(`/Size/${sizeId}`);
      return response;
    } catch (error) {
      console.error("Error deleting size:", error);
      throw error;
    }
  },
};

export default sizeService;
