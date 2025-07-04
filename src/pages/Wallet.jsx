import { useState, useEffect } from "react";
import {
  Wallet as WalletIcon,
  CreditCard,
  PlusCircle,
  History,
  TrendingUp,
  Coffee,
  Loader,
  RefreshCcw,
  Clock,
  DollarSign,
} from "lucide-react";
import formatCurrency from "../utils/formatCurrency";

const Wallet = () => {
  const [balance, setBalance] = useState(500000); // Example initial balance in VND
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topupAmount, setTopupAmount] = useState(100000);
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // "all", "in", "out"

  // Predefined topup amounts
  const topupAmounts = [50000, 100000, 200000, 500000];

  useEffect(() => {
    // Simulate API call to fetch wallet data
    const fetchWalletData = async () => {
      setIsLoading(true);
      try {
        // Simulated data - in real app, fetch from API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setBalance(500000);
        setTransactions([
          {
            id: 1,
            type: "topup",
            amount: 200000,
            date: new Date(2023, 9, 15, 14, 30),
            description: "Nạp tiền vào ví",
            status: "completed",
          },
          {
            id: 2,
            type: "purchase",
            amount: -45000,
            date: new Date(2023, 9, 14, 10, 15),
            description: "Cà phê sữa đá",
            status: "completed",
          },
          {
            id: 3,
            type: "purchase",
            amount: -35000,
            date: new Date(2023, 9, 13, 16, 45),
            description: "Bánh ngọt",
            status: "completed",
          },
          {
            id: 4,
            type: "topup",
            amount: 300000,
            date: new Date(2023, 9, 10, 9, 0),
            description: "Nạp tiền vào ví",
            status: "completed",
          },
          {
            id: 5,
            type: "purchase",
            amount: -55000,
            date: new Date(2023, 9, 8, 11, 30),
            description: "Trà sữa trân châu",
            status: "completed",
          },
        ]);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  const handleTopup = () => {
    if (topupAmount < 10000) {
      alert("Số tiền nạp tối thiểu là 10,000đ");
      return;
    }

    // Simulate API call to add funds
    setIsLoading(true);

    // Add a small delay to simulate processing
    setTimeout(() => {
      const newTransaction = {
        id: Date.now(),
        type: "topup",
        amount: topupAmount,
        date: new Date(),
        description: "Nạp tiền vào ví",
        status: "completed",
      };

      setBalance((prevBalance) => prevBalance + topupAmount);
      setTransactions((prev) => [newTransaction, ...prev]);
      setShowTopupModal(false);
      setIsLoading(false);
    }, 1500);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (activeTab === "all") return true;
    if (activeTab === "in") return transaction.amount > 0;
    if (activeTab === "out") return transaction.amount < 0;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Ví Cà Phê
          </h1>
          <p className="text-gray-600">
            Quản lý và nạp tiền vào tài khoản để thanh toán dễ dàng
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <Loader className="w-12 h-12 text-amber-500 animate-spin mb-4" />
              <p className="text-amber-700 font-medium">
                Đang tải thông tin ví...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-800 rounded-3xl shadow-lg overflow-hidden mb-8">
              <div className="relative p-6">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <WalletIcon className="h-6 w-6 text-amber-200" />
                    <h2 className="text-white/90 font-medium">
                      Số Dư Hiện Tại
                    </h2>
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

              {/* Card Footer */}
              <div className="bg-black/10 backdrop-blur-sm py-4 px-6">
                <div className="flex items-center gap-2 text-amber-100">
                  <CreditCard size={18} />
                  <span>Ví của bạn</span>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <History className="text-amber-700" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      Lịch Sử Giao Dịch
                    </h2>
                  </div>

                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setActiveTab("all")}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                        activeTab === "all"
                          ? "bg-amber-700 text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Tất cả
                    </button>
                    <button
                      onClick={() => setActiveTab("in")}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                        activeTab === "in"
                          ? "bg-amber-700 text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Nạp tiền
                    </button>
                    <button
                      onClick={() => setActiveTab("out")}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                        activeTab === "out"
                          ? "bg-amber-700 text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Thanh toán
                    </button>
                  </div>
                </div>

                {filteredTransactions.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {filteredTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="py-4 flex items-center"
                      >
                        {/* Icon */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                            transaction.type === "topup"
                              ? "bg-green-100"
                              : "bg-amber-100"
                          }`}
                        >
                          {transaction.type === "topup" ? (
                            <TrendingUp className={`h-5 w-5 text-green-600`} />
                          ) : (
                            <Coffee className={`h-5 w-5 text-amber-600`} />
                          )}
                        </div>

                        {/* Transaction details */}
                        <div className="flex-1">
                          <h3 className="text-gray-800 font-medium">
                            {transaction.description}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {transaction.date.toLocaleDateString("vi-VN", {
                              day: "numeric",
                              month: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>

                        {/* Amount */}
                        <div
                          className={`text-right ${
                            transaction.amount > 0
                              ? "text-green-600"
                              : "text-amber-700"
                          }`}
                        >
                          <span className="font-semibold text-lg">
                            {transaction.amount > 0 ? "+" : ""}
                            {formatCurrency(transaction.amount)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-500">
                      Chưa có giao dịch nào
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Topup Modal */}
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
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {topupAmounts.map((amount) => (
                    <button
                      key={amount}
                      className={`py-3 px-4 border rounded-xl text-center font-medium transition-all ${
                        topupAmount === amount
                          ? "bg-amber-700 text-white border-amber-700"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-amber-50"
                      }`}
                      onClick={() => setTopupAmount(amount)}
                    >
                      {formatCurrency(amount)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hoặc nhập số tiền khác
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="number"
                    min="10000"
                    step="1000"
                    value={topupAmount}
                    onChange={(e) => setTopupAmount(Number(e.target.value))}
                    className="pl-10 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 py-3"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Số tiền nạp tối thiểu là 10,000đ
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleTopup}
                  disabled={isLoading}
                  className={`w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
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
        </div>
      )}
    </div>
  );
};

export default Wallet;
