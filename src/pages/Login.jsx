"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Coffee, User, Lock, ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import cartService from "../services/cart.service";
import { setCartInfo } from "../redux/slices/cartSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Vui lòng nhập tên đăng nhập";
    } else if (formData.username.length < 3) {
      newErrors.username = "Tên đăng nhập phải có ít nhất 3 ký tự";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const resultAction = await dispatch(
        login({
          username: formData.username.toLocaleLowerCase(),
          password: formData.password,
        })
      );
      if (
        resultAction.meta.requestStatus === "fulfilled" &&
        resultAction.payload.status === 200
      ) {
        try {
          const res = await cartService.getCart();
          console.log(res);
          if (res && res?.data) {
            dispatch(setCartInfo(res?.data));
          }
        } catch (err) {
          toast.error("Không thể tải giỏ hàng, vui lòng thử lại sau.", {
            theme: "colored",
          });
        }
        toast.success("Đăng nhập thành công!");
        setTimeout(() => navigate("/menu", { replace: true }), 500);
      } else {
        throw new Error(resultAction.payload);
      }
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800 group-hover:text-amber-700 transition-colors">
                Cà Phê Việt
              </div>
              <div className="text-sm text-gray-600">
                Authentic Vietnamese Coffee
              </div>
            </div>
          </Link>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Chào Mừng Trở Lại!
          </h1>
          <p className="text-gray-600">
            Đăng nhập để tiếp tục trải nghiệm cà phê Việt Nam
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General error message */}
            {errors.general && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm mb-4">
                {errors.general}
              </div>
            )}

            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Tên đăng nhập
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 pl-12 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                    errors.username
                      ? "border-red-300 focus:border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                  }`}
                  placeholder="Nhập tên đăng nhập của bạn"
                />
                <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              </div>
              {errors.username && (
                <p className="mt-2 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Mật Khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 pl-12 pr-12 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                  }`}
                  placeholder="Nhập mật khẩu của bạn"
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Ghi nhớ đăng nhập
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                Quên mật khẩu?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  Đăng Nhập
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="text-amber-600 hover:text-amber-700 font-semibold"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
