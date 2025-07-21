"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Coffee } from "lucide-react";
import authService from "../services/auth.service";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [pendingUsername, setPendingUsername] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Vui lòng nhập tên đăng nhập";
    } else if (formData.username.length < 4) {
      newErrors.username = "Tên đăng nhập phải có ít nhất 4 ký tự";
    } else if (/[^a-zA-Z0-9]/.test(formData.username)) {
      newErrors.username = "Tên đăng nhập chỉ được chứa chữ cái và số";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await authService.register({
        username: formData.username.toLocaleLowerCase(),
        email: formData.email,
        password: formData.password,
      });
      setPendingUsername(formData.username.toLocaleLowerCase());
      setShowOtpModal(true);
      toast.success(
        "Đăng ký thành công! Vui lòng nhập mã OTP được gửi về email."
      );
    } catch (error) {
      setErrors({ username: "Đăng ký thất bại. Vui lòng thử lại." });
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async () => {
    setOtpLoading(true);
    setOtpError("");
    try {
      await authService.verifyOTP(pendingUsername, otp);
      setShowOtpModal(false);
      toast.success("Xác thực OTP thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (error) {
      setOtpError(
        error?.response?.data?.message ||
          error?.response?.data?.detail ||
          "Mã OTP không đúng hoặc đã hết hạn."
      );
    }
    setOtpLoading(false);
  };

  const handleResendOtp = async () => {
    setOtpLoading(true);
    setOtpError("");
    try {
      await authService.resendOTP(pendingUsername);
      toast.success("Đã gửi lại mã OTP. Vui lòng kiểm tra email.");
    } catch (error) {
      setOtpError("Không thể gửi lại mã OTP. Vui lòng thử lại sau.");
    }
    setOtpLoading(false);
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
            Tạo Tài Khoản Mới
          </h1>
          <p className="text-gray-600">
            Tham gia cộng đồng yêu cà phê Việt Nam
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Tên đăng nhập
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                  errors.username
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                }`}
                placeholder="Nhập tên đăng nhập"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Địa chỉ email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                }`}
                placeholder="Nhập địa chỉ email"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 pr-12 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                  }`}
                  placeholder="Nhập mật khẩu"
                />
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

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 pr-12 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                    errors.confirmPassword
                      ? "border-red-300 focus:border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                  }`}
                  placeholder="Nhập lại mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
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
                <>Đăng Ký</>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500 bg-white">
              Hoặc đăng ký với
            </span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Bạn đã có tài khoản?{" "}
              <Link
                to="/login"
                className="text-amber-600 hover:text-amber-700 font-semibold"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm relative">
            <h2 className="text-xl font-bold mb-4 text-center text-amber-700">
              Xác thực OTP
            </h2>
            <p className="mb-4 text-gray-600 text-center">
              Vui lòng nhập mã OTP đã gửi về email của bạn để hoàn tất đăng ký.
            </p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Nhập mã OTP"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none mb-3 text-center text-lg tracking-widest"
              maxLength={6}
              autoFocus
            />
            {otpError && (
              <div className="text-red-600 text-sm mb-2 text-center">
                {otpError}
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleVerifyOtp}
                disabled={otpLoading || !otp}
                className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50"
                type="button"
              >
                {otpLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mx-auto"></div>
                ) : (
                  "Xác nhận"
                )}
              </button>
              <button
                onClick={handleResendOtp}
                type="button"
                disabled={otpLoading}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Gửi lại OTP
              </button>
            </div>
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              aria-label="Đóng"
              type="button"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
