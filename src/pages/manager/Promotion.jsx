import { useEffect, useState } from "react";
import promotionService from "../../services/promotion.service";

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPromotion, setNewPromotion] = useState({
    name: "",
    code: "",
    condition: 0,
    description: "",
    discountPercent: 0,
    startDate: "",
    endDate: "",
    status: true,
  });
  const [error, setError] = useState("");
  const [editPromotion, setEditPromotion] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    setLoading(true);
    const res = await promotionService.getAllPromotion();
    if (res && res.data && res.data.data) {
      setPromotions(res.data.data);
    }
    setLoading(false);
  };

  const handleAddPromotion = async (e) => {
    e.preventDefault();
    setError("");
    if (
      !newPromotion.name ||
      !newPromotion.startDate ||
      !newPromotion.endDate
    ) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    const res = await promotionService.createPromotion(newPromotion);
    if (res && res.data) {
      setShowAddModal(false);
      setNewPromotion({
        name: "",
        code: "",
        condition: 0,
        description: "",
        discountPercent: 0,
        startDate: "",
        endDate: "",
        status: true,
      });
      fetchPromotions();
    } else {
      setError("Tạo khuyến mãi thất bại!");
    }
  };

  const handleEditClick = (promo) => {
    setEditPromotion({ ...promo });
    setShowEditModal(true);
  };

  const handleEditPromotion = async (e) => {
    e.preventDefault();
    setError("");
    if (
      !editPromotion.name ||
      !editPromotion.startDate ||
      !editPromotion.endDate
    ) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    const res = await promotionService.updatePromotion(
      editPromotion.id,
      editPromotion
    );
    if (res && res.data) {
      setShowEditModal(false);
      setEditPromotion(null);
      fetchPromotions();
    } else {
      setError("Cập nhật khuyến mãi thất bại!");
    }
  };

  const handleDeletePromotion = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa khuyến mãi này?")) return;
    const res = await promotionService.deletePromotion(id);
    if (res && res.data) {
      fetchPromotions();
    } else {
      alert("Xóa khuyến mãi thất bại!");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-amber-50 to-white min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản Lý Khuyến Mãi</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-amber-600 text-white px-6 py-3 rounded-2xl hover:bg-amber-700 transition-colors"
        >
          Thêm Khuyến Mãi
        </button>
      </div>

      {/* Danh sách khuyến mãi */}
      <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
        {loading ? (
          <div>Đang tải...</div>
        ) : promotions.length === 0 ? (
          <div>Không có khuyến mãi nào.</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4">Tên</th>
                <th className="py-2 px-4">Mã</th>
                <th className="py-2 px-4">Điều kiện</th>
                <th className="py-2 px-4">Phần trăm giảm</th>
                <th className="py-2 px-4">Mô tả</th>
                <th className="py-2 px-4">Ngày bắt đầu</th>
                <th className="py-2 px-4">Ngày kết thúc</th>
                <th className="py-2 px-4">Trạng thái</th>
                <th className="py-2 px-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promo) => (
                <tr key={promo.id} className="border-t">
                  <td className="py-2 px-4 font-semibold">{promo.name}</td>
                  <td className="py-2 px-4">{promo.code}</td>
                  <td className="py-2 px-4">{promo.condition}</td>
                  <td className="py-2 px-4">{promo.discountPercent}%</td>
                  <td className="py-2 px-4">{promo.description}</td>
                  <td className="py-2 px-4">
                    {promo.startDate ? promo.startDate.split("T")[0] : ""}
                  </td>
                  <td className="py-2 px-4">
                    {promo.endDate ? promo.endDate.split("T")[0] : ""}
                  </td>
                  <td className="py-2 px-4">
                    {promo.status ? (
                      <span className="text-green-600 font-bold">
                        Đang hoạt động
                      </span>
                    ) : (
                      <span className="text-gray-400">Ngừng</span>
                    )}
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200"
                      onClick={() => handleEditClick(promo)}
                    >
                      Sửa
                    </button>
                    <button
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-xl hover:bg-red-200"
                      onClick={() => handleDeletePromotion(promo.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal thêm khuyến mãi */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">Thêm Khuyến Mãi Mới</h2>
            <form onSubmit={handleAddPromotion} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Tên khuyến mãi *
                </label>
                <input
                  type="text"
                  value={newPromotion.name}
                  onChange={(e) =>
                    setNewPromotion({ ...newPromotion, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Mã khuyến mãi *
                </label>
                <input
                  type="text"
                  value={newPromotion.code}
                  onChange={(e) =>
                    setNewPromotion({ ...newPromotion, code: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">
                    Điều kiện (VND)
                  </label>
                  <input
                    type="number"
                    value={newPromotion.condition}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        condition: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">
                    Phần trăm giảm (%) *
                  </label>
                  <input
                    type="number"
                    value={newPromotion.discountPercent}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        discountPercent: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Mô tả
                </label>
                <textarea
                  value={newPromotion.description}
                  onChange={(e) =>
                    setNewPromotion({
                      ...newPromotion,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none resize-none"
                  rows={2}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">
                    Ngày bắt đầu *
                  </label>
                  <input
                    type="date"
                    value={newPromotion.startDate}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        startDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">
                    Ngày kết thúc *
                  </label>
                  <input
                    type="date"
                    value={newPromotion.endDate}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        endDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Trạng thái
                </label>
                <select
                  value={newPromotion.status}
                  onChange={(e) =>
                    setNewPromotion({
                      ...newPromotion,
                      status: e.target.value === "true",
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                >
                  <option value="true">Đang hoạt động</option>
                  <option value="false">Ngừng</option>
                </select>
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-2xl hover:bg-gray-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 text-white py-3 rounded-2xl hover:bg-amber-700 transition-colors"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal sửa khuyến mãi */}
      {showEditModal && editPromotion && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6">Sửa Khuyến Mãi</h2>
            <form onSubmit={handleEditPromotion} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Tên khuyến mãi *
                </label>
                <input
                  type="text"
                  value={editPromotion.name}
                  onChange={(e) =>
                    setEditPromotion({ ...editPromotion, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Mã khuyến mãi *
                </label>
                <input
                  type="text"
                  value={editPromotion.code}
                  onChange={(e) =>
                    setEditPromotion({ ...editPromotion, code: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">
                    Điều kiện (VND)
                  </label>
                  <input
                    type="number"
                    value={editPromotion.condition}
                    onChange={(e) =>
                      setEditPromotion({
                        ...editPromotion,
                        condition: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">
                    Phần trăm giảm (%) *
                  </label>
                  <input
                    type="number"
                    value={editPromotion.discountPercent}
                    onChange={(e) =>
                      setEditPromotion({
                        ...editPromotion,
                        discountPercent: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Mô tả
                </label>
                <textarea
                  value={editPromotion.description}
                  onChange={(e) =>
                    setEditPromotion({
                      ...editPromotion,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none resize-none"
                  rows={2}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">
                    Ngày bắt đầu *
                  </label>
                  <input
                    type="date"
                    value={
                      editPromotion.startDate
                        ? editPromotion.startDate.split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setEditPromotion({
                        ...editPromotion,
                        startDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">
                    Ngày kết thúc *
                  </label>
                  <input
                    type="date"
                    value={
                      editPromotion.endDate
                        ? editPromotion.endDate.split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setEditPromotion({
                        ...editPromotion,
                        endDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Trạng thái
                </label>
                <select
                  value={editPromotion.status}
                  onChange={(e) =>
                    setEditPromotion({
                      ...editPromotion,
                      status: e.target.value === "true",
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                >
                  <option value="true">Đang hoạt động</option>
                  <option value="false">Ngừng</option>
                </select>
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditPromotion(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-2xl hover:bg-gray-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 text-white py-3 rounded-2xl hover:bg-amber-700 transition-colors"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionManagement;
