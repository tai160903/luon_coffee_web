"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  User,
  Phone,
  Mail,
  Calendar,
  Star,
  Eye,
  X,
  Save,
} from "lucide-react";

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    address: "",
  });

  const filters = [
    { id: "all", name: "Tất Cả", count: 245 },
    { id: "vip", name: "VIP", count: 28 },
    { id: "regular", name: "Thường Xuyên", count: 94 },
    { id: "new", name: "Mới", count: 123 },
  ];

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn An",
      phone: "0901234567",
      email: "nguyenvanan@email.com",
      dateOfBirth: "1990-05-15",
      address: "123 Lê Lợi, Quận 1, TP.HCM",
      joinDate: "2023-06-15",
      totalOrders: 28,
      totalSpent: 1400000,
      lastVisit: "2024-01-15",
      tier: "vip",
      points: 1250,
      favoriteItems: ["Cà Phê Phin Truyền Thống", "Bánh Mì Thịt Nướng"],
      notes: "Khách hàng thân thiết, thích cà phê đậm đà",
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      phone: "0912345678",
      email: "tranthib@email.com",
      dateOfBirth: "1985-08-22",
      address: "456 Nguyễn Huệ, Quận 1, TP.HCM",
      joinDate: "2023-08-10",
      totalOrders: 15,
      totalSpent: 750000,
      lastVisit: "2024-01-12",
      tier: "regular",
      points: 750,
      favoriteItems: ["Cà Phê Trứng", "Trà Sen"],
      notes: "Thường đặt vào buổi sáng",
    },
    {
      id: 3,
      name: "Lê Văn Cường",
      phone: "0923456789",
      email: "levancuong@email.com",
      dateOfBirth: "1992-12-03",
      address: "789 Đồng Khởi, Quận 1, TP.HCM",
      joinDate: "2024-01-05",
      totalOrders: 3,
      totalSpent: 150000,
      lastVisit: "2024-01-14",
      tier: "new",
      points: 150,
      favoriteItems: ["Cà Phê Đá"],
      notes: "Khách hàng mới, cần chăm sóc",
    },
  ]);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" || customer.tier === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const getTierColor = (tier) => {
    switch (tier) {
      case "vip":
        return "bg-purple-100 text-purple-800";
      case "regular":
        return "bg-blue-100 text-blue-800";
      case "new":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTierName = (tier) => {
    switch (tier) {
      case "vip":
        return "VIP";
      case "regular":
        return "Thường Xuyên";
      case "new":
        return "Mới";
      default:
        return "Khách Hàng";
    }
  };

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone) return;

    const customer = {
      id: Date.now(),
      ...newCustomer,
      joinDate: new Date().toISOString().split("T")[0],
      totalOrders: 0,
      totalSpent: 0,
      lastVisit: new Date().toISOString().split("T")[0],
      tier: "new",
      points: 0,
      favoriteItems: [],
      notes: "",
    };

    setCustomers([...customers, customer]);
    setNewCustomer({
      name: "",
      phone: "",
      email: "",
      dateOfBirth: "",
      address: "",
    });
    setShowAddModal(false);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer({ ...customer });
  };

  const handleSaveEdit = () => {
    setCustomers(
      customers.map((customer) =>
        customer.id === editingCustomer.id ? editingCustomer : customer
      )
    );
    setEditingCustomer(null);
  };

  const handleDeleteCustomer = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      setCustomers(customers.filter((customer) => customer.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-amber-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Quản Lý Khách Hàng
          </h1>
          <p className="text-gray-600">Theo dõi và chăm sóc khách hàng</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-amber-600 text-white px-6 py-3 rounded-2xl hover:bg-amber-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Thêm Khách Hàng
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên, số điện thoại, email..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-3 rounded-2xl font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? "bg-amber-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.name} ({filter.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            {/* Customer Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center">
                  <User className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{customer.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(
                      customer.tier
                    )}`}
                  >
                    {getTierName(customer.tier)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-600">
                  {customer.points}
                </span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>
                  Tham gia:{" "}
                  {new Date(customer.joinDate).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </div>

            {/* Customer Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-2xl">
                <div className="text-lg font-bold text-gray-800">
                  {customer.totalOrders}
                </div>
                <div className="text-xs text-gray-600">Đơn hàng</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-2xl">
                <div className="text-lg font-bold text-amber-700">
                  {customer.totalSpent.toLocaleString("vi-VN")}₫
                </div>
                <div className="text-xs text-gray-600">Tổng chi tiêu</div>
              </div>
            </div>

            {/* Favorite Items */}
            {customer.favoriteItems.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  Món yêu thích:
                </div>
                <div className="flex flex-wrap gap-1">
                  {customer.favoriteItems.slice(0, 2).map((item, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                  {customer.favoriteItems.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{customer.favoriteItems.length - 2}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedCustomer(customer);
                  setShowDetailModal(true);
                }}
                className="flex-1 bg-blue-100 text-blue-600 py-2 rounded-xl hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Chi Tiết
              </button>
              <button
                onClick={() => handleEditCustomer(customer)}
                className="flex-1 bg-green-100 text-green-600 py-2 rounded-xl hover:bg-green-200 transition-colors flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Sửa
              </button>
              <button
                onClick={() => handleDeleteCustomer(customer.id)}
                className="px-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Thêm Khách Hàng Mới
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    value={newCustomer.name}
                    onChange={(e) =>
                      setNewCustomer({ ...newCustomer, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                    placeholder="Nhập họ và tên"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={newCustomer.phone}
                    onChange={(e) =>
                      setNewCustomer({ ...newCustomer, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) =>
                      setNewCustomer({ ...newCustomer, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                    placeholder="Nhập email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    value={newCustomer.dateOfBirth}
                    onChange={(e) =>
                      setNewCustomer({
                        ...newCustomer,
                        dateOfBirth: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Địa chỉ
                </label>
                <textarea
                  value={newCustomer.address}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, address: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder="Nhập địa chỉ"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-2xl hover:bg-gray-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddCustomer}
                  className="flex-1 bg-amber-600 text-white py-3 rounded-2xl hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Thêm Khách Hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Detail Modal */}
      {showDetailModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Chi Tiết Khách Hàng
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Customer Info */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-amber-700" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">
                      {selectedCustomer.name}
                    </h4>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getTierColor(
                        selectedCustomer.tier
                      )}`}
                    >
                      {getTierName(selectedCustomer.tier)}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">Điểm tích lũy</div>
                      <div className="text-2xl font-bold text-amber-700">
                        {selectedCustomer.points}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Tổng đơn hàng</div>
                      <div className="text-xl font-bold text-gray-800">
                        {selectedCustomer.totalOrders}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Tổng chi tiêu</div>
                      <div className="text-xl font-bold text-green-700">
                        {selectedCustomer.totalSpent.toLocaleString("vi-VN")}₫
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h5 className="font-bold text-gray-800 mb-4">
                    Thông Tin Liên Hệ
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Số điện thoại</div>
                      <div className="font-medium text-gray-800">
                        {selectedCustomer.phone}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Email</div>
                      <div className="font-medium text-gray-800">
                        {selectedCustomer.email}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Ngày sinh</div>
                      <div className="font-medium text-gray-800">
                        {new Date(
                          selectedCustomer.dateOfBirth
                        ).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Tham gia</div>
                      <div className="font-medium text-gray-800">
                        {new Date(selectedCustomer.joinDate).toLocaleDateString(
                          "vi-VN"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-gray-600">Địa chỉ</div>
                    <div className="font-medium text-gray-800">
                      {selectedCustomer.address}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h5 className="font-bold text-gray-800 mb-4">
                    Món Yêu Thích
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomer.favoriteItems.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedCustomer.notes && (
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h5 className="font-bold text-gray-800 mb-4">Ghi Chú</h5>
                    <p className="text-gray-700">{selectedCustomer.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {editingCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Chỉnh Sửa Khách Hàng
              </h3>
              <button
                onClick={() => setEditingCustomer(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    value={editingCustomer.name}
                    onChange={(e) =>
                      setEditingCustomer({
                        ...editingCustomer,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={editingCustomer.phone}
                    onChange={(e) =>
                      setEditingCustomer({
                        ...editingCustomer,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editingCustomer.email}
                  onChange={(e) =>
                    setEditingCustomer({
                      ...editingCustomer,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ghi chú
                </label>
                <textarea
                  value={editingCustomer.notes}
                  onChange={(e) =>
                    setEditingCustomer({
                      ...editingCustomer,
                      notes: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setEditingCustomer(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-2xl hover:bg-gray-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-amber-600 text-white py-3 rounded-2xl hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Lưu Thay Đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Không có khách hàng nào
          </h3>
          <p className="text-gray-500">
            Không tìm thấy khách hàng phù hợp với bộ lọc hiện tại
          </p>
        </div>
      )}
    </div>
  );
};

export default Customers;
