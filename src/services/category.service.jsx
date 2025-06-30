import instance from "../utils/instance";

const catagoryService = {
  getAll: async () => {
    const responsive = await instance.get("/Category");
    return responsive.data;
  },
};

export default catagoryService;
