"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Heart,
  ShoppingBag,
  Settings,
  Edit3,
  Save,
  X,
  Star,
  Gift,
  ChevronRight,
  Award,
  Coffee,
  Eye,
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: "Nguyễn Văn An",
    email: "nguyenvanan@email.com",
    phone: "0901 234 567",
    dateOfBirth: "1990-05-15",
    address: "123 Lê Lợi, Quận 1, TP.HCM",
  });

  const [editInfo, setEditInfo] = useState({ ...userInfo });

  const tabs = [
    { id: "info", name: "Thông Tin", icon: User },
    { id: "orders", name: "Đơn Hàng", icon: ShoppingBag },
    { id: "favorites", name: "Yêu Thích", icon: Heart },
    { id: "rewards", name: "Tích Điểm", icon: Gift },
    { id: "settings", name: "Cài Đặt", icon: Settings },
  ];

  const orderHistory = [
    {
      id: "VN2024001",
      date: "2024-01-15",
      time: "14:30",
      status: "completed",
      total: 126000,
      items: [
        { name: "Cà Phê Phin Truyền Thống", quantity: 2, price: 30000 },
        { name: "Bánh Mì Thịt Nướng", quantity: 1, price: 45000 },
      ],
    },
    {
      id: "VN2024002",
      date: "2024-01-12",
      time: "09:15",
      status: "completed",
      total: 85000,
      items: [
        { name: "Cà Phê Trứng", quantity: 1, price: 35000 },
        { name: "Cà Phê Đá", quantity: 2, price: 25000 },
      ],
    },
    {
      id: "VN2024003",
      date: "2024-01-10",
      time: "16:45",
      status: "cancelled",
      total: 60000,
      items: [{ name: "Cà Phê Dừa", quantity: 2, price: 30000 }],
    },
  ];

  const favoriteItems = [
    {
      id: 1,
      name: "Cà Phê Phin Truyền Thống",
      price: 25000,
      image: "/placeholder.svg?height=80&width=80",
      orderCount: 15,
    },
    {
      id: 2,
      name: "Cà Phê Trứng",
      price: 35000,
      image: "/placeholder.svg?height=80&width=80",
      orderCount: 8,
    },
    {
      id: 3,
      name: "Bánh Mì Thịt Nướng",
      price: 45000,
      image: "/placeholder.svg?height=80&width=80",
      orderCount: 5,
    },
  ];

  const rewardStats = {
    currentPoints: 1250,
    totalSpent: 2500000,
    ordersCount: 28,
    memberSince: "2023-06-15",
    tier: "Gold",
    nextTierPoints: 250,
  };

  const handleSave = () => {
    setUserInfo({ ...editInfo });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditInfo({ ...userInfo });
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Hoàn Thành";
      case "processing":
        return "Đang Xử Lý";
      case "cancelled":
        return "Đã Hủy";
      default:
        return "Không Xác Định";
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm py-4 border-b border-amber-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-amber-700 transition-colors">
              Trang Chủ
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-amber-700 font-medium">Tài Khoản</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Tài Khoản Của Tôi
          </h1>
          <p className="text-xl text-gray-600">
            Quản lý thông tin và theo dõi đơn hàng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 sticky top-8">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg"
                          : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Personal Information */}
            {activeTab === "info" && (
              <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Thông Tin Cá Nhân
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-2xl hover:bg-amber-700 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      Chỉnh Sửa
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Lưu
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-2xl hover:bg-gray-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Hủy
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Họ và Tên
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editInfo.fullName}
                        onChange={(e) =>
                          setEditInfo({ ...editInfo, fullName: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-2xl">
                        {userInfo.fullName}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editInfo.email}
                        onChange={(e) =>
                          setEditInfo({ ...editInfo, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-2xl">
                        {userInfo.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số Điện Thoại
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editInfo.phone}
                        onChange={(e) =>
                          setEditInfo({ ...editInfo, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-2xl">
                        {userInfo.phone}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ngày Sinh
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editInfo.dateOfBirth}
                        onChange={(e) =>
                          setEditInfo({
                            ...editInfo,
                            dateOfBirth: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-2xl">
                        {new Date(userInfo.dateOfBirth).toLocaleDateString(
                          "vi-VN"
                        )}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Địa Chỉ
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editInfo.address}
                        onChange={(e) =>
                          setEditInfo({ ...editInfo, address: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-2xl">
                        {userInfo.address}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Order History */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">
                  Lịch Sử Đơn Hàng
                </h2>

                <div className="space-y-6">
                  {orderHistory.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-bold text-gray-800">
                              Đơn hàng #{order.id}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {new Date(order.date).toLocaleDateString("vi-VN")}{" "}
                              - {order.time}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-amber-700">
                            {order.total.toLocaleString("vi-VN")}₫
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-700">
                              {item.name} x{item.quantity}
                            </span>
                            <span className="text-gray-600">
                              {(item.price * item.quantity).toLocaleString(
                                "vi-VN"
                              )}
                              ₫
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3 mt-4">
                        <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors text-sm">
                          <Eye className="w-4 h-4" />
                          Xem Chi Tiết
                        </button>
                        {order.status === "completed" && (
                          <button className="flex items-center gap-2 px-4 py-2 border border-amber-600 text-amber-600 rounded-xl hover:bg-amber-50 transition-colors text-sm">
                            <ShoppingBag className="w-4 h-4" />
                            Đặt Lại
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Favorites */}
            {activeTab === "favorites" && (
              <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">
                  Món Yêu Thích
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {favoriteItems.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 mb-2">
                            {item.name}
                          </h3>
                          <div className="text-amber-700 font-bold mb-2">
                            {item.price.toLocaleString("vi-VN")}₫
                          </div>
                          <div className="text-sm text-gray-600 mb-4">
                            Đã đặt {item.orderCount} lần
                          </div>
                          <button className="w-full bg-amber-600 text-white py-2 rounded-xl hover:bg-amber-700 transition-colors">
                            Đặt Ngay
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rewards */}
            {activeTab === "rewards" && (
              <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">
                  Chương Trình Tích Điểm
                </h2>

                {/* Membership Card */}
                <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-3xl p-8 text-white mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">
                        Thành Viên {rewardStats.tier}
                      </h3>
                      <p className="text-amber-100">
                        Thành viên từ{" "}
                        {new Date(rewardStats.memberSince).toLocaleDateString(
                          "vi-VN"
                        )}
                      </p>
                    </div>
                    <Award className="w-12 h-12 text-amber-200" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <div className="text-3xl font-bold">
                        {rewardStats.currentPoints}
                      </div>
                      <div className="text-amber-100 text-sm">
                        Điểm Hiện Tại
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">
                        {rewardStats.ordersCount}
                      </div>
                      <div className="text-amber-100 text-sm">Đơn Hàng</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">
                        {(rewardStats.totalSpent / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-amber-100 text-sm">
                        Tổng Chi Tiêu
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">
                        {rewardStats.nextTierPoints}
                      </div>
                      <div className="text-amber-100 text-sm">
                        Điểm Lên Hạng
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rewards Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h4 className="font-bold text-gray-800 mb-4">
                      Quyền Lợi Thành Viên Gold
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500" />
                        Giảm 10% mọi đơn hàng
                      </li>
                      <li className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-amber-500" />
                        Sinh nhật tặng 1 cà phê miễn phí
                      </li>
                      <li className="flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-amber-500" />
                        Ưu tiên phục vụ
                      </li>
                    </ul>
                  </div>

                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h4 className="font-bold text-gray-800 mb-4">
                      Cách Tích Điểm
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 1.000₫ = 1 điểm</li>
                      <li>• 100 điểm = 10.000₫ giảm giá</li>
                      <li>• Đánh giá đơn hàng: +5 điểm</li>
                      <li>• Giới thiệu bạn bè: +50 điểm</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">
                  Cài Đặt Tài Khoản
                </h2>

                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h3 className="font-bold text-gray-800 mb-4">Bảo Mật</h3>
                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <span>Đổi Mật Khẩu</span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <span>Xác Thực 2 Bước</span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-2xl p-6">
                    <h3 className="font-bold text-gray-800 mb-4">Thông Báo</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Email khuyến mãi</span>
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-amber-600"
                          defaultChecked
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>SMS đơn hàng</span>
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-amber-600"
                          defaultChecked
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Push notification</span>
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-amber-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border border-red-200 rounded-2xl p-6">
                    <h3 className="font-bold text-red-600 mb-4">
                      Vùng Nguy Hiểm
                    </h3>
                    <button className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition-colors">
                      Xóa Tài Khoản
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
