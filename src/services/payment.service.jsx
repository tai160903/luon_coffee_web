import instance from "../utils/instance";

const paymentService = {
  payWithWallet: async (data) => {
    try {
      const response = await instance.post("/Payment/payment-by-wallet", data);
      return response.data;
    } catch (error) {
      console.error("Error processing payment with wallet:", error.message);
      return null;
    }
  },
  payWithPayOS: async (data) => {
    try {
      const response = await instance.post("/PayOS/create-payment-url", data);
      console.log("PayOS payment URL created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error processing payment with PayOS:", error.message);
      return null;
    }
  },
};

export default paymentService;
