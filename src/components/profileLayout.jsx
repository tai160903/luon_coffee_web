"use client";

import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  User,
  ShoppingBag,
  // Settings,
  // Gift,
  ChevronRight,
  Menu,
  X,
  Home,
} from "lucide-react";

export default function ProfileLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const tabs = [
    { id: "info", name: "Thông Tin", icon: User, path: "/profile" },
    {
      id: "orders",
      name: "Đơn Hàng",
      icon: ShoppingBag,
      path: "/profile/orders-history",
    },
    // { id: "rewards", name: "Tích Điểm", icon: Gift, path: "/profile/rewards" },
    // {
    //   id: "settings",
    //   name: "Cài Đặt",
    //   icon: Settings,
    //   path: "/profile/settings",
    // },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm py-4 border-b border-amber-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-amber-700 transition-colors">
                Trang Chủ
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-amber-700 font-medium">Tài Khoản</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Tài Khoản Của Tôi
          </h1>
          <p className="text-lg text-gray-600">
            Quản lý thông tin và theo dõi đơn hàng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div
              className={`bg-white rounded-3xl shadow-lg p-6 border border-gray-100 sticky top-8 ${
                sidebarOpen ? "block" : "hidden lg:block"
              }`}
            >
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = isActive(tab.path);
                  return (
                    <Link
                      key={tab.id}
                      to={tab.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${
                        active
                          ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg"
                          : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.name}
                    </Link>
                  );
                })}

                {/* Back to Home */}
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <Link
                    to="/"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                  >
                    <Home className="w-5 h-5" />
                    Trang Chủ
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
