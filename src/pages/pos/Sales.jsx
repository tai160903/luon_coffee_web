"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Coffee,
  UtensilsCrossed,
  Cookie,
  Leaf,
  ShoppingCart,
  CreditCard,
  Banknote,
  Smartphone,
  User,
  CheckCircle,
  X,
  Filter,
} from "lucide-react";
import ProductService from "../../services/product.service";
import sizeService from "../../services/size.service";
import formatCurrency from "../../utils/formatCurrency";

const POS = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [currentOrder, setCurrentOrder] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tableNumber, setTableNumber] = useState(""); // Thêm state cho số bàn

  // Thêm state cho tuỳ chỉnh giống trang Detail
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  // Giả lập size cho demo (có thể lấy từ API nếu có)

  const categories = [
    {
      id: "",
      name: "Tất cả",
      icon: Coffee, // Hoặc chọn icon phù hợp, ví dụ: Grid hoặc Layers
      color: "from-gray-400 to-gray-600",
    },
    {
      id: "coffee",
      name: "Cà Phê",
      icon: Coffee,
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "tea",
      name: "Trà",
      icon: Leaf,
      color: "from-green-500 to-green-600",
    },
    {
      id: "food",
      name: "Đồ Ăn",
      icon: UtensilsCrossed,
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "desserts",
      name: "Tráng Miệng",
      icon: Cookie,
      color: "from-pink-500 to-pink-600",
    },
  ];

  const todayStats = {
    totalSales: 2450000,
    ordersCount: 47,
    avgOrderValue: 52127,
    customersCount: 38,
  };

  // Lấy sản phẩm từ API khi mount
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Đảm bảo lấy đúng mảng sản phẩm từ
        const data = await ProductService.getProducts();
        setMenuItems(data.data || []);
      } catch (error) {
        setMenuItems([]);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  // Lọc sản phẩm theo danh mục và tìm kiếm
  const filteredItems = menuItems?.filter(
    (item) =>
      (activeCategory === "" || item.category === activeCategory) &&
      item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Lấy size từ API khi mở modal chi tiết
  useEffect(() => {
    if (showDetailModal) {
      const fetchSizes = async () => {
        try {
          const data = await sizeService.getSizes();
          setSelectedSize(data.data[0]);
          setSizes(data.data || []);
        } catch (error) {
          setSizes([]);
          setSelectedSize(null);
        }
      };
      fetchSizes();
    }
  }, [showDetailModal]);

  const addToOrder = (item) => {
    const existingItem = currentOrder.find(
      (orderItem) => orderItem.id === item.id
    );
    if (existingItem) {
      setCurrentOrder(
        currentOrder.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      );
    } else {
      setCurrentOrder([...currentOrder, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromOrder(id);
      return;
    }
    setCurrentOrder(
      currentOrder.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromOrder = (id) => {
    setCurrentOrder(currentOrder.filter((item) => item.id !== id));
  };

  const clearOrder = () => {
    setCurrentOrder([]);
    setCustomerInfo({ name: "", phone: "" });
  };

  const calculateTotal = () => {
    return currentOrder.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const processPayment = () => {
    if (currentOrder.length === 0) return;

    // Simulate payment processing
    alert(
      `Đơn hàng đã được xử lý!\nTổng: ${formatCurrency(
        calculateTotal()
      )}\nPhương thức: ${
        paymentMethod === "cash"
          ? "Tiền mặt"
          : paymentMethod === "card"
          ? "Thẻ"
          : "Ví điện tử"
      }`
    );
    clearOrder();
  };

  // Open detail modal when clicking a menu item
  const handleShowDetail = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
    setSelectedSize(sizes[0]);
    setQuantity(1);
    setNotes("");
  };

  // Tính tổng giá
  const calculateTotalPrice = () => {
    if (!selectedItem || !selectedSize) return 0;
    return (selectedItem.price + (selectedSize.extraPrice || 0)) * quantity;
  };

  // Thêm vào đơn hàng với tuỳ chỉnh
  const handleAddToOrder = () => {
    if (!selectedItem || !selectedSize) return;
    const orderItem = {
      ...selectedItem,
      size: selectedSize,
      notes,
      quantity,
      price: selectedItem.price + (selectedSize.extraPrice || 0),
    };
    addToOrder(orderItem);
    setShowDetailModal(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-lg text-amber-700 font-semibold">
            Đang tải thực đơn...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-amber-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-amber-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl flex items-center justify-center">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                POS - Cà Phê Việt
              </h1>
              <p className="text-gray-600">Hệ thống bán hàng</p>
            </div>
          </div>

          {/* Today Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-700">
                {todayStats.ordersCount}
              </div>
              <div className="text-sm text-gray-600">Đơn hàng</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">
                {(todayStats.totalSales / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-600">Doanh thu</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">
                {todayStats.customersCount}
              </div>
              <div className="text-sm text-gray-600">Khách hàng</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Menu Section */}
        <div className="flex-1 p-6">
          {/* Search and Categories */}
          <div className="mb-6">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm món..."
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <button className="px-6 py-3 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 ${
                      activeCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleShowDetail(item)}
                className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                <div className="w-full h-24 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl mb-3 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-sm">
                  {item.name}
                </h3>
                <div className="text-amber-700 font-bold">
                  {formatCurrency(item.price)}
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* Order Section */}
        <div className="w-96 bg-white shadow-2xl border-l border-gray-200 flex flex-col">
          {/* Order Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Đơn Hàng Hiện Tại
              </h2>
              {currentOrder.length > 0 && (
                <button
                  onClick={clearOrder}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Customer Info */}
            <button
              onClick={() => setShowCustomerModal(true)}
              className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
            >
              <User className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <div className="font-medium text-gray-800">
                  {customerInfo.name || "Khách hàng"}
                </div>
                <div className="text-sm text-gray-600">
                  {customerInfo.phone || "Thêm thông tin"}
                </div>
              </div>
            </button>

            {/* Chọn số bàn */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Số đơn / Số bàn
              </label>
              <select
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
              >
                <option value="">Chọn số bàn</option>
                {[...Array(20)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Bàn {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Order Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {currentOrder.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Chưa có món nào</p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentOrder.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 text-sm">
                        {item.name}
                      </h4>
                      <div className="text-amber-700 font-bold text-sm">
                        {item.price.toLocaleString("vi-VN")}₫
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment Section */}
          {currentOrder.length > 0 && (
            <div className="p-6 border-t border-gray-200">
              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-2xl font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-amber-700">
                    {calculateTotal().toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Phương thức thanh toán
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod("cash")}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-colors ${
                      paymentMethod === "cash"
                        ? "bg-green-100 text-green-800 border-2 border-green-300"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Banknote className="w-6 h-6" />
                    <span className="text-xs">Tiền mặt</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-colors ${
                      paymentMethod === "card"
                        ? "bg-blue-100 text-blue-800 border-2 border-blue-300"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <CreditCard className="w-6 h-6" />
                    <span className="text-xs">Thẻ</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("ewallet")}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-colors ${
                      paymentMethod === "ewallet"
                        ? "bg-purple-100 text-purple-800 border-2 border-purple-300"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Smartphone className="w-6 h-6" />
                    <span className="text-xs">Ví điện tử</span>
                  </button>
                </div>
              </div>

              {/* Process Payment Button */}
              <button
                onClick={processPayment}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Thanh Toán
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Customer Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-96 max-w-[90vw]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Thông Tin Khách Hàng
              </h3>
              <button
                onClick={() => setShowCustomerModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên khách hàng
                </label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  placeholder="Nhập tên khách hàng"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <button
                onClick={() => setShowCustomerModal(false)}
                className="w-full bg-amber-600 text-white py-3 rounded-2xl hover:bg-amber-700 transition-colors"
              >
                Lưu Thông Tin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal for Customization */}
      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-96 max-w-[90vw] relative">
            <button
              onClick={() => setShowDetailModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center">
              <img
                src={selectedItem.image || "/placeholder.svg"}
                alt={selectedItem.name}
                className="w-32 h-32 object-cover rounded-xl mb-4"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {selectedItem.name}
              </h2>
              <div className="text-amber-700 font-bold text-lg mb-4">
                {formatCurrency(calculateTotalPrice())}
              </div>

              {/* Size Selection */}
              <div className="w-full mb-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Chọn Kích Cỡ
                </h3>
                <div className="flex gap-2">
                  {sizes?.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 px-3 py-2 rounded-xl border-2 transition-all duration-300 text-sm font-medium ${
                        selectedSize?.id === size.id
                          ? "border-amber-500 bg-amber-50 text-amber-800"
                          : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50"
                      }`}
                    >
                      <div>{size.name}</div>
                      {size.extraPrice > 0 && (
                        <div className="text-xs text-amber-700 font-medium">
                          +{formatCurrency(size.extraPrice)}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="w-full mb-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Ghi chú đặc biệt
                </h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Thêm ghi chú cho món này..."
                  className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none text-sm"
                  rows={2}
                  maxLength={100}
                />
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToOrder}
                className="w-full mt-2 bg-amber-600 text-white py-3 rounded-2xl hover:bg-amber-700 transition-colors font-semibold"
              >
                Thêm vào đơn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POS;
