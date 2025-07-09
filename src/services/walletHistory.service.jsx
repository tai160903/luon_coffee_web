import instance from "../utils/instance";

const walletHistoryService = {
  getWalletHistory: async () => {
    try {
      const response = await instance.get(`/walletHistory/get-by-customer`);
      return response;
    } catch (error) {
      console.error("Error fetching wallet history:", error);
      throw error;
    }
  },
};

export default walletHistoryService;
