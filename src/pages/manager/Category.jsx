import { useEffect, useState } from "react";
import categoryService from "../../services/category.service";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await categoryService.getAll();
      setCategories(res.data || []);
    } catch (error) {
      toast.error("Không thể tải danh mục");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!categoryName.trim()) {
      toast.error("Tên danh mục không được để trống");
      return;
    }
    setLoading(true);
    try {
      if (editingCategory) {
        await categoryService.update(editingCategory.id, {
          name: categoryName,
        });
        toast.success("Cập nhật danh mục thành công!");
      } else {
        await categoryService.create({ name: categoryName });
        toast.success("Thêm danh mục thành công!");
      }
      setShowModal(false);
      setEditingCategory(null);
      setCategoryName("");
      fetchCategories();
    } catch (error) {
      toast.error("Lỗi khi lưu danh mục");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await categoryService.delete(id);
      toast.success("Xóa danh mục thành công!");
      fetchCategories();
    } catch (error) {
      toast.error("Lỗi khi xóa danh mục");
    }
    setDeleteConfirm(null);
    setLoading(false);
  };

  return (
    <div className="px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý danh mục</h1>
        <button
          className="bg-[#8B4513] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#6B3105] transition-colors"
          onClick={() => {
            setShowModal(true);
            setEditingCategory(null);
            setCategoryName("");
          }}
        >
          <FaPlus className="mr-2" /> Thêm danh mục
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64 flex-col">
          <Loader className="w-12 h-12 text-amber-400 animate-spin mb-4" />
          <p className="text-lg text-amber-300">Đang tải danh mục...</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tên danh mục
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{cat.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                      onClick={() => {
                        setEditingCategory(cat);
                        setCategoryName(cat.name);
                        setShowModal(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => setDeleteConfirm(cat)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={2} className="text-center py-8 text-gray-400">
                    Không có danh mục nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Thêm/Sửa */}
      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
            <div className="bg-white rounded-lg shadow-xl z-10 w-full max-w-md p-6 relative">
              <h2 className="text-lg font-bold mb-4">
                {editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
              </h2>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                placeholder="Tên danh mục"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  className="bg-gray-200 px-4 py-2 rounded-md"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCategory(null);
                    setCategoryName("");
                  }}
                >
                  Hủy
                </button>
                <button
                  className="bg-[#8B4513] text-white px-4 py-2 rounded-md"
                  onClick={handleSave}
                  disabled={loading}
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal xác nhận xóa */}
      {deleteConfirm && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
            <div className="bg-white rounded-lg shadow-xl z-10 w-full max-w-md p-6 relative">
              <h2 className="text-lg font-bold mb-4">Xác nhận xóa</h2>
              <p>
                Bạn có chắc chắn muốn xóa danh mục <b>{deleteConfirm.name}</b>?
              </p>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  className="bg-gray-200 px-4 py-2 rounded-md"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Hủy
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={() => handleDelete(deleteConfirm.id)}
                  disabled={loading}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
