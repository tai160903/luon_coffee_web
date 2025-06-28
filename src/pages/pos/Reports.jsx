"use client";

import { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Coffee,
  BarChart3,
  PieChart,
  Download,
  RefreshCw,
} from "lucide-react";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [selectedReport, setSelectedReport] = useState("overview");

  const periods = [
    { id: "today", name: "Hôm Nay" },
    { id: "yesterday", name: "Hôm Qua" },
    { id: "week", name: "Tuần Này" },
    { id: "month", name: "Tháng Này" },
    { id: "quarter", name: "Quý Này" },
    { id: "year", name: "Năm Này" },
  ];

  const reportTypes = [
    { id: "overview", name: "Tổng Quan", icon: BarChart3 },
    { id: "sales", name: "Doanh Thu", icon: DollarSign },
    { id: "products", name: "Sản Phẩm", icon: Coffee },
    { id: "customers", name: "Khách Hàng", icon: Users },
  ];

  const overviewStats = {
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
    month: {
      revenue: 68500000,
      orders: 1340,
      customers: 890,
      avgOrder: 51119,
      growth: {
        revenue: 25.3,
        orders: 19.8,
        customers: 28.1,
        avgOrder: 4.5,
      },
    },
  };

  const currentStats = overviewStats[selectedPeriod] || overviewStats.today;

  const salesData = [
    { date: "01/01", revenue: 2100000, orders: 42 },
    { date: "02/01", revenue: 2300000, orders: 45 },
    { date: "03/01", revenue: 2450000, orders: 47 },
    { date: "04/01", revenue: 2200000, orders: 44 },
    { date: "05/01", revenue: 2600000, orders: 52 },
    { date: "06/01", revenue: 2800000, orders: 56 },
    { date: "07/01", revenue: 2450000, orders: 47 },
  ];

  const topProducts = [
    {
      name: "Cà Phê Phin Truyền Thống",
      sold: 156,
      revenue: 3900000,
      percentage: 28.5,
    },
    { name: "Cà Phê Đá", sold: 134, revenue: 3752000, percentage: 24.2 },
    {
      name: "Bánh Mì Thịt Nướng",
      sold: 89,
      revenue: 4005000,
      percentage: 16.1,
    },
    { name: "Cà Phê Trứng", sold: 78, revenue: 2730000, percentage: 14.1 },
    { name: "Gỏi Cuốn", sold: 67, revenue: 2345000, percentage: 12.1 },
    { name: "Khác", sold: 45, revenue: 1568000, percentage: 5.0 },
  ];

  const customerStats = [
    { type: "Khách hàng mới", count: 156, percentage: 62.4 },
    { type: "Khách hàng quay lại", count: 94, percentage: 37.6 },
  ];

  const hourlyData = [
    { hour: "08:00", revenue: 125000, orders: 5 },
    { hour: "09:00", revenue: 200000, orders: 8 },
    { hour: "10:00", revenue: 315000, orders: 12 },
    { hour: "11:00", revenue: 425000, orders: 15 },
    { hour: "12:00", revenue: 520000, orders: 18 },
    { hour: "13:00", revenue: 650000, orders: 22 },
    { hour: "14:00", revenue: 480000, orders: 16 },
    { hour: "15:00", revenue: 380000, orders: 14 },
    { hour: "16:00", revenue: 290000, orders: 11 },
    { hour: "17:00", revenue: 220000, orders: 8 },
    { hour: "18:00", revenue: 180000, orders: 6 },
    { hour: "19:00", revenue: 155000, orders: 5 },
  ];

  const maxRevenue = Math.max(...hourlyData.map((d) => d.revenue));

  const exportReport = () => {
    // In real app, this would generate and download a report
    alert("Đang xuất báo cáo...");
  };

  return (
    <div className="p-6 bg-gradient-to-br from-amber-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Báo Cáo & Thống Kê
          </h1>
          <p className="text-gray-600">Phân tích dữ liệu kinh doanh chi tiết</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportReport}
            className="bg-green-600 text-white px-6 py-3 rounded-2xl hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Xuất Báo Cáo
          </button>
          <button className="bg-amber-600 text-white px-6 py-3 rounded-2xl hover:bg-amber-700 transition-colors flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Làm Mới
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Period Selector */}
          <div className="flex gap-2 overflow-x-auto">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-4 py-2 rounded-2xl font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedPeriod === period.id
                    ? "bg-amber-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {period.name}
              </button>
            ))}
          </div>

          {/* Report Type Selector */}
          <div className="flex gap-2 overflow-x-auto">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedReport === report.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {report.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overview Report */}
      {selectedReport === "overview" && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hourly Revenue Chart */}
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Doanh Thu Theo Giờ
                </h3>
                <BarChart3 className="w-6 h-6 text-amber-600" />
              </div>
              <div className="space-y-3">
                {hourlyData.map((data, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-16 text-sm text-gray-600">
                      {data.hour}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full"
                        style={{
                          width: `${(data.revenue / maxRevenue) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="w-24 text-sm font-medium text-gray-800 text-right">
                      {data.revenue.toLocaleString("vi-VN")}₫
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Sản Phẩm Bán Chạy
                </h3>
                <PieChart className="w-6 h-6 text-amber-600" />
              </div>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
                      <span className="text-amber-700 font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 text-sm">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {product.sold} bán •{" "}
                        {product.revenue.toLocaleString("vi-VN")}₫
                      </div>
                    </div>
                    <div className="text-sm font-medium text-amber-700">
                      {product.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sales Report */}
      {selectedReport === "sales" && (
        <div className="space-y-8">
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Biểu Đồ Doanh Thu 7 Ngày Qua
            </h3>
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-16 text-sm text-gray-600">{data.date}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full"
                      style={{ width: `${(data.revenue / 2800000) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-32 text-sm font-medium text-gray-800 text-right">
                    {data.revenue.toLocaleString("vi-VN")}₫
                  </div>
                  <div className="w-16 text-sm text-gray-600 text-right">
                    {data.orders} đơn
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products Report */}
      {selectedReport === "products" && (
        <div className="space-y-8">
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Phân Tích Sản Phẩm Chi Tiết
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-800">
                      Sản phẩm
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-800">
                      Đã bán
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-800">
                      Doanh thu
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-800">
                      % Tổng
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-800">
                      Xu hướng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.slice(0, -1).map((product, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-800">
                          {product.name}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600">
                        {product.sold}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-gray-800">
                        {product.revenue.toLocaleString("vi-VN")}₫
                      </td>
                      <td className="py-3 px-4 text-right text-amber-700 font-medium">
                        {product.percentage}%
                      </td>
                      <td className="py-3 px-4 text-right">
                        <TrendingUp className="w-4 h-4 text-green-500 inline" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Customers Report */}
      {selectedReport === "customers" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Phân Loại Khách Hàng
              </h3>
              <div className="space-y-4">
                {customerStats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        {stat.type}
                      </div>
                      <div className="text-sm text-gray-600">
                        {stat.count} khách hàng
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-amber-700">
                        {stat.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Thống Kê Khách Hàng
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng khách hàng:</span>
                  <span className="font-bold text-gray-800">250</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Khách hàng trung thành:</span>
                  <span className="font-bold text-gray-800">94</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tần suất ghé thăm TB:</span>
                  <span className="font-bold text-gray-800">2.3 lần/tuần</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chi tiêu TB/khách:</span>
                  <span className="font-bold text-amber-700">52,127₫</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
