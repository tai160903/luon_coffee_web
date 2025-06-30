import instance from "../utils/instance";

const orderService = {
  getOrderById: async (orderId) => {
    try {
      const response = await instance.get(`/Order/get-order-by-id/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error.message);
      return null;
    }
  },
  getOrdersByCustomer: async () => {
    try {
      const response = await instance.get(`/Order/get-orders-of-customer`);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      return [];
    }
  },
};

export default orderService;
