"use client";

import { XCircle, ArrowLeft, Home, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function FailedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 p-4 relative">
      {/* Background Decorations */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-red-200 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-orange-200 rounded-full opacity-20 blur-2xl"></div>

      <div className="w-full max-w-md bg-white/90 shadow-2xl rounded-2xl p-8 z-10 text-center">
        <div className="flex justify-center mb-6">
          <XCircle className="w-20 h-20 text-red-500 animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Có lỗi xảy ra</h1>
        <p className="text-gray-600 mb-6 text-lg">Thao tác không thành công</p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">
            Đã xảy ra lỗi không xác định. Vui lòng thử lại hoặc liên hệ hỗ trợ.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center gap-2 hover:bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </button>
          <Link to="/">
            <button
              type="button"
              className="w-full sm:w-auto flex items-center gap-2 hover:bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg transition"
            >
              <Home className="w-4 h-4" />
              Về trang chủ
            </button>
          </Link>
        </div>
        <div className="border-t pt-6">
          <p className="text-gray-600 mb-4">
            Cần hỗ trợ? Liên hệ với chúng tôi:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1900123456"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 justify-center"
            >
              <Phone className="w-4 h-4" />
              1900 123 456
            </a>
            <a
              href="mailto:support@cafeviet.com"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 justify-center"
            >
              <Mail className="w-4 h-4" />
              support@cafeviet.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
