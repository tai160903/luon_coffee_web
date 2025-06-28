"use client";

import { useState } from "react";
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

const ManagerDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");

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
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${stat.bgColor} rounded-2xl flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.title}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Menu */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Chức Năng Quản Lý
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className="group p-6 rounded-2xl border-2 border-gray-200 hover:border-amber-300 transition-all duration-300 text-left hover:shadow-lg"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 group-hover:text-amber-700 transition-colors">
                            {item.name}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Hoạt Động Gần Đây
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 font-medium">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-amber-600 hover:text-amber-700 font-medium">
                Xem tất cả hoạt động
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Thao Tác Nhanh
              </h2>
              <div className="space-y-3">
                <button className="w-full p-3 bg-amber-100 text-amber-700 rounded-2xl hover:bg-amber-200 transition-colors text-left">
                  <div className="font-medium">Thêm món mới</div>
                  <div className="text-sm opacity-75">
                    Thêm món ăn vào thực đơn
                  </div>
                </button>
                <button className="w-full p-3 bg-blue-100 text-blue-700 rounded-2xl hover:bg-blue-200 transition-colors text-left">
                  <div className="font-medium">Xem báo cáo</div>
                  <div className="text-sm opacity-75">
                    Báo cáo doanh thu hôm nay
                  </div>
                </button>
                <button className="w-full p-3 bg-green-100 text-green-700 rounded-2xl hover:bg-green-200 transition-colors text-left">
                  <div className="font-medium">Quản lý đơn hàng</div>
                  <div className="text-sm opacity-75">
                    Xem đơn hàng đang chờ
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
