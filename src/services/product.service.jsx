import instance from "../utils/instance";

const ProductService = {
  async getProducts() {
    try {
      const response = await instance.get("/Product");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error.message);
      return [];
    }
  },

  async getBestSellers() {
    try {
      const response = await instance.get("/Product/BestSeller");
      return response.data;
    } catch (error) {
      console.error("Error fetching best sellers:", error.message);
      return [];
    }
  },

  async getProductById(id) {
    try {
      const response = await instance.get(`/Product/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error.message);
      return null;
    }
  },
};

export default ProductService;
