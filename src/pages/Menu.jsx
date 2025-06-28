"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Coffee,
  Leaf,
  UtensilsCrossed,
  Cookie,
  ArrowRight,
} from "lucide-react";
import ProductService from "../services/product.service";
import formatCurrency from "../utils/formatCurrency";

function Menu() {
  const [activeCategory, setActiveCategory] = useState("coffee");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      setProducts([]);
    }
  };

  console.log("Products:", products);
  const categories = [
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

  // Enhanced menu items data
  const menuItems = [
    // Coffee
    {
      id: 1,
      category: "coffee",
      name: "Cà Phê Phin Truyền Thống",
      nameEn: "Vietnamese Drip Coffee",
      description: "Cà phê Việt Nam truyền thống pha bằng phin với sữa đặc",
      price: 25000,
      popular: true,
      time: "5-7 phút",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      category: "coffee",
      name: "Cà Phê Đá",
      nameEn: "Iced Coffee",
      description: "Cà phê Việt Nam mát lạnh, thơm ngon giải khát",
      price: 28000,
      popular: true,
      time: "3-5 phút",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      category: "coffee",
      name: "Cà Phê Dừa",
      nameEn: "Coconut Coffee",
      description: "Cà phê pha với kem dừa tươi, hương vị nhiệt đới",
      price: 32000,
      time: "5-7 phút",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      category: "coffee",
      name: "Cà Phê Trứng",
      nameEn: "Egg Coffee",
      description: "Lớp kem trứng béo ngậy trên nền cà phê đậm đà",
      price: 35000,
      time: "7-10 phút",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      category: "coffee",
      name: "Cà Phê Sữa Nóng",
      nameEn: "Hot Milk Coffee",
      description: "Cà phê nóng với sữa tươi, ấm áp và thơm ngon",
      price: 30000,
      time: "3-5 phút",
      image: "/placeholder.svg?height=200&width=300",
    },

    // Tea
    {
      id: 6,
      category: "tea",
      name: "Trà Xanh",
      nameEn: "Green Tea",
      description: "Trà xanh Việt Nam truyền thống, thanh mát",
      price: 20000,
      time: "3-5 phút",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 7,
      category: "tea",
      name: "Trà Sen",
      nameEn: "Lotus Tea",
      description: "Trà thơm với hương sen tự nhiên, thanh khiết",
      price: 25000,
      popular: true,
      time: "5-7 phút",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 8,
      category: "tea",
      name: "Trà Gừng",
      nameEn: "Ginger Tea",
      description: "Trà gừng tươi, ấm bụng và tốt cho sức khỏe",
      price: 22000,
      time: "5-7 phút",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 9,
      category: "tea",
      name: "Trà Đá",
      nameEn: "Iced Tea",
      description: "Trà đá mát lạnh, giải khát tuyệt vời",
      price: 18000,
      time: "2-3 phút",
      image: "/placeholder.svg?height=200&width=300",
    },

    // Food
    {
      id: 10,
      category: "food",
      name: "Bánh Mì Thịt Nướng",
      nameEn: "Grilled Pork Bánh Mì",
      description: "Bánh mì Việt Nam với thịt nướng thơm ngon",
      price: 45000,
      popular: true,
      time: "5-8 phút",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 11,
      category: "food",
      name: "Gỏi Cuốn",
      nameEn: "Fresh Spring Rolls",
      description: "Gỏi cuốn tươi với tôm, thịt và rau thơm",
      price: 35000,
      time: "3-5 phút",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 12,
      category: "food",
      name: "Phở Bò",
      nameEn: "Beef Phở",
      description: "Phở bò truyền thống với nước dùng đậm đà",
      price: 65000,
      popular: true,
      time: "10-12 phút",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 13,
      category: "food",
      name: "Bún Chả",
      nameEn: "Grilled Pork with Noodles",
      description: "Bún chả Hà Nội với thịt nướng thơm lừng",
      price: 55000,
      time: "8-10 phút",
      image: "/placeholder.svg?height=200&width=300",
    },

    // Desserts
    {
      id: 14,
      category: "desserts",
      name: "Chè Ba Màu",
      nameEn: "Three-Color Dessert",
      description: "Chè ba màu truyền thống với đậu, thạch và nước cốt dừa",
      price: 30000,
      time: "2-3 phút",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 15,
      category: "desserts",
      name: "Bánh Flan",
      nameEn: "Vietnamese Flan",
      description: "Bánh flan kiểu Việt với caramel thơm ngon",
      price: 25000,
      popular: true,
      time: "2-3 phút",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 16,
      category: "desserts",
      name: "Chè Đậu Xanh",
      nameEn: "Mung Bean Dessert",
      description: "Chè đậu xanh mát lạnh, ngọt dịu",
      price: 28000,
      time: "2-3 phút",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  // Filter items by active category
  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory
  );
  const activecat = categories.find((cat) => cat.id === activeCategory);

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50 min-h-screen">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Coffee className="w-4 h-4 text-amber-300" />
            <span className="text-white/90 text-sm font-medium">
              Thực Đơn Đặc Biệt
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Thực Đơn{" "}
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              Cà Phê Việt
            </span>
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto leading-relaxed">
            Khám phá hương vị đậm đà của cà phê và ẩm thực Việt Nam truyền thống
          </p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-lg shadow-lg z-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto py-6 gap-4 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`group flex items-center gap-3 px-6 py-4 rounded-2xl whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : "bg-white text-gray-700 hover:bg-amber-50 border border-gray-200 hover:border-amber-200"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 group-hover:text-amber-600"
                    }`}
                  />
                  <span className="font-medium">{category.name}</span>
                  {isActive && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Category Header */}
        <div className="flex items-center gap-4 mb-8">
          {activecat && (
            <>
              <div
                className={`w-12 h-12 bg-gradient-to-r ${activecat.color} rounded-2xl flex items-center justify-center`}
              >
                <activecat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {activecat.name}
                </h2>
                <p className="text-gray-600">
                  {filteredItems.length} món có sẵn
                </p>
              </div>
            </>
          )}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((item) => (
            <Link
              to={`/details/${item.id}`}
              key={item.id}
              className="group block transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-amber-200">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-amber-100 to-amber-200 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-amber-700 transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-amber-700">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center gap-2">
                    Đặt Món
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Không có món nào
            </h3>
            <p className="text-gray-500">
              Hiện tại chưa có món nào trong danh mục này
            </p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 py-16 px-4 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Coffee className="w-4 h-4" />
            Ghé Thăm Chúng Tôi
          </div>

          <h2 className="text-4xl font-bold text-white mb-4">
            Trải Nghiệm Hương Vị Chính Hiệu
          </h2>
          <p className="text-xl text-amber-100 mb-8 leading-relaxed max-w-2xl mx-auto">
            Đến với quán cà phê để thưởng thức cà phê và ẩm thực Việt Nam trong
            không gian ấm cúng, thân thiện cùng gia đình và bạn bè.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/location"
              className="group inline-flex items-center gap-2 bg-white text-amber-800 font-bold py-4 px-8 rounded-full hover:bg-amber-50 transition-all duration-300 transform hover:scale-105"
            >
              Tìm Địa Chỉ Quán
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-amber-800 transition-all duration-300"
            >
              Liên Hệ Đặt Bàn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
