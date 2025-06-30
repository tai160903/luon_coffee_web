import instance from "../utils/instance";

const orderService = {
  getAllOrders: async () => {
    try {
      const response = await instance.get(`/Order`);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      return [];
    }
  },
  getOrderById: async (orderId) => {
    try {
      const response = await instance.get(`/Order/${orderId}`);
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
  updateStatus: async (orderId, status) => {
    try {
      const response = await instance.put(`/Order/${orderId}`, { status });
      return response.data;
    } catch (error) {
      console.error("Error updating order status:", error.message);
      return null;
    }
  },
};

export default orderService;
