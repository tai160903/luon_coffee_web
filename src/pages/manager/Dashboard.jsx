"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  ShoppingCart,
  Users,
  Package,
  Settings,
  FileText,
  Coffee,
  UserCheck,
  TrendingUp,
  Calendar,
  Clock,
  DollarSign,
} from "lucide-react";
import dashboardService from "../../services/dashboard.service";

const ManagerDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
  });

  const menuItems = [
    {
      id: "overview",
      name: "Tổng Quan",
      icon: BarChart3,
      description: "Dashboard và thống kê tổng quan",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "orders",
      name: "Quản Lý Đơn Hàng",
      icon: ShoppingCart,
      description: "Theo dõi và xử lý đơn hàng",
      color: "from-green-500 to-green-600",
    },
    {
      id: "menu",
      name: "Quản Lý Thực Đơn",
      icon: Coffee,
      description: "Thêm, sửa, xóa món ăn và đồ uống",
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "customers",
      name: "Quản Lý Khách Hàng",
      icon: Users,
      description: "Theo dõi và chăm sóc khách hàng",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "staff",
      name: "Quản Lý Nhân Viên",
      icon: UserCheck,
      description: "Quản lý đội ngũ nhân viên",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      id: "inventory",
      name: "Quản Lý Kho",
      icon: Package,
      description: "Theo dõi và quản lý tồn kho",
      color: "from-red-500 to-red-600",
    },
    {
      id: "reports",
      name: "Báo Cáo",
      icon: FileText,
      description: "Báo cáo doanh thu và thống kê",
      color: "from-teal-500 to-teal-600",
    },
    {
      id: "settings",
      name: "Cài Đặt",
      icon: Settings,
      description: "Cấu hình hệ thống",
      color: "from-gray-500 to-gray-600",
    },
  ];

  const quickStats = [
    {
      title: "Doanh Thu Hôm Nay",
      value: "2,450,000₫",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Đơn Hàng Hôm Nay",
      value: "87",
      change: "+8.2%",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Khách Hàng Mới",
      value: "12",
      change: "+15.3%",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Hiệu Suất",
      value: "94%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "order",
      message: "Đơn hàng #1234 đã được hoàn thành",
      time: "5 phút trước",
      icon: ShoppingCart,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "customer",
      message: "Khách hàng mới Nguyễn Văn An đã đăng ký",
      time: "10 phút trước",
      icon: Users,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "inventory",
      message: "Cà phê Arabica sắp hết hàng",
      time: "15 phút trước",
      icon: Package,
      color: "text-red-600",
    },
    {
      id: 4,
      type: "staff",
      message: "Nhân viên Trần Thị B đã check-in",
      time: "30 phút trước",
      icon: UserCheck,
      color: "text-purple-600",
    },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardService.getTodayStats();
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchMonthlyStats = async () => {
      try {
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const response = await dashboardService.getMonthlyStats(month, year);
        setStats((prevStats) => ({
          ...prevStats,
          monthlyRevenue: response?.data?.totalRevenue,
          monthlyOrders: response?.data?.totalOrders,
        }));
      } catch (error) {
        console.error("Error fetching monthly stats:", error);
      }
    };

    fetchMonthlyStats();
  }, []);

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

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {stats.totalOrders}
            </div>
            <div className="text-gray-600 text-sm">Đơn Hàng Hôm Nay</div>
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {stats.totalRevenue.toLocaleString("vi-VN")}₫
            </div>
            <div className="text-gray-600 text-sm">Doanh Thu Hôm Nay</div>
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-teal-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {stats.monthlyRevenue?.toLocaleString("vi-VN")}₫
            </div>
            <div className="text-gray-600 text-sm">Doanh Thu Tháng Này</div>
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">
              {stats.monthlyOrders}
            </div>
            <div className="text-gray-600 text-sm">Đơn Hàng Tháng Này</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
