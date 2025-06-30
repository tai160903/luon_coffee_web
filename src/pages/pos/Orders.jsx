"use client";

import { useEffect, useState } from "react";
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
import orderService from "../../services/order.service";

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const statusOptions = [
    { id: "all", name: "Tất Cả", color: "bg-gray-100 text-gray-800" },
    { id: "pending", name: "Mới", color: "bg-yellow-100 text-yellow-800" },
    {
      id: "confirmed",
      name: "Đã Xác Nhận",
      color: "bg-blue-100 text-blue-800",
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

  const statusMap = {
    0: "new", // NEW
    1: "confirmed", // CONFIRMED
    2: "preparing", // PREPARING
    3: "readyforpickup", // READYFORPICKUP
    4: "completed", // COMPLETED
    5: "cancelled", // CANCELLED
  };

  // Định nghĩa reverseStatusMap để lấy số từ status chữ
  const reverseStatusMap = {
    new: 0,
    confirmed: 1,
    preparing: 2,
    ready: 3,
    completed: 4,
    cancelled: 5,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      const data = await orderService.getAllOrders();
      const mapped = (data.data || []).map((order) => ({
        id: order.id,
        orderNumber: order.code || order.id,
        customer: {
          name: order.customerName || order.fullName || "",
          phone: order.phoneNumber || "",
          email: order.email || "",
        },
        items: (order.orderItems || []).map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.unitPrice,
          notes: "",
        })),
        total: order.finalPrice || order.totalAmount || 0,
        status: statusMap[order.status], // <-- map số sang chuỗi
        orderTime: order.createAt,
        estimatedTime: "",
        paymentMethod: order.payment || "",
        notes: "",
      }));
      setOrders(mapped);
      setIsLoading(false);
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    const matchesSearch = order.id;
    order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "new":
        return <Clock className="w-4 h-4" />;
      case "preparing":
        return <RefreshCw className="w-4 h-4" />;
      case "readyforpickups":
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

  const updateOrderStatus = async (orderId, statusString) => {
    try {
      setIsLoading(true);
      // Nếu truyền vào là chữ, lấy số tương ứng
      const statusNumber =
        typeof statusString === "string"
          ? reverseStatusMap[statusString]
          : statusString;
      const res = await orderService.updateStatus(orderId, statusNumber);
      if (res) {
        const data = await orderService.getAllOrders();
        const mapped = (data.data || []).map((order) => ({
          id: order.id,
          orderNumber: order.code || order.id,
          customer: {
            name: order.customerName || order.fullName || "",
            phone: order.phoneNumber || "",
            email: order.email || "",
          },
          items: (order.orderItems || []).map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.unitPrice,
            notes: "",
          })),
          total: order.finalPrice || order.totalAmount || 0,
          status: order.status,
          orderTime: order.createAt,
          estimatedTime: "",
          paymentMethod: order.payment || "",
          notes: "",
        }));
        setOrders(mapped);
      }
    } catch (error) {
      alert("Cập nhật trạng thái đơn hàng thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm cập nhật trạng thái tiếp theo
  const updateOrderToNextStatus = async (order) => {
    try {
      console.log("Updating order to next status:", order);
      setIsLoading(true);
      const currentStatusNum = reverseStatusMap[order.status];
      console.log("Current status number:", currentStatusNum);
      if (currentStatusNum >= 4) {
        setIsLoading(false);
        return;
      }
      const nextStatusNum = currentStatusNum + 1;
      console.log("Updating order to next status:", order.id, nextStatusNum);
      const res = await orderService.updateStatus(order.id, nextStatusNum);
      if (res) {
        // Reload lại danh sách đơn hàng
        const data = await orderService.getAllOrders();
        const mapped = (data.data || []).map((order) => ({
          id: order.code || order.id,
          orderNumber: order.code || order.id,
          customer: {
            name: order.customerName || order.fullName || "",
            phone: order.phoneNumber || "",
            email: order.email || "",
          },
          items: (order.orderItems || []).map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.unitPrice,
            notes: "",
          })),
          total: order.finalPrice || order.totalAmount || 0,
          status: statusMap[order.status],
          orderTime: order.createAt,
          estimatedTime: "",
          paymentMethod: order.payment || "",
          notes: "",
        }));
        setOrders(mapped);
      }
    } catch (error) {
      alert("Cập nhật trạng thái đơn hàng thất bại!");
    } finally {
      setIsLoading(false);
    }
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
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/60 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-amber-500 mb-4"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <div className="text-amber-700 font-semibold text-lg">
              Đang tải đơn hàng...
            </div>
          </div>
        </div>
      )}

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
                  onClick={() => updateOrderStatus(order.id, "preparing")} // PREPARING = 2
                  className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Bắt Đầu
                </button>
              )}

              {order.status === "preparing" && (
                <button
                  onClick={() => updateOrderStatus(order.id, "ready")} // READYFORPICKUP = 3
                  className="flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition-colors"
                >
                  Hoàn Thành
                </button>
              )}

              {order.status === "ready" && (
                <button
                  onClick={() => updateOrderStatus(order.id, "completed")} // COMPLETED = 4
                  className="flex-1 bg-emerald-600 text-white py-2 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Đã Lấy
                </button>
              )}

              {/* Nút cập nhật trạng thái hoàn thành cho mọi trạng thái khác chưa hoàn thành */}
              {order.status !== "completed" && order.status !== "cancelled" && (
                <button
                  onClick={() => updateOrderStatus(order.id, "completed")}
                  className="flex-1 bg-emerald-500 text-white py-2 rounded-xl hover:bg-emerald-600 transition-colors"
                >
                  Cập nhật Hoàn Thành
                </button>
              )}

              <button
                onClick={() => updateOrderToNextStatus(order)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Cập nhật trạng thái tiếp theo
              </button>
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
