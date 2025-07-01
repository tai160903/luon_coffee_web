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
import formatCurrency from "../../utils/formatCurrency";
import formatTime from "../../utils/formatTime";
import { toast } from "react-toastify";
import formatDateTime from "../../utils/formatDateTime";

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState("NEW");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const statusOptions = [
    { id: "NEW", name: "Mới", color: "bg-yellow-100 text-yellow-800" },
    {
      id: "CONFIRMED",
      name: "Đã Xác Nhận",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "PREPARING",
      name: "Đang Chuẩn Bị",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "READYFORPICKUP",
      name: "Sẵn Sàng",
      color: "bg-green-100 text-green-800",
    },
    {
      id: "COMPLETED",
      name: "Hoàn Thành",
      color: "bg-emerald-100 text-emerald-800",
    },
    { id: "CANCELLED", name: "Đã Hủy", color: "bg-red-100 text-red-800" },
  ];

  const STATUS = {
    CODE_TO_STRING: {
      0: "NEW",
      1: "CONFIRMED",
      2: "PREPARING",
      3: "READYFORPICKUP",
      4: "COMPLETED",
      5: "CANCELLED",
    },
    STRING_TO_CODE: {
      NEW: 0,
      CONFIRMED: 1,
      PREPARING: 2,
      READYFORPICKUP: 3,
      COMPLETED: 4,
      CANCELLED: 5,
    },
    NEXT: {
      NEW: "NEW",
      CONFIRMED: "CONFIRMED",
      PREPARING: "PREPARING",
      READYFORPICKUP: "COMPLETED",
      COMPLETED: "COMPLETED",
      CANCELLED: "CANCELLED",
    },
    NEXT_TEXT: {
      NEW: "Xác Nhận",
      CONFIRMED: "Bắt Đầu",
      PREPARING: "Sẵn Sàng",
      READY: "Hoàn Thành",
      READYFORPICKUP: "Hoàn Thành",
    },
    ICON: {
      NEW: <Clock className="w-4 h-4" />,
      CONFIRMED: <AlertCircle className="w-4 h-4" />,
      PREPARING: <RefreshCw className="w-4 h-4" />,
      READY: <CheckCircle className="w-4 h-4" />,
      READYFORPICKUP: <CheckCircle className="w-4 h-4" />,
      COMPLETED: <CheckCircle className="w-4 h-4" />,
      CANCELLED: <XCircle className="w-4 h-4" />,
    },
    isFinalState: (status) => ["COMPLETED", "CANCELLED"].includes(status),
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const data = await orderService.getAllOrders();
      const mappedOrders = mapOrdersData(data.data || []);
      setOrders(mappedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const mapOrdersData = (ordersData) => {
    return ordersData.map((order) => ({
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
      discount: order.discountPrice || 0,
      subtotal: order.totalAmount || 0,
      status: order.status ? order.status.toUpperCase() : "",
      orderTime: order.createAt,
      estimatedTime: "",
      paymentMethod: order.payment || "",
      qrCode: order.qRcode || "",
      notes: "",
    }));
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = order.status === selectedStatus;
    const matchesSearch =
      !searchQuery ||
      [order.orderNumber, order.customer.name, order.customer.phone].some(
        (field) => field.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find((option) => option.id === status);
    return statusOption ? statusOption.color : "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status) => {
    return STATUS.ICON[status] || <AlertCircle className="w-4 h-4" />;
  };

  const updateOrderToNextStatus = async (order) => {
    try {
      setIsLoading(true);

      const nextStatus = STATUS.NEXT[order.status];
      if (nextStatus === order.status) {
        return;
      }
      const statusCode = STATUS.STRING_TO_CODE[nextStatus];
      const res = await orderService.updateStatus(order.id, statusCode);
      if (res) {
        await fetchOrders();
      }
    } catch (error) {
      toast.error("Cập nhật trạng thái đơn hàng thất bại!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get payment method display text
  const getPaymentMethodDisplay = (method) => {
    if (!method) return "";

    switch (method) {
      case "WALLET":
        return "Ví điện tử";
      case "PAYOS":
        return "PayOS";
      default:
        return method;
    }
  };

  // Get next status action button text
  const getNextStatusText = (currentStatus) => {
    return STATUS.NEXT_TEXT[currentStatus] || "";
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-amber-50 to-white overflow-hidden px-4 py-2">
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
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản Lý Đơn Hàng</h1>
          <p className="text-gray-600 text-sm">Theo dõi và xử lý đơn hàng</p>
        </div>
        <button className="bg-amber-600 text-white px-4 py-2 rounded-xl hover:bg-amber-700 transition-colors text-sm">
          Tạo Đơn Hàng Mới
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 mb-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo mã đơn, tên KH, SĐT..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border-2 border-gray-200 focus:border-amber-500 focus:outline-none text-sm"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-1 overflow-x-auto">
            {statusOptions.map((status) => (
              <button
                key={status.id}
                onClick={() => setSelectedStatus(status.id)}
                className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-300 text-xs ${
                  selectedStatus === status.id
                    ? "bg-amber-600 text-white shadow-md"
                    : `${status.color} hover:shadow-sm`
                }`}
              >
                {status.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List - Changed from grid to flex with wrap */}
      <div className="flex-1 overflow-auto pb-2">
        <div
          className="grid grid-cols-1 gap-4 auto-rows-max"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gridAutoRows: "min-content",
          }}
        >
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow max-w-md"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-base font-bold text-gray-800">
                    #{order.orderNumber}
                  </h3>
                  <p className="text-xs text-gray-600">{order.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    {statusOptions.find((s) => s.id === order.status)?.name ||
                      order.status}
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="mb-2 p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-3 h-3 text-gray-600" />
                  <span className="font-medium text-gray-800 text-sm">
                    {order.customer.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Phone className="w-3 h-3" />
                  <span>{order.customer.phone}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-2">
                <h4 className="font-semibold text-gray-800 text-sm mb-1">
                  Món đã đặt:
                </h4>
                <div className="space-y-1">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <div className="flex-1 mr-2 truncate">
                        <span className="text-gray-800 truncate">
                          {item.name}
                        </span>
                        <span className="text-gray-600"> x{item.quantity}</span>
                      </div>
                      <span className="text-gray-600 whitespace-nowrap">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="text-xs text-amber-600">
                      +{order.items.length - 3} món khác
                    </div>
                  )}
                </div>
              </div>

              {/* Order Details */}
              <div className="mb-2 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Thời gian đặt:</span>
                  <span className="text-gray-800">
                    {formatTime(order.orderTime)}
                  </span>
                </div>
                {order.paymentMethod && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thanh toán:</span>
                    <span className="text-gray-800 font-medium">
                      {getPaymentMethodDisplay(order.paymentMethod)}
                    </span>
                  </div>
                )}
                {order.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giảm giá:</span>
                    <span className="text-red-500">
                      -{formatCurrency(order.discount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-bold">
                  <span className="text-gray-800">Tổng cộng:</span>
                  <span className="text-amber-700">
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-1 mt-2">
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowOrderModal(true);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-1 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1 text-xs"
                >
                  <Eye className="w-3 h-3" />
                  Chi Tiết
                </button>

                {/* Only show next status button if not in final states */}
                {order.status !== "COMPLETED" &&
                  order.status !== "CANCELLED" && (
                    <button
                      onClick={() => updateOrderToNextStatus(order)}
                      className="flex-1 bg-amber-500 text-white py-1 rounded-lg hover:bg-amber-600 transition-colors text-xs"
                    >
                      {getNextStatusText(order.status)}
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-1">
            Không có đơn hàng nào
          </h3>
          <p className="text-gray-500 text-sm">
            Không tìm thấy đơn hàng phù hợp với bộ lọc hiện tại
          </p>
        </div>
      )}

      {/* Order Detail Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Chi Tiết Đơn Hàng #{selectedOrder.orderNumber}
              </h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Detailed order information */}
            <div className="space-y-4">
              {/* Order Status & Info */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex flex-wrap justify-between items-center mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {getStatusIcon(selectedOrder.status)}
                    {statusOptions.find((s) => s.id === selectedOrder.status)
                      ?.name || selectedOrder.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    Mã đơn: {selectedOrder.orderNumber}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <div>
                      <span className="text-gray-600">Thời gian đặt: </span>
                      <span className="text-gray-800">
                        {formatDateTime(selectedOrder.orderTime)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center text-gray-600">
                      ₫
                    </div>
                    <div>
                      <span className="text-gray-600">
                        Phương thức thanh toán:{" "}
                      </span>
                      <span className="text-gray-800 font-medium">
                        {getPaymentMethodDisplay(selectedOrder.paymentMethod)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-bold text-gray-800 mb-2 text-sm">
                  Thông Tin Khách Hàng
                </h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">
                      {selectedOrder.customer.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">
                      {selectedOrder.customer.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-bold text-gray-800 mb-2 text-sm">
                  Chi Tiết Đơn Hàng
                </h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-gray-600">
                          Số lượng: {item.quantity}
                        </div>
                        {item.notes && (
                          <div className="text-xs text-gray-500 italic">
                            Ghi chú: {item.notes}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                        <div className="text-xs text-gray-600">
                          {formatCurrency(item.price)} x {item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="mt-4 space-y-1 border-t pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="text-gray-800">
                      {formatCurrency(selectedOrder.subtotal)}
                    </span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Giảm giá:</span>
                      <span className="text-red-500">
                        -{formatCurrency(selectedOrder.discount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold border-t border-dashed border-gray-200 pt-2 mt-2">
                    <span>Tổng thanh toán:</span>
                    <span className="text-amber-600">
                      {formatCurrency(selectedOrder.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* QR Code if available */}
              {selectedOrder.qrCode && (
                <div className="flex flex-col items-center">
                  <h4 className="font-bold text-gray-800 mb-2 text-sm">
                    Mã QR
                  </h4>
                  <div className="bg-white p-2 border border-gray-200 rounded-md">
                    <img
                      src={selectedOrder.qrCode}
                      alt="QR Code"
                      className="w-40 h-40"
                    />
                  </div>
                </div>
              )}

              {/* Status Update Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                >
                  Đóng
                </button>
                {selectedOrder.status !== "COMPLETED" &&
                  selectedOrder.status !== "CANCELLED" && (
                    <button
                      onClick={() => {
                        updateOrderToNextStatus(selectedOrder);
                        setShowOrderModal(false);
                      }}
                      className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm"
                    >
                      {getNextStatusText(selectedOrder.status)}
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
