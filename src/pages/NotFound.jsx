"use client";

import { Link } from "react-router-dom";
import { AlertTriangle, Home, Coffee, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4 relative overflow-hidden">
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tr from-orange-200 to-red-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-red-200 to-pink-200 rounded-full opacity-30"></div>

        {/* Floating Coffee Elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-amber-600 rounded-full opacity-40"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-amber-700 rounded-full opacity-40"></div>
        <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-amber-800 rounded-full opacity-40"></div>
      </div>

      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden z-10 relative">
        {/* Header Gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500"></div>

        <div className="p-8 md:p-12 text-center">
          {/* Enhanced Icon Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-full shadow-lg">
                <AlertTriangle className="w-24 h-24 text-amber-500 drop-shadow-lg" />
              </div>
            </div>
          </div>

          {/* Enhanced Typography */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Oops! Trang không tìm thấy
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              Có vẻ như bạn đã lạc đường trong quán cà phê của chúng tôi
            </p>
            <p className="text-gray-500">
              Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
            </p>
          </div>

          {/* Coffee Quote */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Coffee className="w-5 h-5 text-amber-600" />
              <span className="text-amber-800 font-medium">Cà Phê Việt</span>
            </div>
            <p className="text-amber-700 italic">
              &quot;Đừng lo lắng, hãy thưởng thức một tách cà phê và khám phá
              menu của chúng tôi!&quot;
            </p>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/" replace>
              <button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group px-8 py-4 rounded-xl flex items-center justify-center gap-3 font-semibold text-lg">
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Về trang chủ
              </button>
            </Link>

            <Link to="/menu" replace>
              <button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group px-8 py-4 rounded-xl flex items-center justify-center gap-3 font-semibold text-lg">
                <Coffee className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Xem thực đơn
              </button>
            </Link>
          </div>

          {/* Help Section */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Search className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 font-medium">Cần hỗ trợ?</span>
            </div>
            <p className="text-gray-600 text-sm">
              Liên hệ với chúng tôi qua hotline: <strong>1900-CAFE</strong> hoặc
              email: <strong>support@cafeviet.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
