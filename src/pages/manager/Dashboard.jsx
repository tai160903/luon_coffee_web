"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  ShoppingCart,
  Users,
  Coffee,
  TrendingUp,
  Calendar,
  Clock,
  DollarSign,
  Loader2,
} from "lucide-react";
import dashboardService from "../../services/dashboard.service";
import formatCurrency from "../../utils/formatCurrency";

const ManagerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    monthlyOrders: 0,
  });

  useEffect(() => {
    const fetchAllStats = async () => {
      setLoading(true);
      try {
        // Fetch today's stats
        const todayResponse = await dashboardService.getTodayStats();

        // Fetch monthly stats
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const monthlyResponse = await dashboardService.getMonthlyStats(
          month,
          year
        );

        setStats({
          totalOrders: todayResponse.data.totalOrders || 0,
          totalRevenue: todayResponse.data.totalRevenue || 0,
          monthlyRevenue: monthlyResponse?.data?.totalRevenue || 0,
          monthlyOrders: monthlyResponse?.data?.totalOrders || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats({
          totalOrders: 0,
          totalRevenue: 0,
          monthlyRevenue: 0,
          monthlyOrders: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, []);

  const statsCards = [
    {
      title: "Đơn Hàng Hôm Nay",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      format: "number",
    },
    {
      title: "Doanh Thu Hôm Nay",
      value: stats.totalRevenue,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      format: "currency",
    },
    {
      title: "Doanh Thu Tháng Này",
      value: stats.monthlyRevenue,
      icon: BarChart3,
      color: "text-teal-600",
      bgColor: "bg-teal-100",
      format: "currency",
    },
    {
      title: "Đơn Hàng Tháng Này",
      value: stats.monthlyOrders,
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      format: "number",
    },
  ];

  const formatValue = (value, format) => {
    if (format === "currency") {
      return formatCurrency(value);
    }
    return value?.toLocaleString("vi-VN") || "0";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-amber-600 animate-spin mb-4" />
          <div className="text-lg text-amber-700 font-semibold">
            Đang tải dữ liệu...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Hệ Thống Quản Lý
              </h1>
              <p className="text-gray-600">
                Chào mừng bạn đến với bảng điều khiển quản lý
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{new Date().toLocaleString("vi-VN")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Hôm nay</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${card.bgColor} rounded-2xl flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {formatValue(card.value, card.format)}
                </div>
                <div className="text-gray-600 text-sm">{card.title}</div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Truy Cập Nhanh
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/manager/orders"
              className="flex flex-col items-center p-4 rounded-2xl border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-colors group"
            >
              <ShoppingCart className="w-8 h-8 text-gray-600 group-hover:text-amber-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-amber-700">
                Đơn Hàng
              </span>
            </a>
            <a
              href="/manager/products"
              className="flex flex-col items-center p-4 rounded-2xl border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-colors group"
            >
              <Coffee className="w-8 h-8 text-gray-600 group-hover:text-amber-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-amber-700">
                Sản Phẩm
              </span>
            </a>
            <a
              href="/manager/customers"
              className="flex flex-col items-center p-4 rounded-2xl border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-colors group"
            >
              <Users className="w-8 h-8 text-gray-600 group-hover:text-amber-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-amber-700">
                Khách Hàng
              </span>
            </a>
            <a
              href="/manager/promotions"
              className="flex flex-col items-center p-4 rounded-2xl border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-colors group"
            >
              <TrendingUp className="w-8 h-8 text-gray-600 group-hover:text-amber-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-amber-700">
                Khuyến Mãi
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
