import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Coffee, Lock, ArrowLeft, Mail } from "lucide-react";
import authService from "../services/auth.service";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState("");
  // State for request reset password by email
  const [email, setEmail] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      setError("");
    } else {
      setToken("");
    }
  }, [searchParams]);

  // Handle reset password with token
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu không khớp. Vui lòng kiểm tra lại.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    setIsLoading(true);

    try {
      await authService.resetPassword(token, newPassword);
      setSuccess(true);
      toast.success("Đặt lại mật khẩu thành công!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Đã xảy ra lỗi khi đặt lại mật khẩu. Token có thể đã hết hạn."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle request reset password by email
  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !email.includes("@")) {
      setError("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }
    setRequestLoading(true);
    try {
      await authService.forgotPassword(email);
      setRequestSuccess(true);
      toast.success("Yêu cầu đặt lại mật khẩu đã được gửi đến email của bạn!");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Không thể gửi yêu cầu đặt lại mật khẩu. Vui lòng thử lại sau."
      );
    } finally {
      setRequestLoading(false);
    }
  };

  if (!token) {
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
              Quên Mật Khẩu
            </h1>
            <p className="text-gray-600">
              Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            {requestSuccess ? (
              <div className="text-center">
                <div className="mx-auto my-6 flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
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
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Kiểm Tra Email Của Bạn
                </h3>
                <p className="text-gray-600 mb-6">
                  Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn.
                  Vui lòng kiểm tra hộp thư đến (và thư mục spam nếu cần).
                </p>
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Quay lại trang đăng nhập
                </Link>
              </div>
            ) : (
              <form onSubmit={handleRequestReset} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                    {error}
                  </div>
                )}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Địa Chỉ Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-4 pl-12 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none focus:bg-amber-50/50"
                      placeholder="Nhập địa chỉ email của bạn"
                      disabled={requestLoading}
                      required
                    />
                    <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={requestLoading}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {requestLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  ) : (
                    "Gửi Link Đặt Lại Mật Khẩu"
                  )}
                </button>
                <div className="text-center mt-4">
                  <Link
                    to="/login"
                    className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Quay lại trang đăng nhập
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

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
            Đặt Lại Mật Khẩu
          </h1>
          <p className="text-gray-600">
            Tạo mật khẩu mới để bảo mật tài khoản của bạn
          </p>
        </div>

        {/* Reset Password Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          {success ? (
            <div className="text-center">
              <div className="mx-auto my-6 flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
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
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Đặt Lại Mật Khẩu Thành Công!
              </h3>
              <p className="text-gray-600 mb-6">
                Mật khẩu của bạn đã được cập nhật. Bạn sẽ được chuyển hướng đến
                trang đăng nhập trong giây lát.
              </p>
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại trang đăng nhập
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Mật Khẩu Mới
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-4 pl-12 pr-12 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none focus:bg-amber-50/50"
                    placeholder="Nhập mật khẩu mới"
                    disabled={isLoading || !token}
                  />
                  <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Xác Nhận Mật Khẩu
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-4 pl-12 pr-12 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none focus:bg-amber-50/50"
                    placeholder="Nhập lại mật khẩu mới"
                    disabled={isLoading || !token}
                  />
                  <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !token}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  "Đặt Lại Mật Khẩu"
                )}
              </button>

              <div className="text-center mt-4">
                <Link
                  to="/login"
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                >
                  Quay lại trang đăng nhập
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
