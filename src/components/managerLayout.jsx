import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaBell,
  FaSearch,
} from "react-icons/fa";
import { FaCoffee } from "react-icons/fa";

function ManagerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              Viet Coffee
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
          <NavLink
            to="/manager"
            end
            className={({ isActive }) =>
              `flex items-center px-4 py-3 transition-colors rounded-lg ${
                isActive
                  ? "bg-[#6b3305] text-white"
                  : "text-white/80 hover:bg-[#6b3305] hover:text-white"
              }`
            }
          >
            <FaHome className="w-5 h-5" />
            <span className="mx-4">Dashboard</span>
          </NavLink>

          <NavLink
            to="/manager/products"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 transition-colors rounded-lg ${
                isActive
                  ? "bg-[#6b3305] text-white"
                  : "text-white/80 hover:bg-[#6b3305] hover:text-white"
              }`
            }
          >
            <FaBoxOpen className="w-5 h-5" />
            <span className="mx-4">Products</span>
          </NavLink>

          <NavLink
            to="/manager/orders"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 transition-colors rounded-lg ${
                isActive
                  ? "bg-[#6b3305] text-white"
                  : "text-white/80 hover:bg-[#6b3305] hover:text-white"
              }`
            }
          >
            <FaShoppingCart className="w-5 h-5" />
            <span className="mx-4">Orders</span>
          </NavLink>

          <NavLink
            to="/manager/staffs"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 transition-colors rounded-lg ${
                isActive
                  ? "bg-[#6b3305] text-white"
                  : "text-white/80 hover:bg-[#6b3305] hover:text-white"
              }`
            }
          >
            <FaUsers className="w-5 h-5" />
            <span className="mx-4">Staffs</span>
          </NavLink>

          <NavLink
            to="/manager/customers"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 transition-colors rounded-lg ${
                isActive
                  ? "bg-[#6b3305] text-white"
                  : "text-white/80 hover:bg-[#6b3305] hover:text-white"
              }`
            }
          >
            <FaUsers className="w-5 h-5" />
            <span className="mx-4">Customers</span>
          </NavLink>

          <NavLink
            to="/manager/analytics"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 transition-colors rounded-lg ${
                isActive
                  ? "bg-[#6b3305] text-white"
                  : "text-white/80 hover:bg-[#6b3305] hover:text-white"
              }`
            }
          >
            <FaChartBar className="w-5 h-5" />
            <span className="mx-4">Analytics</span>
          </NavLink>

          <NavLink
            to="/manager/settings"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 transition-colors rounded-lg ${
                isActive
                  ? "bg-[#6b3305] text-white"
                  : "text-white/80 hover:bg-[#6b3305] hover:text-white"
              }`
            }
          >
            <FaCog className="w-5 h-5" />
            <span className="mx-4">Settings</span>
          </NavLink>
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <div className="flex items-center p-3 mb-2 bg-[#6b3305] rounded-lg">
            <img
              className="object-cover w-10 h-10 rounded-full"
              src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
              alt="User avatar"
            />
            <div className="mx-3">
              <h4 className="text-sm font-medium text-white">Admin User</h4>
              <p className="text-xs text-white/70">admin@vietcoffee.com</p>
            </div>
          </div>
          <button className="flex items-center w-full px-4 py-2 text-white/80 transition-colors rounded-lg hover:bg-[#6b3305] hover:text-white">
            <FaSignOutAlt className="w-5 h-5" />
            <span className="mx-4">Logout</span>
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
            <h2 className="text-xl font-semibold text-gray-800">
              Admin Dashboard
            </h2>
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
