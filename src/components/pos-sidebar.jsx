import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Coffee,
  ShoppingCart,
  ClipboardList,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  Bell,
  Home,
} from "lucide-react";

const POSSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  //   const [activeSection, setActiveSection] = useState("pos");
  const location = useLocation();

  const posMenuItems = [
    {
      path: "/pos/sales",
      name: "Bán Hàng",
      nameEn: "Sales",
      icon: ShoppingCart,
      color: "from-green-500 to-green-600",
    },
    {
      path: "/pos/orders",
      name: "Đơn Hàng",
      nameEn: "Orders",
      icon: ClipboardList,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const isActive = (path) => location.pathname === path;

  const currentUser = {
    name: "Nguyễn Văn A",
    role: "Quản lý",
    avatar: "/placeholder.svg?height=40&width=40",
  };

  return (
    <div
      className={`bg-white shadow-2xl border-r border-gray-200 flex flex-col transition-all min-h-calc(100vh - 200px) duration-300 ${
        isCollapsed ? "w-20" : "w-80"
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl flex items-center justify-center">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <div className="text-xl font-bold text-gray-800">
                  Cà Phê Việt
                </div>
                <div className="text-xs text-gray-600">POS System</div>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6">
        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="px-6 mb-6">
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/"
                className="flex items-center justify-center gap-2 px-3 py-2 bg-amber-50 text-amber-700 rounded-xl hover:bg-amber-100 transition-colors text-sm font-medium"
              >
                <Home className="w-4 h-4" />
                Trang Chủ
              </Link>
              <button className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors text-sm font-medium">
                <Bell className="w-4 h-4" />
                Thông Báo
              </button>
            </div>
          </div>
        )}

        {/* POS Section */}
        <div className="px-6 mb-8">
          <div className="space-y-2">
            {posMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-medium transition-all duration-300 group ${
                    isActive(item.path)
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <div className="flex-1">
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs opacity-70">{item.nameEn}</div>
                    </div>
                  )}
                  {isActive(item.path) && !isCollapsed && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Profile & Logout */}
      <div className="p-6 border-t border-gray-200">
        {!isCollapsed ? (
          <div className="space-y-4">
            {/* User Info */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800 text-sm">
                  {currentUser.name}
                </div>
                <div className="text-xs text-gray-600">{currentUser.role}</div>
              </div>
            </div>

            {/* Logout Button */}
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-colors font-medium">
              <LogOut className="w-5 h-5" />
              Đăng Xuất
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <button className="w-full p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <User className="w-5 h-5 text-gray-600 mx-auto" />
            </button>
            <button className="w-full p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
              <LogOut className="w-5 h-5 mx-auto" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default POSSidebar;
