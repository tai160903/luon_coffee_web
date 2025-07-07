import instance from "../utils/instance";

const catagoryService = {
  getAll: async () => {
    const responsive = await instance.get("/Category");
    return responsive.data;
  },

  create: async ({ name }) => {
    // API expects { "categoryName": "string" }
    const response = await instance.post("/Category", { categoryName: name });
    return response.data;
  },

  update: async (id, { name }) => {
    const response = await instance.put(`/Category/${id}`, {
      categoryName: name,
    });
    return response.data;
  },
};

export default catagoryService;
