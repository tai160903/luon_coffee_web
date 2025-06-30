// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   XCircle,
//   AlertTriangle,
//   RefreshCw,
//   Home,
//   ArrowLeft,
//   Phone,
//   Mail,
// } from "lucide-react";
// import Link from "next/link";

// export default function FailedPage() {
//   const [retryCount, setRetryCount] = useState(0);
//   const [isRetrying, setIsRetrying] = useState(false);

//   const handleRetry = async () => {
//     if (retryAction && retryCount < 3) {
//       setIsRetrying(true);
//       setRetryCount((prev) => prev + 1);

//       try {
//         await retryAction();
//       } catch (error) {
//         console.error("Retry failed:", error);
//       } finally {
//         setTimeout(() => setIsRetrying(false), 1000);
//       }
//     }
//   };

//   const getContent = () => {
//     switch (type) {
//       case "payment":
//         return {
//           title: "Thanh toán thất bại",
//           subtitle: "Không thể xử lý thanh toán của bạn",
//           icon: <XCircle className="w-20 h-20 text-red-500" />,
//           description:
//             errorMessage ||
//             "Có lỗi xảy ra trong quá trình thanh toán. Vui lòng kiểm tra thông tin thẻ và thử lại.",
//           suggestions: [
//             "Kiểm tra số dư tài khoản",
//             "Xác nhận thông tin thẻ chính xác",
//             "Thử phương thức thanh toán khác",
//             "Liên hệ ngân hàng nếu vấn đề tiếp tục",
//           ],
//         };
//       case "order":
//         return {
//           title: "Đặt hàng thất bại",
//           subtitle: "Không thể tạo đơn hàng",
//           icon: <AlertTriangle className="w-20 h-20 text-orange-500" />,
//           description:
//             errorMessage ||
//             "Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại sau.",
//           suggestions: [
//             "Kiểm tra kết nối internet",
//             "Đảm bảo các món đã chọn còn có sẵn",
//             "Thử đặt lại từ đầu",
//             "Liên hệ hỗ trợ nếu cần thiết",
//           ],
//         };
//       case "network":
//         return {
//           title: "Lỗi kết nối",
//           subtitle: "Không thể kết nối đến máy chủ",
//           icon: <AlertTriangle className="w-20 h-20 text-yellow-500" />,
//           description:
//             errorMessage ||
//             "Kết nối internet không ổn định. Vui lòng kiểm tra và thử lại.",
//           suggestions: [
//             "Kiểm tra kết nối WiFi/4G",
//             "Thử tải lại trang",
//             "Đợi một lúc rồi thử lại",
//             "Liên hệ nhà cung cấp internet",
//           ],
//         };
//       case "server":
//         return {
//           title: "Lỗi hệ thống",
//           subtitle: "Máy chủ đang gặp sự cố",
//           icon: <XCircle className="w-20 h-20 text-red-600" />,
//           description:
//             errorMessage ||
//             "Hệ thống đang bảo trì hoặc gặp sự cố. Vui lòng thử lại sau.",
//           suggestions: [
//             "Đợi 5-10 phút rồi thử lại",
//             "Kiểm tra trang thông báo",
//             "Liên hệ hỗ trợ kỹ thuật",
//             "Theo dõi fanpage để cập nhật",
//           ],
//         };
//       default:
//         return {
//           title: "Có lỗi xảy ra",
//           subtitle: "Thao tác không thành công",
//           icon: <XCircle className="w-20 h-20 text-red-500" />,
//           description:
//             errorMessage || "Đã xảy ra lỗi không xác định. Vui lòng thử lại.",
//           suggestions: [
//             "Thử lại sau vài phút",
//             "Kiểm tra kết nối internet",
//             "Tải lại trang",
//             "Liên hệ hỗ trợ",
//           ],
//         };
//     }
//   };

//   const content = getContent();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Background Decorations */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
//       </div>

//       <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/90 backdrop-blur-sm relative z-10">
//         <CardContent className="p-8 text-center">
//           {/* Error Icon */}
//           <div className="flex justify-center mb-6 animate-pulse">
//             {content.icon}
//           </div>

//           {/* Title */}
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             {content.title}
//           </h1>

//           {/* Subtitle */}
//           <p className="text-gray-600 mb-6 text-lg">{content.subtitle}</p>

//           {/* Error Details */}
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//             <p className="text-red-800 mb-2">{content.description}</p>
//             {errorCode && (
//               <p className="text-red-600 text-sm font-mono">
//                 Mã lỗi: {errorCode}
//               </p>
//             )}
//             {orderNumber && (
//               <p className="text-red-600 text-sm">Mã đơn hàng: {orderNumber}</p>
//             )}
//           </div>

//           {/* Suggestions */}
//           <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
//             <h3 className="font-semibold text-gray-800 mb-4 text-center">
//               Gợi ý khắc phục:
//             </h3>
//             <ul className="space-y-2">
//               {content.suggestions.map((suggestion, index) => (
//                 <li
//                   key={index}
//                   className="flex items-start gap-2 text-gray-700"
//                 >
//                   <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
//                   {suggestion}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
//             {retryAction && retryCount < 3 && (
//               <Button
//                 onClick={handleRetry}
//                 disabled={isRetrying}
//                 className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
//               >
//                 {isRetrying ? (
//                   <RefreshCw className="w-4 h-4 animate-spin" />
//                 ) : (
//                   <RefreshCw className="w-4 h-4" />
//                 )}
//                 {isRetrying
//                   ? "Đang thử lại..."
//                   : `Thử lại (${3 - retryCount} lần)`}
//               </Button>
//             )}

//             <Button
//               variant="outline"
//               onClick={() => window.history.back()}
//               className="w-full sm:w-auto flex items-center gap-2 hover:bg-gray-50"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               Quay lại
//             </Button>

//             <Link href="/">
//               <Button
//                 variant="outline"
//                 className="w-full sm:w-auto flex items-center gap-2 hover:bg-gray-50 bg-transparent"
//               >
//                 <Home className="w-4 h-4" />
//                 Về trang chủ
//               </Button>
//             </Link>
//           </div>

//           {/* Contact Support */}
//           <div className="border-t pt-6">
//             <p className="text-gray-600 mb-4">
//               Cần hỗ trợ? Liên hệ với chúng tôi:
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <a
//                 href="tel:1900123456"
//                 className="flex items-center gap-2 text-blue-600 hover:text-blue-800 justify-center"
//               >
//                 <Phone className="w-4 h-4" />
//                 1900 123 456
//               </a>
//               <a
//                 href="mailto:support@cafeviet.com"
//                 className="flex items-center gap-2 text-blue-600 hover:text-blue-800 justify-center"
//               >
//                 <Mail className="w-4 h-4" />
//                 support@cafeviet.com
//               </a>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
