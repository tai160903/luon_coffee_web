"use client";

import { useState } from "react";
import {
  Search,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Phone,
  RefreshCw,
} from "lucide-react";

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const statusOptions = [
    { id: "all", name: "Tất Cả", color: "bg-gray-100 text-gray-800" },
    {
      id: "pending",
      name: "Chờ Xử Lý",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      id: "preparing",
      name: "Đang Chuẩn Bị",
      color: "bg-blue-100 text-blue-800",
    },
    { id: "ready", name: "Sẵn Sàng", color: "bg-green-100 text-green-800" },
    {
      id: "completed",
      name: "Hoàn Thành",
      color: "bg-emerald-100 text-emerald-800",
    },
    { id: "cancelled", name: "Đã Hủy", color: "bg-red-100 text-red-800" },
  ];

  const orders = [
    {
      id: "VN2024001",
      orderNumber: "001",
      customer: {
        name: "Nguyễn Văn An",
        phone: "0901234567",
        email: "nguyenvanan@email.com",
      },
      items: [
        {
          name: "Cà Phê Phin Truyền Thống",
          quantity: 2,
          price: 25000,
          notes: "Ít đường",
        },
        {
          name: "Bánh Mì Thịt Nướng",
          quantity: 1,
          price: 45000,
          notes: "Không rau mùi",
        },
      ],
      total: 95000,
      status: "preparing",
      orderTime: "2024-01-15T14:30:00",
      estimatedTime: "2024-01-15T14:45:00",
      paymentMethod: "cash",
      notes: "Gọi điện khi sẵn sàng",
    },
    {
      id: "VN2024002",
      orderNumber: "002",
      customer: {
        name: "Trần Thị Bình",
        phone: "0912345678",
        email: "tranthib@email.com",
      },
      items: [
        { name: "Cà Phê Trứng", quantity: 1, price: 35000, notes: "" },
        { name: "Cà Phê Đá", quantity: 2, price: 28000, notes: "Nhiều đá" },
      ],
      total: 91000,
      status: "ready",
      orderTime: "2024-01-15T14:25:00",
      estimatedTime: "2024-01-15T14:40:00",
      paymentMethod: "card",
      notes: "",
    },
    {
      id: "VN2024003",
      orderNumber: "003",
      customer: {
        name: "Lê Văn Cường",
        phone: "0923456789",
        email: "levancuong@email.com",
      },
      items: [
        { name: "Cà Phê Dừa", quantity: 1, price: 32000, notes: "" },
        { name: "Gỏi Cuốn", quantity: 2, price: 35000, notes: "Thêm tương" },
      ],
      total: 102000,
      status: "pending",
      orderTime: "2024-01-15T14:35:00",
      estimatedTime: "2024-01-15T14:50:00",
      paymentMethod: "ewallet",
      notes: "Khách đợi tại quán",
    },
    {
      id: "VN2024004",
      orderNumber: "004",
      customer: {
        name: "Phạm Thị Dung",
        phone: "0934567890",
        email: "phamthidung@email.com",
      },
      items: [
        {
          name: "Cà Phê Phin Truyền Thống",
          quantity: 1,
          price: 25000,
          notes: "",
        },
      ],
      total: 25000,
      status: "completed",
      orderTime: "2024-01-15T14:15:00",
      estimatedTime: "2024-01-15T14:30:00",
      paymentMethod: "cash",
      notes: "",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "preparing":
        return <RefreshCw className="w-4 h-4" />;
      case "ready":
        return <CheckCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find((option) => option.id === status);
    return statusOption ? statusOption.color : "bg-gray-100 text-gray-800";
  };

  const updateOrderStatus = (orderId, newStatus) => {
    // In real app, this would update the database
    console.log(`Updating order ${orderId} to status ${newStatus}`);
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeRemaining = (estimatedTime) => {
    const now = new Date();
    const estimated = new Date(estimatedTime);
    const diff = estimated - now;
    const minutes = Math.floor(diff / 60000);
    return minutes > 0 ? `${minutes} phút` : "Quá giờ";
  };

  return (
    <div className="p-6 bg-gradient-to-br from-amber-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Quản Lý Đơn Hàng</h1>
          <p className="text-gray-600">Theo dõi và xử lý đơn hàng</p>
        </div>
        <button className="bg-amber-600 text-white px-6 py-3 rounded-2xl hover:bg-amber-700 transition-colors">
          Tạo Đơn Hàng Mới
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
              placeholder="Tìm theo mã đơn, tên khách hàng, số điện thoại..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {statusOptions.map((status) => (
              <button
                key={status.id}
                onClick={() => setSelectedStatus(status.id)}
                className={`px-4 py-3 rounded-2xl font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedStatus === status.id
                    ? "bg-amber-600 text-white shadow-lg"
                    : `${status.color} hover:shadow-md`
                }`}
              >
                {status.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            {/* Order Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  #{order.orderNumber}
                </h3>
                <p className="text-sm text-gray-600">{order.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusIcon(order.status)}
                  {statusOptions.find((s) => s.id === order.status)?.name}
                </span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mb-4 p-3 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-800">
                  {order.customer.name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{order.customer.phone}</span>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Món đã đặt:</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div>
                      <span className="text-gray-800">{item.name}</span>
                      <span className="text-gray-600"> x{item.quantity}</span>
                      {item.notes && (
                        <div className="text-xs text-gray-500 italic">
                          Ghi chú: {item.notes}
                        </div>
                      )}
                    </div>
                    <span className="text-gray-600">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Details */}
            <div className="mb-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Thời gian đặt:</span>
                <span className="text-gray-800">
                  {formatTime(order.orderTime)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dự kiến hoàn thành:</span>
                <span className="text-gray-800">
                  {formatTime(order.estimatedTime)}
                </span>
              </div>
              {order.status === "preparing" && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Thời gian còn lại:</span>
                  <span className="text-amber-600 font-medium">
                    {getTimeRemaining(order.estimatedTime)}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-bold">
                <span className="text-gray-800">Tổng cộng:</span>
                <span className="text-amber-700">
                  {order.total.toLocaleString("vi-VN")}₫
                </span>
              </div>
            </div>

            {/* Order Notes */}
            {order.notes && (
              <div className="mb-4 p-3 bg-blue-50 rounded-2xl">
                <div className="text-sm text-blue-800">
                  <strong>Ghi chú:</strong> {order.notes}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedOrder(order);
                  setShowOrderModal(true);
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Chi Tiết
              </button>

              {order.status === "pending" && (
                <button
                  onClick={() => updateOrderStatus(order.id, "preparing")}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Bắt Đầu
                </button>
              )}

              {order.status === "preparing" && (
                <button
                  onClick={() => updateOrderStatus(order.id, "ready")}
                  className="flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition-colors"
                >
                  Hoàn Thành
                </button>
              )}

              {order.status === "ready" && (
                <button
                  onClick={() => updateOrderStatus(order.id, "completed")}
                  className="flex-1 bg-emerald-600 text-white py-2 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Đã Lấy
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Order Detail Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Chi Tiết Đơn Hàng #{selectedOrder.orderNumber}
              </h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Detailed order information would go here */}
            <div className="space-y-6">
              {/* Customer Details */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <h4 className="font-bold text-gray-800 mb-3">
                  Thông Tin Khách Hàng
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span>{selectedOrder.customer.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <span>{selectedOrder.customer.phone}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3">
                  Chi Tiết Đơn Hàng
                </h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start p-3 bg-gray-50 rounded-2xl"
                    >
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">
                          Số lượng: {item.quantity}
                        </div>
                        {item.notes && (
                          <div className="text-sm text-gray-500 italic">
                            Ghi chú: {item.notes}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          {(item.price * item.quantity).toLocaleString("vi-VN")}
                          ₫
                        </div>
                        <div className="text-sm text-gray-600">
                          {item.price.toLocaleString("vi-VN")}₫ x{" "}
                          {item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-2xl hover:bg-gray-300 transition-colors"
                >
                  Đóng
                </button>
                <button className="flex-1 bg-amber-600 text-white py-3 rounded-2xl hover:bg-amber-700 transition-colors">
                  In Hóa Đơn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Không có đơn hàng nào
          </h3>
          <p className="text-gray-500">
            Không tìm thấy đơn hàng phù hợp với bộ lọc hiện tại
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
