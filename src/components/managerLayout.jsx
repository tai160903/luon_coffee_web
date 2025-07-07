import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaArrowLeft,
} from "react-icons/fa";
import { FaCoffee } from "react-icons/fa";
import { FaBoxesStacked } from "react-icons/fa6";

function ManagerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderNavLink = (to, icon, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 transition-colors rounded-lg ${
          isActive
            ? "bg-[#6b3305] text-white"
            : "text-white/80 hover:bg-[#6b3305] hover:text-white"
        }`
      }
      end
    >
      {icon}
      <span className="mx-4">{label}</span>
    </NavLink>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transition duration-300 transform bg-[#8B4513] lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <FaCoffee className="w-8 h-8 text-white" />
            <span className="mx-3 text-xl font-semibold text-white">
              Lượn cafe
            </span>
          </div>
          <button
            className="p-1 text-white rounded-md lg:hidden hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-10 px-4 space-y-2">
          {/* Thêm nút quay về trang chủ */}
          <Link
            to="/"
            className="flex items-center px-4 py-3 text-white/80 transition-colors rounded-lg hover:bg-[#6b3305] hover:text-white"
          >
            <FaArrowLeft className="w-5 h-5" />
            <span className="mx-4">Quay về trang chủ</span>
          </Link>

          {renderNavLink(
            "/manager",
            <FaHome className="w-5 h-5" />,
            "Thống kê"
          )}
          {renderNavLink(
            "/manager/products",
            <FaBoxOpen className="w-5 h-5" />,
            "Sản phẩm"
          )}
          {renderNavLink(
            "/manager/categories",
            <FaBoxesStacked className="w-5 h-5" />,
            "Danh mục"
          )}
          {renderNavLink(
            "/manager/orders",
            <FaShoppingCart className="w-5 h-5" />,
            "Đơn"
          )}
          {renderNavLink(
            "/manager/promotions",
            <FaBoxOpen className="w-5 h-5" />,
            "Khuyến mãi"
          )}

          {renderNavLink(
            "/manager/staffs",
            <FaUsers className="w-5 h-5" />,
            "Nhân viên"
          )}
          {renderNavLink(
            "/manager/customers",
            <FaUsers className="w-5 h-5" />,
            "Khách hàng"
          )}
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <button className="flex items-center w-full px-4 py-2 text-white/80 transition-colors rounded-lg hover:bg-[#6b3305] hover:text-white">
            <FaSignOutAlt className="w-5 h-5" />
            <span className="mx-4">Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
          <div className="flex items-center">
            <button
              className="p-1 mr-4 text-gray-500 rounded-md lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Quản lý</h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:inline-block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch className="w-4 h-4 text-gray-500" />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="py-2 pl-10 pr-4 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              />
            </div>

            <div className="relative">
              <button className="relative p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                <FaBell className="w-5 h-5" />
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                  3
                </span>
              </button>
            </div>

            <div className="relative">
              <img
                className="object-cover w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                alt="User avatar"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Content from nested routes will render here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ManagerLayout;
