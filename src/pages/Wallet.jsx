import { useState, useEffect } from "react";
import {
  Wallet as WalletIcon,
  CreditCard,
  PlusCircle,
  RefreshCcw,
  AlertCircle,
} from "lucide-react";
import formatCurrency from "../utils/formatCurrency";
import paymentService from "../services/payment.service";
import walletHistoryService from "../services/walletHistory.service"; // Import walletHistoryService
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FaDongSign } from "react-icons/fa6";

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [topupAmount, setTopupAmount] = useState(100000);
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [history, setHistory] = useState([]); // Add state for wallet history
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    setBalance(user?.wallet || 0);
  }, [user]);

  useEffect(() => {
    const fetchWalletHistory = async () => {
      try {
        const response = await walletHistoryService.getWalletHistory();
        if (response?.status === 200 && Array.isArray(response.data?.data)) {
          setHistory(response.data.data);
        } else {
          setHistory([]);
          toast.error("Không có dữ liệu lịch sử giao dịch.");
        }
      } catch (error) {
        console.error("Error fetching wallet history:", error);
        toast.error("Không thể tải lịch sử giao dịch.");
      }
    };

    fetchWalletHistory();
  }, []);

  const handleTopup = async () => {
    if (topupAmount < 10000) {
      toast.error("Số tiền nạp tối thiểu là 10,000đ");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await paymentService.depositWallet(topupAmount);

      if (response?.status === 200 && response.data?.checkoutUrl) {
        window.location.replace(response.data.checkoutUrl);
      } else {
        const errorMsg =
          response?.data?.message ||
          response?.message ||
          "Không thể tạo giao dịch nạp tiền. Vui lòng thử lại sau.";
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Error during topup:", error);
      toast.error("Đã xảy ra lỗi khi nạp tiền. Vui lòng thử lại sau.");
    } finally {
      setIsProcessing(false);
    }
  };

  const AmountOption = ({ amount }) => (
    <button
      className={`py-2 px-3 border rounded-lg text-center font-medium transition-all ${
        topupAmount === amount
          ? "bg-amber-700 text-white border-amber-700"
          : "bg-white text-gray-800 border-gray-300 hover:bg-amber-50"
      }`}
      onClick={() => setTopupAmount(amount)}
    >
      {formatCurrency(amount)}
    </button>
  );

  AmountOption.propTypes = {
    amount: PropTypes.number.isRequired,
  };

  const getTransactionType = (item) => {
    if (item.description?.toLowerCase().includes("nạp tiền")) {
      return { type: "Nạp tiền", color: "text-green-600", symbol: "+" };
    } else if (item.description?.toLowerCase().includes("hoàn tiền")) {
      return { type: "Hoàn tiền", color: "text-blue-600", symbol: "+" };
    } else if (item.description?.toLowerCase().includes("thanh toán")) {
      return { type: "Thanh toán", color: "text-red-600", symbol: "-" };
    } else {
      return { type: "Không xác định", color: "text-gray-600", symbol: "" };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Ví Cà Phê
          </h1>
          <p className="text-gray-600">
            Quản lý và nạp tiền vào tài khoản để thanh toán dễ dàng
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-600 to-amber-800 rounded-3xl shadow-lg overflow-hidden mb-8">
          <div className="relative p-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <WalletIcon className="h-6 w-6 text-amber-200" />
                <h2 className="text-white/90 font-medium">Số Dư Hiện Tại</h2>
              </div>
              <div className="text-4xl font-bold text-white mb-6">
                {formatCurrency(balance)}
              </div>
              <button
                onClick={() => setShowTopupModal(true)}
                className="bg-white text-amber-700 hover:bg-amber-100 transition-all py-3 px-6 rounded-xl font-medium flex items-center gap-2"
              >
                <PlusCircle size={18} />
                Nạp Tiền
              </button>
            </div>
          </div>
          <div className="bg-black/10 backdrop-blur-sm py-4 px-6">
            <div className="flex items-center gap-2 text-amber-100">
              <CreditCard size={18} />
              <span>Ví của bạn</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Lịch sử giao dịch
          </h2>
          {history.length > 0 ? (
            <div className="space-y-4">
              {history.map((item) => {
                const { type, color, symbol } = getTransactionType(item);
                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-4 mb-4"
                  >
                    <div>
                      <p className="text-gray-800 font-medium">
                        {item.description || "Không có mô tả"}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {item.transactionDate
                          ? new Date(item.transactionDate).toLocaleString(
                              "vi-VN"
                            )
                          : "Không có ngày"}
                      </p>
                      <p className="text-sm text-gray-500">Loại: {type}</p>
                    </div>
                    <p className={`text-lg font-bold ${color}`}>
                      {symbol}
                      {item?.amountChanged
                        ? formatCurrency(item.amountChanged)
                        : "0đ"}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600">Không có lịch sử giao dịch.</p>
          )}
        </div>
      </div>

      {showTopupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Nạp tiền vào ví
              </h3>
              <button
                onClick={() => setShowTopupModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chọn số tiền muốn nạp
                </label>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <AmountOption amount={10000} />
                  <AmountOption amount={20000} />
                  <AmountOption amount={50000} />
                  <AmountOption amount={100000} />
                  <AmountOption amount={200000} />
                  <AmountOption amount={500000} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hoặc nhập số tiền khác
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaDongSign size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="number"
                    min="10000"
                    step="10000"
                    value={topupAmount}
                    onChange={(e) => setTopupAmount(Number(e.target.value))}
                    className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 py-3"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Số tiền nạp tối thiểu là 10,000đ
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl flex items-start gap-3">
                <AlertCircle
                  size={20}
                  className="text-blue-600 flex-shrink-0 mt-0.5"
                />
                <p className="text-sm text-blue-700">
                  Bạn sẽ được chuyển đến cổng thanh toán PayOS để hoàn tất quá
                  trình nạp tiền.
                </p>
              </div>
              <button
                onClick={handleTopup}
                disabled={isProcessing}
                className={`w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  isProcessing ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isProcessing ? (
                  <>
                    <RefreshCcw size={18} className="animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <PlusCircle size={18} />
                    Nạp {formatCurrency(topupAmount)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
