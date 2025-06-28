import instance from "../utils/instance";

const ProductService = {
  async getProducts() {
    try {
      const response = await instance.get("/Product");
      console.log("Products fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error.message);
      return [];
    }
  },

  async getProductById(id) {
    try {
      const response = await instance.get(`/Product/${id}`);
      console.log("Product fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error.message);
      return null;
    }
  },
};

export default ProductService;
