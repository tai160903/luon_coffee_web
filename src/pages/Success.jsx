"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  Coffee,
  Receipt,
  ArrowRight,
  Sparkles,
  Clock,
  User,
  Phone,
  CreditCard,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSilce";
import userService from "../services/user.service";
import { updateUser } from "../redux/authSlice";
import orderService from "../services/order.service";

export default function SuccessPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("orderData");
    if (stored) {
      try {
        setOrderData(JSON.parse(stored));
      } catch {
        setOrderData(null);
      }
    } else {
      const params = new URLSearchParams(location.search);
      const orderCode = params.get("orderCode");
      if (orderCode) {
        (async () => {
          try {
            const data = await orderService.getOrderById(orderCode);
            setOrderData(data);
          } catch (error) {
            setOrderData(null);
          }
        })();
      }
    }
  }, [location.search]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user profile...");
        const res = await userService.getProfile();
        console.log("User profile response:", res.data.data);
        dispatch(updateUser(res.data.data));
        localStorage.setItem("user", JSON.stringify(res.data.data));
      } catch (e) {
        console.error("Failed to fetch user profile:", e.message);
      }
    };
    fetchUser();
    dispatch(clearCart());
  }, [dispatch]);

  const orderNumber = orderData?.code;
  const amount = orderData?.finalPrice;
  const customerName = orderData?.customerName || orderData?.fullName;
  const estimatedTime = "15-20 phút";
  const type = "order";

  const getContent = () => {
    switch (type) {
      case "order":
        return {
          title: "🎉 Đặt hàng thành công!",
          subtitle: "Cảm ơn bạn đã tin tưởng Cà Phê Việt",
          icon: <Coffee className="w-24 h-24 text-amber-500 drop-shadow-lg" />,
          details: [
            {
              label: "Mã đơn hàng",
              value: orderNumber,
              icon: <Receipt className="w-4 h-4 text-blue-500" />,
            },
            {
              label: "Khách hàng",
              value: customerName,
              icon: <User className="w-4 h-4 text-purple-500" />,
            },
            {
              label: "Tổng tiền",
              value: amount?.toLocaleString("vi-VN") + " VND",
              icon: <CreditCard className="w-4 h-4 text-green-500" />,
            },
            {
              label: "Trạng thái",
              value: orderData?.status || "Đang chuẩn bị",
              icon: <Clock className="w-4 h-4 text-orange-500" />,
            },
            {
              label: "Số điện thoại",
              value: orderData?.phoneNumber,
              icon: <Phone className="w-4 h-4 text-indigo-500" />,
            },
            {
              label: "Phương thức",
              value: orderData?.payment,
              icon: <CreditCard className="w-4 h-4 text-teal-500" />,
            },
            {
              label: "Thời gian chuẩn bị",
              value: estimatedTime,
              icon: <Clock className="w-4 h-4 text-red-500" />,
            },
          ],
        };
      default:
        return {
          title: "✨ Thành công!",
          subtitle: "Thao tác đã được thực hiện thành công",
          icon: (
            <CheckCircle className="w-24 h-24 text-green-500 drop-shadow-lg" />
          ),
          details: [],
        };
    }
  };

  const content = getContent();

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full opacity-20 animate-pulse blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-200 to-green-300 rounded-full opacity-20 animate-pulse delay-1000 blur-3xl"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full opacity-30 animate-bounce delay-500"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-30 animate-bounce delay-1000"></div>

        {/* Floating Coffee Beans */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-amber-600 rounded-full opacity-40 animate-ping delay-300"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-amber-700 rounded-full opacity-40 animate-ping delay-700"></div>
        <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-amber-800 rounded-full opacity-40 animate-ping delay-1000"></div>
      </div>

      {/* Enhanced Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-3 h-3 rounded-full animate-bounce ${
                i % 5 === 0
                  ? "bg-green-400"
                  : i % 5 === 1
                  ? "bg-amber-400"
                  : i % 5 === 2
                  ? "bg-emerald-400"
                  : i % 5 === 3
                  ? "bg-teal-400"
                  : "bg-lime-400"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1.5 + Math.random() * 2}s`,
              }}
            />
          ))}
          {/* Sparkles */}
          {[...Array(15)].map((_, i) => (
            <Sparkles
              key={`sparkle-${i}`}
              className="absolute w-6 h-6 text-yellow-400 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="w-full max-w-4xl shadow-2xl border-0 bg-white/95 backdrop-blur-md relative z-10 overflow-hidden rounded-2xl">
        {/* Card Header Gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500"></div>

        <div className="p-8 md:p-12">
          {/* Success Icon with Animation */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-white to-gray-50 p-6 rounded-full shadow-lg animate-bounce">
                {content.icon}
              </div>
            </div>
          </div>

          {/* Title with Gradient Text */}
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 text-center">
            {content.title}
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 mb-10 text-xl text-center font-medium">
            {content.subtitle}
          </p>

          {/* Order Status Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 text-lg font-semibold shadow-lg rounded-full flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Đang chuẩn bị đơn hàng
            </div>
          </div>

          {/* Enhanced Details Section */}
          {content.details.length > 0 && (
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-inner mb-10 rounded-2xl">
              <div className="p-8">
                <h3 className="font-bold text-gray-800 mb-6 flex items-center justify-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <Receipt className="w-6 h-6 text-white" />
                  </div>
                  Chi tiết đơn hàng
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {content.details.map((detail, index) => (
                    <div
                      key={index}
                      className="group flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                          {detail.icon}
                        </div>
                        <span className="text-gray-600 font-medium">
                          {detail.label}
                        </span>
                      </div>
                      <span className="text-gray-800 font-bold text-right max-w-[200px] truncate">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/menu">
              <button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium">
                Đặt thêm
                <Coffee className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </Link>

            <Link to="/profile">
              <button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium">
                Theo dõi đơn hàng
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
