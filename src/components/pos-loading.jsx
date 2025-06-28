"use client";

import { Coffee, Monitor, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function POSLoading(
  message = "Đang khởi động hệ thống...",
  systemName = "POS System"
) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Kết nối cơ sở dữ liệu...",
    "Tải thông tin sản phẩm...",
    "Kiểm tra thiết bị...",
    "Khởi tạo giao diện...",
    "Hoàn tất!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) return prev;
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(stepInterval);
  }, [steps.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        {/* POS Icon */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <Monitor className="w-16 h-16 text-white" />
            <Coffee className="w-8 h-8 text-white absolute -bottom-2 -right-2 bg-amber-600 rounded-full p-1" />
          </div>

          {/* Pulse Effect */}
          <div className="absolute inset-0 w-32 h-32 mx-auto bg-blue-500 rounded-2xl opacity-20 animate-ping"></div>
        </div>

        {/* System Info */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white">Cà Phê Việt</h1>
          <p className="text-blue-300 text-lg font-medium">{systemName}</p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Loading Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
            <span className="text-white font-medium">{message}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
            </div>
          </div>

          <div className="flex justify-between text-sm text-slate-400">
            <span>{Math.round(Math.min(progress, 100))}%</span>
            <span>Đang tải...</span>
          </div>
        </div>

        {/* Loading Steps */}
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-sm transition-all duration-300 ${
                index === currentStep
                  ? "text-blue-300 font-medium"
                  : index < currentStep
                  ? "text-green-400"
                  : "text-slate-500"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {index < currentStep && (
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                )}
                {index === currentStep && (
                  <Loader2 className="w-3 h-3 animate-spin" />
                )}
                {index > currentStep && (
                  <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                )}
                <span>{step}</span>
              </div>
            </div>
          ))}
        </div>

        {/* System Info */}
        <div className="text-xs text-slate-500 space-y-1">
          <p>Version 2.1.0</p>
          <p>© 2024 Cà Phê Việt POS System</p>
        </div>
      </div>
    </div>
  );
}
