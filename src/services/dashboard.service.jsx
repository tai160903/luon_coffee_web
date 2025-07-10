import instance from "../utils/instance";

const dashboardService = {
  getTodayStats: async () => {
    const response = await instance.get("/dashboard/today-stats");
    return response.data;
  },
  getMonthlyStats: async (month, year) => {
    const response = await instance.get(
      `/dashboard/monthly-stats?month=${month}&year=${year}`
    );
    return response.data;
  },
};

export default dashboardService;
