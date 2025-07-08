"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Coffee, User, ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import cartService from "../services/cart.service";
import { setCartInfo } from "../redux/slices/cartSlice";
import authService from "../services/auth.service";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [pendingUsername, setPendingUsername] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Vui lòng nhập tên đăng nhập";
    else if (formData.username.length < 3)
      newErrors.username = "Tên đăng nhập phải có ít nhất 3 ký tự";
    if (!formData.password) newErrors.password = "Vui lòng nhập mật khẩu";
    else if (formData.password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerifyOtp = async () => {
    setOtpLoading(true);
    setOtpError("");
    try {
      await authService.verifyOTP(pendingUsername, otp);
      setShowOtpModal(false);
      toast.success("Xác thực OTP thành công! Vui lòng đăng nhập lại.");
    } catch (error) {
      setOtpError(
        error?.response?.data?.message ||
          error?.response?.data?.detail ||
          "Mã OTP không đúng hoặc đã hết hạn."
      );
    }
    setOtpLoading(false);
  };

  // Hàm xử lý quên mật khẩu
  const handleResetPassword = async () => {
    if (!resetEmail || !resetEmail.includes("@")) {
      setResetError("Vui lòng nhập email hợp lệ");
      return;
    }

    setResetLoading(true);
    setResetError("");
    try {
      await authService.resetPassword(resetEmail);
      setResetSuccess(true);
      toast.success("Yêu cầu đặt lại mật khẩu đã được gửi đến email của bạn");
    } catch (error) {
      setResetError(
        error?.response?.data?.message ||
          "Không thể gửi yêu cầu đặt lại mật khẩu. Vui lòng thử lại sau."
      );
    } finally {
      setResetLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
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
          if (res?.data) dispatch(setCartInfo(res.data));
        } catch {
          toast.error("Không thể tải giỏ hàng, vui lòng thử lại sau.", {
            theme: "colored",
          });
        }
        toast.success("Đăng nhập thành công!");
        setTimeout(() => navigate("/menu", { replace: true }), 500);
      } else {
        if (
          resultAction.payload &&
          typeof resultAction.payload === "string" &&
          resultAction.payload.toLowerCase().includes("kích hoạt")
        ) {
          setPendingUsername(formData.username.toLocaleLowerCase());
          setShowOtpModal(true);
        } else {
          throw new Error(resultAction.payload);
        }
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
                {errors.general.toLowerCase().includes("kích hoạt") && (
                  <div className="mt-2 text-center">
                    <button
                      type="button"
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
                      onClick={() => {
                        setPendingUsername(
                          formData.username.toLocaleLowerCase()
                        );
                        setShowOtpModal(true);
                      }}
                    >
                      Xác thực tài khoản
                    </button>
                  </div>
                )}
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
              <button
                type="button"
                onClick={() => setShowForgotPasswordModal(true)}
                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                Quên mật khẩu?
              </button>
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
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500">
              Nếu bạn chưa kích hoạt tài khoản,{" "}
              <button
                type="button"
                className="text-amber-600 hover:underline font-semibold"
                onClick={() => {
                  setPendingUsername(formData.username.toLocaleLowerCase());
                  setShowOtpModal(true);
                }}
              >
                bấm vào đây để xác thực OTP
              </button>
            </span>
          </div>
        </div>
      </div>
      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm relative">
            <h2 className="text-xl font-bold mb-4 text-center text-amber-700">
              Quên Mật Khẩu
            </h2>
            {resetSuccess ? (
              <>
                <div className="p-4 bg-green-50 rounded-xl text-center mb-4">
                  <div className="mx-auto my-3 flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-green-700">
                    Link đặt lại mật khẩu đã được gửi đến email của bạn. Vui
                    lòng kiểm tra email và làm theo hướng dẫn.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowForgotPasswordModal(false);
                    setResetEmail("");
                    setResetError("");
                    setResetSuccess(false);
                  }}
                  className="w-full bg-amber-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                  type="button"
                >
                  Đóng
                </button>
              </>
            ) : (
              <>
                <p className="mb-4 text-gray-600 text-center">
                  Nhập email của bạn để nhận link đặt lại mật khẩu
                </p>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none mb-3"
                  autoFocus
                  disabled={resetLoading}
                />
                {resetError && (
                  <div className="text-red-600 text-sm mb-3 text-center">
                    {resetError}
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={handleResetPassword}
                    disabled={resetLoading || !resetEmail}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50"
                    type="button"
                  >
                    {resetLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mx-auto"></div>
                    ) : (
                      "Gửi Link Đặt Lại"
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setShowForgotPasswordModal(false);
                      setResetEmail("");
                      setResetError("");
                    }}
                    type="button"
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    Hủy
                  </button>
                </div>
              </>
            )}
            <button
              onClick={() => {
                setShowForgotPasswordModal(false);
                setResetEmail("");
                setResetError("");
                setResetSuccess(false);
              }}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              aria-label="Đóng"
              type="button"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm relative">
            <h2 className="text-xl font-bold mb-4 text-center text-amber-700">
              Xác thực OTP
            </h2>
            {/* Modal state: nhập username hoặc nhập OTP */}
            {!window.__otpSent ? (
              <>
                <p className="mb-4 text-gray-600 text-center">
                  Nhập tên đăng nhập để nhận mã OTP qua email.
                </p>
                <input
                  type="text"
                  value={pendingUsername}
                  onChange={(e) => setPendingUsername(e.target.value)}
                  placeholder="Tên đăng nhập"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none mb-3 text-center"
                  autoFocus
                  disabled={otpLoading}
                />
                <button
                  onClick={async () => {
                    try {
                      setOtpLoading(true);
                      setOtpError("");
                      await authService.resendOTP(pendingUsername);
                      toast.success("Đã gửi mã OTP. Vui lòng kiểm tra email.");
                      if (pendingUsername) {
                        window.__otpSent = true;
                        setOtp("");
                        setOtpError("");
                      }
                    } catch (error) {
                      setOtpError(
                        "Không thể gửi mã OTP. Vui lòng thử lại sau."
                      );
                    } finally {
                      setOtpLoading(false);
                    }
                  }}
                  disabled={!pendingUsername || otpLoading}
                  className="w-full bg-amber-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50"
                  type="button"
                >
                  {otpLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mx-auto"></div>
                  ) : (
                    "Gửi mã OTP"
                  )}
                </button>
                {otpError && (
                  <div className="text-red-600 text-sm mt-3 text-center">
                    {otpError}
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="mb-4 text-gray-600 text-center">
                  Nhập mã OTP đã gửi về email của bạn.
                </p>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Nhập mã OTP"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none mb-3 text-center text-lg tracking-widest"
                  maxLength={6}
                  autoFocus
                  disabled={otpLoading}
                />
                {otpError && (
                  <div className="text-red-600 text-sm mb-2 text-center">
                    {otpError}
                  </div>
                )}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleVerifyOtp}
                    disabled={otpLoading || !otp || !pendingUsername}
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
                    onClick={() => {
                      setOtp("");
                      setOtpError("");
                      window.__otpSent = false;
                    }}
                    type="button"
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    Nhập lại username
                  </button>
                </div>
                <button
                  onClick={async () => {
                    try {
                      setOtpLoading(true);
                      setOtpError("");
                      await authService.resendOTP(pendingUsername);
                      toast.success(
                        "Đã gửi lại mã OTP. Vui lòng kiểm tra email."
                      );
                      // Giữ nguyên bước nhập OTP
                    } catch (error) {
                      setOtpError(
                        "Không thể gửi lại mã OTP. Vui lòng thử lại sau."
                      );
                    } finally {
                      setOtpLoading(false);
                    }
                  }}
                  type="button"
                  disabled={otpLoading || !pendingUsername}
                  className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Gửi lại OTP
                </button>
              </>
            )}
            <button
              onClick={() => {
                setShowOtpModal(false);
                setOtp("");
                setOtpError("");
                window.__otpSent = false;
              }}
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

export default Login;
