import instance from "../utils/instance";

const ProductService = {
  // Thêm tham số page (và pageSize nếu cần)
  async getProducts({ page = 1, categoryId } = {}) {
    try {
      let url = `/Product/filter?Page=${page}`;
      if (categoryId && categoryId !== "all") {
        url += `&CategoryId=${categoryId}`;
      }
      const response = await instance.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error.message);
      return {
        items: [],
        currentPage: 1,
        totalPages: 1,
        pageSize: 10,
        totalCount: 0,
      };
    }
  },

  async getAllProducts() {
    try {
      const response = await instance.get("/Product");
      return response.data;
    } catch (error) {
      console.error("Error fetching all products:", error.message);
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

  async createProduct(product) {
    try {
      const response = await instance.post("/Product", product);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error.message);
      return null;
    }
  },

  async updateProduct(id, product) {
    try {
      const response = await instance.put(`/Product/${id}`, product);
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error.message);
      return null;
    }
  },

  async updateAvailable(id) {
    try {
      const response = await instance.put(`/Product/Availlable/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error updating product availability:", error.message);
      return null;
    }
  },

  async deleteProduct(id) {
    try {
      const response = await instance.delete(`/Product/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error.message);
      return null;
    }
  },
};

export default ProductService;
