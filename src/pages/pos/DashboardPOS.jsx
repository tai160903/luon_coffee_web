"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Coffee,
  Users,
  ShoppingBag,
  DollarSign,
  Clock,
  AlertTriangle,
  BarChart3,
  PieChart,
} from "lucide-react";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const periods = [
    { id: "today", name: "Hôm Nay" },
    { id: "week", name: "Tuần Này" },
    { id: "month", name: "Tháng Này" },
    { id: "year", name: "Năm Này" },
  ];

  const stats = {
    today: {
      revenue: 2450000,
      orders: 47,
      customers: 38,
      avgOrder: 52127,
      growth: {
        revenue: 12.5,
        orders: 8.3,
        customers: 15.2,
        avgOrder: 3.8,
      },
    },
    week: {
      revenue: 15680000,
      orders: 312,
      customers: 245,
      avgOrder: 50256,
      growth: {
        revenue: 18.7,
        orders: 12.1,
        customers: 22.4,
        avgOrder: 5.2,
      },
    },
  };

  const currentStats = stats[selectedPeriod] || stats.today;

  const topItems = [
    {
      name: "Cà Phê Phin Truyền Thống",
      sold: 28,
      revenue: 700000,
      trend: "up",
    },
    { name: "Cà Phê Đá", sold: 24, revenue: 672000, trend: "up" },
    { name: "Bánh Mì Thịt Nướng", sold: 18, revenue: 810000, trend: "down" },
    { name: "Cà Phê Trứng", sold: 15, revenue: 525000, trend: "up" },
    { name: "Gỏi Cuốn", sold: 12, revenue: 420000, trend: "stable" },
  ];

  const recentOrders = [
    {
      id: "VN001",
      time: "14:32",
      customer: "Nguyễn Văn A",
      items: 3,
      total: 125000,
      status: "completed",
    },
    {
      id: "VN002",
      time: "14:28",
      customer: "Trần Thị B",
      items: 2,
      total: 85000,
      status: "preparing",
    },
    {
      id: "VN003",
      time: "14:25",
      customer: "Lê Văn C",
      items: 1,
      total: 35000,
      status: "completed",
    },
    {
      id: "VN004",
      time: "14:20",
      customer: "Phạm Thị D",
      items: 4,
      total: 180000,
      status: "completed",
    },
  ];

  const alerts = [
    {
      type: "warning",
      message: "Cà phê Arabica sắp hết (còn 2kg)",
      time: "10 phút trước",
    },
    {
      type: "info",
      message: "Ca làm việc chiều bắt đầu lúc 14:00",
      time: "30 phút trước",
    },
    {
      type: "success",
      message: "Đạt mục tiêu doanh thu ngày",
      time: "1 giờ trước",
    },
  ];

  const hourlyData = [
    { hour: "08:00", orders: 5, revenue: 125000 },
    { hour: "09:00", orders: 8, revenue: 200000 },
    { hour: "10:00", orders: 12, revenue: 315000 },
    { hour: "11:00", orders: 15, revenue: 425000 },
    { hour: "12:00", orders: 18, revenue: 520000 },
    { hour: "13:00", orders: 22, revenue: 650000 },
    { hour: "14:00", orders: 16, revenue: 480000 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Hoàn thành";
      case "preparing":
        return "Đang chuẩn bị";
      case "pending":
        return "Chờ xử lý";
      default:
        return "Không xác định";
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-amber-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Tổng quan hoạt động kinh doanh</p>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-4 py-2 rounded-2xl font-medium transition-all duration-300 ${
                selectedPeriod === period.id
                  ? "bg-amber-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-amber-50 border border-gray-200"
              }`}
            >
              {period.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                +{currentStats.growth.revenue}%
              </span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {currentStats.revenue.toLocaleString("vi-VN")}₫
          </div>
          <div className="text-gray-600 text-sm">Doanh thu</div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                +{currentStats.growth.orders}%
              </span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {currentStats.orders}
          </div>
          <div className="text-gray-600 text-sm">Đơn hàng</div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                +{currentStats.growth.customers}%
              </span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {currentStats.customers}
          </div>
          <div className="text-gray-600 text-sm">Khách hàng</div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                +{currentStats.growth.avgOrder}%
              </span>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {currentStats.avgOrder.toLocaleString("vi-VN")}₫
          </div>
          <div className="text-gray-600 text-sm">Giá trị TB/đơn</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hourly Sales Chart */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Doanh Thu Theo Giờ
              </h3>
              <BarChart3 className="w-6 h-6 text-amber-600" />
            </div>
            <div className="space-y-4">
              {hourlyData.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 text-sm text-gray-600">{data.hour}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full"
                      style={{ width: `${(data.revenue / 650000) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-20 text-sm font-medium text-gray-800 text-right">
                    {data.revenue.toLocaleString("vi-VN")}₫
                  </div>
                  <div className="w-12 text-sm text-gray-600 text-right">
                    {data.orders}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Selling Items */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Món Bán Chạy</h3>
              <PieChart className="w-6 h-6 text-amber-600" />
            </div>
            <div className="space-y-4">
              {topItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl"
                >
                  <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
                    <span className="text-amber-700 font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <div className="text-sm text-gray-600">
                      Đã bán: {item.sold} | Doanh thu:{" "}
                      {item.revenue.toLocaleString("vi-VN")}₫
                    </div>
                  </div>
                  {getTrendIcon(item.trend)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Đơn Hàng Gần Đây
              </h3>
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl"
                >
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <span className="text-amber-700 font-bold text-xs">
                      {order.id.slice(-3)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">
                      {order.customer}
                    </div>
                    <div className="text-xs text-gray-600">
                      {order.time} • {order.items} món •{" "}
                      {order.total.toLocaleString("vi-VN")}₫
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Thông Báo</h3>
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-2xl"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === "warning"
                        ? "bg-yellow-500"
                        : alert.type === "success"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-800">{alert.message}</div>
                    <div className="text-xs text-gray-500">{alert.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Thao Tác Nhanh
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-amber-600 text-white py-3 rounded-2xl hover:bg-amber-700 transition-colors">
                Tạo Đơn Hàng Mới
              </button>
              <button className="w-full bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition-colors">
                Xem Báo Cáo
              </button>
              <button className="w-full bg-green-600 text-white py-3 rounded-2xl hover:bg-green-700 transition-colors">
                Quản Lý Kho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
