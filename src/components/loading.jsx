"use client";

import { Coffee, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function LoadingPage(
  message = "Đang tải dữ liệu",
  showProgress = true
) {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (showProgress) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(progressInterval);
    }
  }, [showProgress]);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Logo Animation */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
            <Coffee className="w-12 h-12 text-white animate-bounce" />
          </div>

          {/* Steam Animation */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              <div
                className="w-1 h-8 bg-gray-300 rounded-full opacity-60 animate-pulse"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-1 h-6 bg-gray-300 rounded-full opacity-40 animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-1 h-8 bg-gray-300 rounded-full opacity-60 animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent">
            Cà Phê Việt
          </h1>
          <p className="text-gray-600 text-lg">Hương vị truyền thống</p>
        </div>

        {/* Loading Animation */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-6 h-6 text-amber-600 animate-spin" />
            <span className="text-xl text-gray-700 font-medium">
              {message}
              {dots}
            </span>
          </div>

          {/* Progress Bar */}
          {showProgress && (
            <div className="w-64 mx-auto">
              <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-orange-600 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {Math.round(Math.min(progress, 100))}%
              </p>
            </div>
          )}
        </div>

        {/* Coffee Beans Animation */}
        <div className="flex justify-center space-x-2 opacity-60">
          <div
            className="w-3 h-3 bg-amber-800 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-3 h-3 bg-amber-700 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-3 h-3 bg-amber-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 bg-amber-700 rounded-full animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></div>
          <div
            className="w-3 h-3 bg-amber-800 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>

        {/* Footer Text */}
        <p className="text-gray-500 text-sm">
          Đang chuẩn bị trải nghiệm tuyệt vời cho bạn...
        </p>
      </div>
    </div>
  );
}
