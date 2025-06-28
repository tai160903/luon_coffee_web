import instance from "../utils/instance";

const sizeService = {
  async getSizes() {
    try {
      const response = await instance.get("/Size");
      console.log("Sizes fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching sizes:", error);
      throw error;
    }
  },
};

export default sizeService;
