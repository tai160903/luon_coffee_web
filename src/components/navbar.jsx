"use client";

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Heart,
  MapPin,
  Phone,
  Clock,
  Coffee,
  Home,
  UtensilsCrossed,
  Info,
  Mail,
  Wallet,
  LogOut,
  Settings,
  UserCircle,
  Bell,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [localUser, setLocalUser] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy user từ localStorage để cập nhật ví khi reload
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLocalUser(JSON.parse(storedUser));
    }
  }, []);

  // Lấy user từ redux hoặc localStorage (ưu tiên redux nếu đã login)
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const walletBalance = user?.wallet ?? localUser?.wallet ?? 0;
  console.log("User wallet balance:", walletBalance);

  // Get cart items from Redux
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems?.length || 0;

  const getUserDisplayName = () => {
    if (user?.fullName) return user.fullName;
    return "Khách Hàng";
  };

  // Get user initials for avatar
  const getUserInitial = () => {
    if (user?.fullName && user.fullName.length > 0) {
      return user.fullName.charAt(0).toUpperCase();
    }
    if (user?.email && user.email.length > 0) {
      return user.email.charAt(0).toUpperCase();
    }
    return "K";
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Click outside to close user menu
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest(".user-menu-container")) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  // Navigation items
  const navItems = [
    { path: "/", name: "Trang Chủ", nameEn: "Home", icon: Home },
    { path: "/menu", name: "Thực Đơn", nameEn: "Menu", icon: UtensilsCrossed },
    { path: "/about", name: "Về Chúng Tôi", nameEn: "About", icon: Info },
    { path: "/contact", name: "Liên Hệ", nameEn: "Contact", icon: Mail },
  ];

  const isActive = (path) => location.pathname === path;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
    navigate("/");
  };

  return (
    <>
      <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white py-2 px-4 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Mở cửa: 7:00 - 12:00 | 17:00 - 22:00</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>0927 363 868</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="hidden sm:inline">
              22 Khổng Tử, Bình Thọ, Thủ Đức, Hồ Chí Minh, Việt Nam
            </span>
          </div>
        </div>
      </div>

      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-amber-100"
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold text-gray-800 group-hover:text-amber-700 transition-colors ">
                  Lượn cafe
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg"
                        : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Wallet - Only show if authenticated */}
              {isAuthenticated && (
                <div
                  to="/wallet"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-all duration-300 border border-gray-200 hover:border-green-200"
                >
                  <Wallet className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {formatCurrency(walletBalance)}
                  </span>
                </div>
              )}

              {/* Cart */}
              <Link
                to="/cart"
                className="p-3 text-gray-600 hover:text-amber-700 hover:bg-amber-50 rounded-full transition-all duration-300 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Account - Show different options based on auth status */}
              {!isAuthenticated ? (
                // Not logged in - show login/register buttons
                <div className="hidden sm:flex gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-amber-700 hover:bg-amber-50 rounded-full transition-all duration-300 border border-amber-200 hover:border-amber-300"
                  >
                    Đăng Nhập
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full hover:from-amber-700 hover:to-amber-800 transition-all duration-300"
                  >
                    Đăng Ký
                  </Link>
                </div>
              ) : (
                // Logged in - show user menu
                <div className="relative user-menu-container">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-full transition-all duration-300 border border-transparent hover:border-amber-200"
                  >
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-medium">
                      {getUserInitial()}
                    </div>
                    <span className="hidden md:block font-medium">
                      {getUserDisplayName()}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* User dropdown menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {getUserDisplayName()}
                        </p>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                        >
                          <UserCircle className="w-5 h-5" />
                          <span>Tài Khoản Của Tôi</span>
                        </Link>

                        <Link
                          to="/orders-history"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          <span>Đơn Hàng</span>
                        </Link>

                        <Link
                          to="/notifications"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                        >
                          <Bell className="w-5 h-5" />
                          <span>Thông Báo</span>
                        </Link>

                        <Link
                          to="/settings"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                        >
                          <Settings className="w-5 h-5" />
                          <span>Cài Đặt</span>
                        </Link>
                      </div>

                      <div className="py-1 border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Đăng Xuất</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-3 text-gray-600 hover:text-amber-700 hover:bg-amber-50 rounded-full transition-all duration-300"
              >
                {isOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-white border-t border-amber-100 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <div className="mb-4 md:hidden">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm món ăn, đồ uống..."
                    className="w-full px-4 py-3 pl-10 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              {/* Mobile Navigation Items */}
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-medium transition-all duration-300 ${
                        isActive(item.path)
                          ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg"
                          : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <div>
                        <div>{item.name}</div>
                        <div className="text-xs opacity-70">{item.nameEn}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Account Actions */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  // Logged in user options
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-2xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center text-white font-bold">
                        {getUserInitial()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {getUserDisplayName()}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {user?.email || ""}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {isAuthenticated && (
                        <Link
                          to="/wallet"
                          onClick={() => setIsOpen(false)}
                          className="flex flex-col items-center justify-center gap-1 px-3 py-3 bg-green-50 text-green-700 rounded-2xl font-medium hover:bg-green-100 transition-colors"
                        >
                          <Wallet className="w-4 h-4" />
                          <span className="text-xs">Ví Tiền</span>
                          <span className="text-xs font-bold">
                            {formatCurrency(walletBalance)}
                          </span>
                        </Link>
                      )}

                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center justify-center gap-1 px-3 py-3 bg-amber-50 text-amber-700 rounded-2xl font-medium hover:bg-amber-100 transition-colors"
                      >
                        <UserCircle className="w-4 h-4" />
                        <span className="text-xs">Tài Khoản</span>
                      </Link>

                      {isAuthenticated && (
                        <Link
                          to="/favorites"
                          onClick={() => setIsOpen(false)}
                          className="flex flex-col items-center justify-center gap-1 px-3 py-3 bg-red-50 text-red-600 rounded-2xl font-medium hover:bg-red-100 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          <span className="text-xs">Yêu Thích</span>
                        </Link>
                      )}
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-2xl font-medium transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng Xuất
                    </button>
                  </div>
                ) : (
                  // Not logged in options
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-50 text-amber-700 border border-amber-200 rounded-2xl font-medium hover:bg-amber-100 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Đăng Nhập
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-2xl font-medium hover:from-amber-700 hover:to-amber-800 transition-colors"
                    >
                      <UserCircle className="w-4 h-4" />
                      Đăng Ký
                    </Link>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>0123 456 789</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>123 Nguyễn Huệ, Quận 1, TP.HCM</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Thứ 2-6: 7:00-19:00 | Thứ 7-CN: 8:00-20:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
