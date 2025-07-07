"use client";

import { useEffect, useState } from "react";
import {
  Loader,
  Eye,
  Package,
  User,
  Calendar,
  CreditCard,
  QrCode,
  X,
} from "lucide-react";
import orderService from "../../services/order.service";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const getStatusColor = (status) => {
  switch (status) {
    case "NEW":
      return "bg-green-100 text-green-800 border-green-200";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "CANCELLED":
      return "bg-red-100 text-red-800 border-red-200";
    case "READYFORPICKUP":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "COMPLETED":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await orderService.getAllOrders();
      setOrders(res.data || []);
    } catch (error) {
      setOrders([]);
    }
    setLoading(false);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && selectedOrder) {
        closeModal();
      }
    };

    if (selectedOrder) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedOrder]);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
          <p className="text-gray-600 mt-1">
            Theo dõi và quản lý tất cả đơn hàng
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-center items-center h-64 flex-col">
            <Loader className="w-12 h-12 text-amber-500 animate-spin mb-4" />
            <p className="text-lg text-gray-600">Đang tải đơn hàng...</p>
          </div>
        </div>
      ) : (
        /* Orders Table */
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Package className="w-5 h-5" />
              Danh sách đơn hàng
            </h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Mã đơn
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Khách hàng
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Ngày đặt
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Tổng tiền
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Trạng thái
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 font-medium">
                        {order.code || order.id}
                      </td>
                      <td className="py-4 px-4">
                        {order.customerName || order?.fullName}
                      </td>
                      <td className="py-4 px-4">
                        {order.createAt
                          ? new Date(order.createAt).toLocaleDateString("vi-VN")
                          : ""}
                      </td>
                      <td className="py-4 px-4 font-semibold">
                        {order.finalPrice
                          ? formatCurrency(order.finalPrice)
                          : ""}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                            order.status || "Chờ xử lý"
                          )}`}
                        >
                          {order.status || "Chờ xử lý"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-8 text-gray-500"
                      >
                        Không có đơn hàng nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Package className="w-6 h-6 text-amber-600" />
                Chi tiết đơn hàng #{selectedOrder?.code || selectedOrder?.id}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Information */}
              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Thông tin khách hàng
                  </h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Tên khách hàng</p>
                      <p className="font-semibold">
                        {selectedOrder.customerName || selectedOrder.fullName}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Số điện thoại</p>
                      <p className="font-semibold">
                        {selectedOrder.phoneNumber || "Chưa cập nhật"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    Thông tin đơn hàng
                  </h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Ngày đặt</p>
                      <p className="font-semibold">
                        {selectedOrder.createAt
                          ? new Date(selectedOrder.createAt).toLocaleString(
                              "vi-VN"
                            )
                          : ""}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Giờ nhận</p>
                      <p className="font-semibold">
                        {selectedOrder.pickUpTime
                          ? new Date(selectedOrder.pickUpTime).toLocaleString(
                              "vi-VN"
                            )
                          : "Chưa xác định"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Trạng thái</p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                          selectedOrder.status || "Chờ xử lý"
                        )}`}
                      >
                        {selectedOrder.status || "Chờ xử lý"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                    Thông tin thanh toán
                  </h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tổng tiền:</span>
                        <span className="font-semibold">
                          {selectedOrder.totalAmount
                            ? formatCurrency(selectedOrder.totalAmount)
                            : "0₫"}
                        </span>
                      </div>
                      {selectedOrder.discountPrice && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Giảm giá:</span>
                          <span className="font-semibold text-red-600">
                            -
                            {selectedOrder.discountPrice
                              ? formatCurrency(selectedOrder.discountPrice)
                              : "0₫"}
                          </span>
                        </div>
                      )}
                      <hr className="border-gray-200" />
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">
                          Thanh toán:
                        </span>
                        <span className="text-lg font-bold text-amber-600">
                          {selectedOrder.finalPrice
                            ? formatCurrency(selectedOrder.finalPrice)
                            : "0₫"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Phương thức:</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded border text-sm">
                          {selectedOrder.payment || "Chưa xác định"}
                        </span>
                      </div>
                    </div>

                    {selectedOrder.qRcode && (
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <QrCode className="w-4 h-4" />
                          QR Code thanh toán
                        </div>
                        <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
                          <img
                            src={selectedOrder.qRcode || "/placeholder.svg"}
                            alt="QR code"
                            className="w-32 h-32 object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              {selectedOrder.orderItems &&
                Array.isArray(selectedOrder.orderItems) && (
                  <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Package className="w-5 h-5 text-orange-600" />
                        Sản phẩm đã đặt ({selectedOrder.orderItems.length} món)
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2 px-3 font-medium text-gray-600">
                                Tên sản phẩm
                              </th>
                              <th className="text-center py-2 px-3 font-medium text-gray-600">
                                Số lượng
                              </th>
                              <th className="text-right py-2 px-3 font-medium text-gray-600">
                                Đơn giá
                              </th>
                              <th className="text-right py-2 px-3 font-medium text-gray-600">
                                Thành tiền
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedOrder.orderItems.map((item, idx) => (
                              <tr
                                key={idx}
                                className="border-b border-gray-100 hover:bg-amber-50 transition-colors"
                              >
                                <td className="py-2 px-3 font-medium">
                                  {item.name}
                                </td>
                                <td className="py-2 px-3 text-center">
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {item.quantity}
                                  </span>
                                </td>
                                <td className="py-2 px-3 text-right">
                                  {formatCurrency(item.unitPrice)}
                                </td>
                                <td className="py-2 px-3 text-right font-semibold text-amber-700">
                                  {formatCurrency(
                                    item.unitPrice * item.quantity
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Đóng
                </button>
                <button className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors">
                  In đơn hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
