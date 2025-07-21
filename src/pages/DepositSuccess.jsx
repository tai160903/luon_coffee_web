import { useEffect, useState } from "react";
import formatCurrency from "../utils/formatCurrency";
import orderService from "../services/order.service";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch
import { updateWalletBalance } from "../redux/slices/authSlice"; // Import action
import { Loader } from "lucide-react";

const DepositSuccess = () => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("Giao dịch thành công");
  const [loading, setLoading] = useState(true); // Add loading state
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch(); // Khởi tạo dispatch
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchDepositOrder = async () => {
      const topUpCode = searchParams.get("topUpCode");
      if (!topUpCode) {
        setMessage("Không tìm thấy mã giao dịch.");
        setLoading(false);
        return;
      }

      try {
        const response = await orderService.getDepositOrders(topUpCode);
        if (response?.status === 200) {
          const orderData = response.data.data;
          if (orderData.status === "PAID") {
            setData(orderData);
            dispatch(updateWalletBalance(orderData.wallet));
          } else {
            setMessage("Giao dịch không hợp lệ hoặc đã bị hủy.");
          }
        } else {
          setMessage("Không thể tải thông tin giao dịch.");
        }
      } catch (error) {
        console.error("Error fetching deposit order:", error);
        setMessage("Đã xảy ra lỗi khi tải thông tin giao dịch.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchDepositOrder();
  }, [searchParams, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4">
        <Loader className="animate-spin text-gray-600" size={48} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50 py-8 px-4">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-red-700 mb-4 text-center">
            {message}
          </h1>
          <button
            onClick={() => navigate("/")}
            className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
          {message}
        </h1>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Mã giao dịch:</span>
            <span className="text-gray-800 font-bold">{data.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Khách hàng:</span>
            <span className="text-gray-800">{data.customerId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Số tiền:</span>
            <span className="text-gray-800 font-bold">
              {formatCurrency(data.amount)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Ngày tạo:</span>
            <span className="text-gray-800">
              {new Date(data.createdAt).toLocaleString("vi-VN")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Trạng thái:</span>
            <span className="text-gray-800">{data.status}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Mô tả:</span>
            <span className="text-gray-800">{data.description}</span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositSuccess;
