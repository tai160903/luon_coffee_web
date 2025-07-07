import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Clock,
  ArrowRight,
  Coffee,
  Tag,
  Gift,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import cartService from "../services/cart.service";
import { removeFromCart, setCartInfo } from "../redux/slices/cartSlice";
import formatCurrency from "../utils/formatCurrency";
import { setCheckoutData } from "../redux/slices/orderSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);

  const [selectedPickupDate, setSelectedPickupDate] = useState("");
  const [selectedPickupTime, setSelectedPickupTime] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const response = await cartService.getCart();
      const items = response.data.cartItems || [];
      setCartItems(items);
      dispatch(setCartInfo({ cartItems: items }));
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
    setIsLoading(false);
  };

  // Generate next 7 days
  const generatePickupDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dateString = date.toISOString().split("T")[0];
      const displayDate =
        i === 0
          ? "Hôm nay"
          : i === 1
          ? "Ngày mai"
          : date.toLocaleDateString("vi-VN", {
              weekday: "long",
              day: "numeric",
              month: "numeric",
            });

      dates.push({ value: dateString, label: displayDate, date: date });
    }

    return dates;
  };

  const generateAvailableTimeSlots = (selectedDate) => {
    const times = [];
    const now = new Date();
    const selectedDateObj = new Date(selectedDate);
    const isToday = selectedDateObj.toDateString() === now.toDateString();

    // Khung giờ phục vụ: 7:00 - 12:00 và 17:00 - 22:00
    const timeRanges = [
      { startHour: 7, endHour: 12 },
      { startHour: 17, endHour: 22 },
    ];

    let startHour = 7;
    let startMinute = 0;

    if (isToday) {
      const minTime = new Date(now.getTime() + 30 * 60000); // +30 phút
      // Nếu đã qua 22h hoặc không còn khung giờ nào hợp lệ
      if (minTime.getHours() >= 22) return times;
      // Xác định khung giờ bắt đầu cho hôm nay
      let found = false;
      for (const range of timeRanges) {
        if (minTime.getHours() < range.endHour) {
          startHour = Math.max(range.startHour, minTime.getHours());
          startMinute =
            minTime.getHours() < range.startHour
              ? 0
              : Math.ceil(minTime.getMinutes() / 15) * 15;
          if (startMinute >= 60) {
            startHour += 1;
            startMinute = 0;
          }
          found = true;
          break;
        }
      }
      // Nếu không còn khung giờ nào hợp lệ
      if (!found || startHour >= 22) return times;
    }

    for (const range of timeRanges) {
      let hour = range.startHour;
      let minute = 0;
      // Nếu là hôm nay và khung giờ này là khung đầu tiên cần điều chỉnh startHour/startMinute
      if (
        isToday &&
        startHour >= range.startHour &&
        startHour < range.endHour
      ) {
        hour = startHour;
        minute = startMinute;
      }
      for (; hour < range.endHour; hour++) {
        let min = hour === startHour ? minute : 0;
        for (; min < 60; min += 15) {
          // Chỉ cho phép chọn thời gian còn lại và trước 22h, sau 30 phút hiện tại
          const slotTime = new Date(
            selectedDateObj.getFullYear(),
            selectedDateObj.getMonth(),
            selectedDateObj.getDate(),
            hour,
            min
          );
          if (
            (!isToday || slotTime > now) &&
            (!isToday || slotTime >= new Date(now.getTime() + 30 * 60000))
          ) {
            const timeString = `${hour.toString().padStart(2, "0")}:${min
              .toString()
              .padStart(2, "0")}`;
            times.push({ value: timeString, label: timeString });
          }
        }
      }
    }

    return times;
  };

  const pickupDates = generatePickupDates();
  const availableTimeSlots = selectedPickupDate
    ? generateAvailableTimeSlots(selectedPickupDate)
    : [];

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) {
      if (window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")) {
        await removeItem(id);
        dispatch(removeFromCart(id));
      }
      return;
    }
    try {
      const response = await cartService.updateCartItemQuantity(
        id,
        newQuantity
      );
      // Lấy cartItems từ response.data
      const items = response.data.cartItems || [];

      dispatch(
        setCartInfo({
          cartItems: items,
          totalAmount: response.data.totalAmount,
        })
      );
      setCartItems(items);
    } catch (error) {
      setCartItems((items) =>
        items.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = async (id) => {
    try {
      await cartService.deleteCartItem(id);
      setCartItems((items) => items.filter((item) => item.id !== id));
      dispatch(removeFromCart(id));
      toast.success("Xóa sản phẩm thành công!");
    } catch (error) {
      toast.error("Xóa sản phẩm thất bại. Vui lòng thử lại!");
    }
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoApplied(true);
    }
  };

  const removePromoCode = () => {
    setPromoApplied(false);
    setPromoCode("");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item?.customize?.price * item.quantity,
    0
  );
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const handleCheckout = () => {
    const orderData = {
      items: cartItems,
      subtotal,
      discount,
      total,
      pickupTime:
        selectedPickupDate && selectedPickupTime
          ? `${selectedPickupDate}T${selectedPickupTime}`
          : "",
      promoCode: promoApplied ? "WELCOME10" : null,
    };
    dispatch(setCheckoutData(orderData));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-lg text-amber-700 font-semibold">
            Đang tải giỏ hàng...
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-600 mb-8">
            <Link to="/" className="hover:text-amber-700 transition-colors">
              Trang Chủ
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-amber-700 font-medium">Giỏ Hàng</span>
          </div>

          {/* Empty Cart */}
          <div className="max-w-md mx-auto text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Giỏ Hàng Trống
            </h2>
            <p className="text-gray-600 mb-8">
              Bạn chưa có món nào trong giỏ hàng. Hãy khám phá thực đơn của
              chúng tôi!
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Coffee className="w-5 h-5" />
              Xem Thực Đơn
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-600 mb-8">
            <Link to="/" className="hover:text-amber-700 transition-colors">
              Trang Chủ
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-amber-700 font-medium">Giỏ Hàng</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Giỏ Hàng Của Bạn
            </h1>
            <p className="text-xl text-gray-600">
              Xem lại đơn hàng và chọn thời gian lấy hàng
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems?.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    {/* Item Image */}
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.imageProduct || "/placeholder.svg"}
                        alt={item?.customize?.product}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {item?.customize?.product}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Item Options */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                          {item?.customize?.size}
                        </span>
                        {item.temperature && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            {item.temperature}
                          </span>
                        )}
                      </div>

                      {/* Notes */}
                      {item?.customize?.note && (
                        <p className="text-sm text-gray-600 mb-3 italic">
                          Ghi chú: {item?.customize?.note}
                        </p>
                      )}

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded-2xl">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-2 hover:bg-gray-100 rounded-l-2xl transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="px-4 py-2 font-semibold min-w-[50px] text-center">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-gray-100 rounded-r-2xl transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-amber-700">
                            {formatCurrency(
                              item?.customize?.price * item?.quantity
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatCurrency(item?.customize?.price)} x{" "}
                            {item?.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Date and Time Selection */}
              <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Chọn Ngày & Giờ Lấy Hàng
                  </h3>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Chọn Ngày
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {pickupDates.map((date) => (
                      <button
                        key={date.value}
                        onClick={() => {
                          setSelectedPickupDate(date.value);
                          setSelectedPickupTime(""); // Reset time when date changes
                        }}
                        className={`p-3 rounded-2xl border-2 transition-all duration-300 text-sm font-medium ${
                          selectedPickupDate === date.value
                            ? "border-amber-500 bg-amber-50 text-amber-800"
                            : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50"
                        }`}
                      >
                        {date.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedPickupDate && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Chọn Giờ ({availableTimeSlots.length} khung giờ có sẵn)
                    </h4>
                    {availableTimeSlots.length > 0 ? (
                      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 max-h-48 overflow-y-auto">
                        {availableTimeSlots.map((time) => (
                          <button
                            key={time.value}
                            onClick={() => setSelectedPickupTime(time.value)}
                            className={`p-2 rounded-xl border-2 transition-all duration-300 text-sm font-medium ${
                              selectedPickupTime === time.value
                                ? "border-amber-500 bg-amber-50 text-amber-800"
                                : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50"
                            }`}
                          >
                            {time.label}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>Không có khung giờ nào khả dụng cho ngày này</p>
                        <p className="text-sm">Vui lòng chọn ngày khác</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Validation Messages */}
                {!selectedPickupDate && (
                  <div className="flex items-center gap-2 mt-4 text-amber-700">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Vui lòng chọn ngày lấy hàng</span>
                  </div>
                )}
                {selectedPickupDate && !selectedPickupTime && (
                  <div className="flex items-center gap-2 mt-4 text-amber-700">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Vui lòng chọn giờ lấy hàng</span>
                  </div>
                )}

                {/* Store Hours Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-800">
                      Giờ Phục Vụ
                    </span>
                  </div>
                  <div className="text-blue-700 text-sm space-y-1">
                    <p>Thứ 2 - Thứ 6: 8:00 - 22:00</p>
                    <p>Thứ 7 - Chủ Nhật: 8:00 - 22:00</p>
                    <p className="text-xs text-blue-600 mt-2">
                      * Cần ít nhất 30 phút để chuẩn bị đơn hàng
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 sticky top-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Tóm Tắt Đơn Hàng
                </h3>

                {/* In the order summary section, update the pickup time display */}
                {selectedPickupDate && selectedPickupTime && (
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100 mb-6">
                    <Clock className="w-5 h-5 text-blue-700 mt-0.5" />
                    <div>
                      <div className="font-semibold text-blue-800">
                        Thời Gian Lấy Hàng
                      </div>
                      <div className="text-sm text-blue-700">
                        {
                          pickupDates.find(
                            (d) => d.value === selectedPickupDate
                          )?.label
                        }{" "}
                        - {selectedPickupTime}
                      </div>
                    </div>
                  </div>
                )}

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-gray-600" />
                    <span className="font-semibold text-gray-800">
                      Mã Giảm Giá
                    </span>
                  </div>
                  {!promoApplied ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Nhập mã giảm giá"
                        className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                      />
                      <button
                        onClick={applyPromoCode}
                        className="px-6 py-3 bg-amber-600 text-white font-medium rounded-2xl hover:bg-amber-700 transition-colors"
                      >
                        Áp Dụng
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-green-600" />
                        <span className="text-green-800 font-medium">
                          WELCOME10
                        </span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính ({cartItems.length} món)</span>
                    <span>{subtotal.toLocaleString("vi-VN")}₫</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá (10%)</span>
                      <span>-{discount.toLocaleString("vi-VN")}₫</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Tổng cộng</span>
                      <span className="text-amber-700">
                        {total.toLocaleString("vi-VN")}₫
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/payment"
                  className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold transition-all duration-300 transform ${
                    selectedPickupDate && selectedPickupTime
                      ? "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white hover:scale-105"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    if (!selectedPickupDate || !selectedPickupTime) {
                      e.preventDefault();
                    } else {
                      handleCheckout();
                    }
                  }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Thanh Toán
                  <ArrowRight className="w-5 h-5" />
                </Link>

                {/* Continue Shopping */}
                <Link
                  to="/menu"
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-6 border-2 border-amber-200 text-amber-700 font-medium rounded-2xl hover:bg-amber-50 transition-all duration-300"
                >
                  <Coffee className="w-4 h-4" />
                  Tiếp Tục Mua Sắm
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
