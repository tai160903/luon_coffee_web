"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Smartphone,
  Wallet,
  Clock,
  User,
  Phone,
  CheckCircle,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import paymentService from "../services/payment.service"; // Change from orderService to paymentService
import formatCurrency from "../utils/formatCurrency";
import { toast } from "sonner";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [orderData, setOrderData] = useState({
    items: [],
    subtotal: 0,
    discount: 0,
    total: 0,
    pickupTime: "",
    orderNotes: "",
  });

  // Lấy dữ liệu order từ localStorage khi mount
  useEffect(() => {
    const localOrder = localStorage.getItem("orderData");
    if (localOrder) {
      try {
        const parsed = JSON.parse(localOrder);
        setOrderData({
          items: parsed.items || [],
          subtotal: parsed.subtotal || 0,
          discount: parsed.discount || 0,
          total: parsed.total || 0,
          pickupTime: parsed.pickupTime || "",
          orderNotes: parsed.orderNotes || "",
        });
      } catch {
        // fallback nếu lỗi parse
        setOrderData({
          items: [],
          subtotal: 0,
          discount: 0,
          total: 0,
          pickupTime: "",
          orderNotes: "",
        });
      }
    }
  }, []);

  console.log("Order Data:", orderData);
  const paymentMethods = [
    {
      id: "wallet",
      name: "Ví Của Tôi",
      description: "Thanh toán bằng số dư ví tài khoản",
      icon: Wallet,
      color: "from-green-500 to-green-600",
    },
    {
      id: "payos",
      name: "PayOS",
      description: "Thanh toán qua PayOS",
      icon: CreditCard, // You can replace with PayOS SVG/icon if available
      color: "from-blue-500 to-blue-600",
    },
  ];

  const handleInputChange = (section, field, value) => {
    if (section === "customer") {
      setCustomerInfo((prev) => ({ ...prev, [field]: value }));
    }
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!customerInfo.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ tên";
    }
    if (!customerInfo.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10,11}$/.test(customerInfo.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Prepare order payload
      const payload = {
        pickupTime: orderData.pickupTime,
        fullName: customerInfo.fullName,
        phoneNumber: customerInfo.phone,
      };

      let response;
      if (paymentMethod === "wallet") {
        response = await paymentService.payWithWallet(payload);
      } else if (paymentMethod === "payos") {
        response = await paymentService.payWithPayOS(payload);
      }

      setIsProcessing(false);

      if (response && response.success) {
        toast.success("Thanh toán thành công. Cảm ơn bạn đã mua hàng!", {
          duration: 5000,
        });
      } else {
        toast.error(
          response?.detail || "Đặt hàng thất bại. Vui lòng thử lại sau.",
          { duration: 5000 }
        );
      }
    } catch (error) {
      setIsProcessing(false);
      toast.error(
        "Đặt hàng thất bại. Vui lòng kiểm tra lại thông tin và thử lại.",
        { duration: 5000 }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-amber-700 transition-colors">
            Trang Chủ
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/cart" className="hover:text-amber-700 transition-colors">
            Giỏ Hàng
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-amber-700 font-medium">Thanh Toán</span>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Thanh Toán Đơn Hàng
          </h1>
          <p className="text-xl text-gray-600">
            Hoàn tất thông tin để xác nhận đơn hàng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-amber-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Thông Tin Khách Hàng
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ và Tên *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={customerInfo.fullName}
                      onChange={(e) =>
                        handleInputChange(
                          "customer",
                          "fullName",
                          e.target.value
                        )
                      }
                      className={`w-full px-4 py-4 pl-12 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                        errors.fullName
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                      }`}
                      placeholder="Nhập họ và tên"
                    />
                    <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  </div>
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số Điện Thoại *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        handleInputChange("customer", "phone", e.target.value)
                      }
                      className={`w-full px-4 py-4 pl-12 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                        errors.phone
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                      }`}
                      placeholder="Nhập số điện thoại"
                    />
                    <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-amber-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Phương Thức Thanh Toán
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                        paymentMethod === method.id
                          ? "border-amber-500 bg-amber-50"
                          : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-800 mb-2">
                        {method.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {method.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* E-wallet Options */}
              {paymentMethod === "ewallet" && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Chọn Ví Điện Tử
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {["MoMo", "ZaloPay", "VNPay"].map((wallet) => (
                      <button
                        key={wallet}
                        className="p-4 border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
                      >
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <Smartphone className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="font-medium text-gray-800">
                          {wallet}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Xác Nhận Đơn Hàng
              </h3>

              {/* Pickup Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <Clock className="w-5 h-5 text-blue-700 mt-0.5" />
                  <div>
                    <div className="font-semibold text-blue-800">
                      Thời Gian Lấy Hàng
                    </div>
                    <div className="text-sm text-blue-700">
                      {orderData.pickupTime
                        ? new Date(orderData.pickupTime).toLocaleString(
                            "vi-VN",
                            { dateStyle: "full", timeStyle: "short" }
                          )
                        : "Chưa chọn thời gian"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-800">Món Đã Đặt</h4>
                {orderData.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start text-sm"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        {item.customize.product}
                      </div>
                      <div className="text-gray-600">
                        {item.customize.size} • SL: {item.quantity}
                      </div>
                      {item.customize.note && (
                        <div className="text-gray-500 italic">
                          Ghi chú: {item.customize.note}
                        </div>
                      )}
                    </div>
                    <div className="font-medium text-gray-800 ml-4">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span>{formatCurrency(orderData.subtotal)}</span>
                </div>
                {orderData.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá</span>
                    <span>-{orderData.discount.toLocaleString("vi-VN")}₫</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Tổng cộng</span>
                    <span className="text-amber-700">
                      {orderData.total.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Đang Xử Lý...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Xác Nhận Đặt Hàng
                    </>
                  )}
                </button>

                <Link
                  to="/cart"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 border-2 border-gray-200 text-gray-700 font-medium rounded-2xl hover:bg-gray-50 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Quay Lại Giỏ Hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
