"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  RotateCcw,
  Filter,
  Search,
  Calendar,
  Coffee,
  Phone,
  User,
  CreditCard,
  ChevronRight,
  Home,
  Star,
  Package,
} from "lucide-react";
import orderService from "../services/order.service";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await orderService.getOrdersByCustomer();
      // Map API data về đúng format UI
      const mapped = (data.data || []).map((order) => ({
        id: order.code,
        date: order.createAt ? order.createAt.split("T")[0] : "",
        time: order.createAt ? order.createAt.split("T")[1]?.slice(0, 5) : "",
        status: order.status,
        total: order.finalPrice,
        customerName: order.customerName || order.fullName || "",
        phoneNumber: order.phoneNumber,
        payment: order.payment,
        pickupTime: "",
        location: "",
        items: (order.orderItems || []).map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.unitPrice,
          image: item.imageProduct,
          note: "", // Nếu có trường note thì lấy, không thì để rỗng
        })),
        rating: 0,
        review: "",
        cancelReason: order.cancelReason || "",
      }));
      setOrders(mapped);
      setFilteredOrders(mapped);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((order) => order.status === selectedStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.items.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredOrders(filtered);
  }, [selectedStatus, searchTerm, orders]);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
      case "pending":
        return "Chờ Xử Lý";
      default:
        return "Không Xác Định";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "processing":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      case "pending":
        return <Package className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleReorder = (order) => {
    // Logic để đặt lại đơn hàng
    console.log("Reordering:", order.id);
    alert(`Đang thêm các món từ đơn hàng ${order.id} vào giỏ hàng...`);
  };

  const statusOptions = [
    { value: "all", label: "Tất Cả", count: orders.length },
    {
      value: "completed",
      label: "Hoàn Thành",
      count: orders.filter((o) => o.status === "completed").length,
    },
    {
      value: "processing",
      label: "Đang Xử Lý",
      count: orders.filter((o) => o.status === "processing").length,
    },
    {
      value: "cancelled",
      label: "Đã Hủy",
      count: orders.filter((o) => o.status === "cancelled").length,
    },
  ];

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
            <span className="text-amber-700 font-medium">Lịch Sử Đơn Hàng</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Lịch Sử Đơn Hàng
          </h1>
          <p className="text-xl text-gray-600">
            Theo dõi và quản lý các đơn hàng của bạn
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Status Filter */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Filter className="w-4 h-4 inline mr-2" />
                Lọc theo trạng thái
              </label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedStatus(option.value)}
                    className={`px-4 py-2 rounded-2xl font-medium transition-all duration-300 ${
                      selectedStatus === option.value
                        ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                    }`}
                  >
                    {option.label} ({option.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Search className="w-4 h-4 inline mr-2" />
                Tìm kiếm
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm theo mã đơn, tên khách hàng, món ăn..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-12 text-center border border-gray-100">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                Không tìm thấy đơn hàng
              </h3>
              <p className="text-gray-500 mb-6">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
              <Link to="/menu">
                <button className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-2xl hover:shadow-lg transition-all duration-300">
                  Đặt Hàng Ngay
                </button>
              </Link>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-800 text-lg">
                          #{order.id}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            order.status
                          )} flex items-center gap-1`}
                        >
                          {getStatusIcon(order.status)}
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(order.date).toLocaleDateString("vi-VN")} -{" "}
                          {order.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{order.customerName}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <CreditCard className="w-4 h-4" />
                        <span>{order.payment}</span>
                      </div>
                    </div>

                    {/* Items Preview */}
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Coffee className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-medium text-gray-700">
                          {order.items.length} món •{" "}
                          {order.items.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                          )}{" "}
                          sản phẩm
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {order.items.slice(0, 3).map((item, index) => (
                          <span
                            key={index}
                            className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-lg"
                          >
                            {item.name} x{item.quantity}
                          </span>
                        ))}
                        {order.items.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                            +{order.items.length - 3} món khác
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    {order.rating > 0 && (
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < order.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({order.rating}/5)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Total and Actions */}
                  <div className="flex flex-col items-end gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-700">
                        {order.total.toLocaleString("vi-VN")}₫
                      </div>
                      {order.status === "cancelled" && order.cancelReason && (
                        <div className="text-xs text-red-600 mt-1">
                          Lý do: {order.cancelReason}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        Chi Tiết
                      </button>
                      {order.status === "completed" && (
                        <button
                          onClick={() => handleReorder(order)}
                          className="flex items-center gap-2 px-4 py-2 border border-amber-600 text-amber-600 rounded-xl hover:bg-amber-50 transition-colors text-sm"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Đặt Lại
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link to="/">
            <button className="flex items-center gap-2 mx-auto px-6 py-3 bg-gray-600 text-white rounded-2xl hover:bg-gray-700 transition-colors">
              <Home className="w-5 h-5" />
              Về Trang Chủ
            </button>
          </Link>
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  Chi Tiết Đơn Hàng
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <XCircle className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Order Header */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    #{selectedOrder.id}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                      selectedOrder.status
                    )} flex items-center gap-1`}
                  >
                    {getStatusIcon(selectedOrder.status)}
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>
                      <strong>Ngày:</strong>{" "}
                      {new Date(selectedOrder.date).toLocaleDateString("vi-VN")}{" "}
                      - {selectedOrder.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-600" />
                    <span>
                      <strong>Khách hàng:</strong> {selectedOrder.customerName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-600" />
                    <span>
                      <strong>SĐT:</strong> {selectedOrder.phoneNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-600" />
                    <span>
                      <strong>Thanh toán:</strong> {selectedOrder.payment}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>
                      <strong>Giờ nhận:</strong> {selectedOrder.pickupTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-amber-600" />
                  Chi Tiết Món Ăn
                </h4>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800">
                          {item.name}
                        </h5>
                        {item.note && (
                          <p className="text-sm text-gray-600">
                            Ghi chú: {item.note}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-600">
                            Số lượng: {item.quantity}
                          </span>
                          <span className="font-bold text-amber-700">
                            {(item.price * item.quantity).toLocaleString(
                              "vi-VN"
                            )}
                            ₫
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-800">
                    Tổng Cộng:
                  </span>
                  <span className="text-2xl font-bold text-green-700">
                    {selectedOrder.total.toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </div>

              {/* Rating and Review */}
              {selectedOrder.rating > 0 && (
                <div className="bg-yellow-50 rounded-2xl p-6 mb-6">
                  <h4 className="font-bold text-gray-800 mb-3">Đánh Giá</h4>
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < selectedOrder.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600">
                      ({selectedOrder.rating}/5)
                    </span>
                  </div>
                  {selectedOrder.review && (
                    <p className="text-gray-700 italic">
                      &quot;{selectedOrder.review}&quot;
                    </p>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                {selectedOrder.status === "completed" && (
                  <button
                    onClick={() => {
                      handleReorder(selectedOrder);
                      setShowModal(false);
                    }}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Đặt Lại Đơn Hàng
                  </button>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-600 text-white py-3 rounded-2xl hover:bg-gray-700 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
