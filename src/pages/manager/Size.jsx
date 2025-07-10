import { useEffect, useState } from "react";
import sizeService from "../../services/size.service";
import { toast } from "react-toastify";
import { Loader } from "lucide-react"; // Import Loader component

export default function SizeManagement() {
  const [sizes, setSizes] = useState([]);
  const [newSizeData, setNewSizeData] = useState({
    name: "",
    extraPrice: "",
    value: "",
  });
  const [editingSize, setEditingSize] = useState(null);
  const [editedSize, setEditedSize] = useState({
    name: "",
    extraPrice: "",
    value: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSizes();
  }, []);

  const fetchSizes = async () => {
    try {
      setIsLoading(true); // Start loading
      const data = await sizeService.getSizes();
      setSizes(data.data); // Ensure data structure matches the API response
    } catch (error) {
      toast.error("Lỗi khi tải danh sách kích thước.");
      console.error(error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleCreateSize = async () => {
    try {
      setIsLoading(true); // Start loading
      if (!newSizeData.name.trim()) {
        toast.error("Tên kích thước không được để trống.");
        return;
      }
      await sizeService.createSize({
        name: newSizeData.name,
        extraPrice: newSizeData.extraPrice,
        value: newSizeData.value,
      });
      toast.success("Thêm kích thước thành công.");
      setNewSizeData({ name: "", extraPrice: "", value: "" });
      fetchSizes();
    } catch (error) {
      toast.error("Lỗi khi thêm kích thước.");
      console.error(error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleEditSize = async (sizeId) => {
    try {
      if (!editedSize.name.trim()) {
        toast.error("Tên kích thước không được để trống.");
        return;
      }
      await sizeService.editSize(sizeId, {
        name: editedSize.name,
        extraPrice: editedSize.extraPrice,
        value: editedSize.value,
      });
      toast.success("Cập nhật kích thước thành công.");
      setEditingSize(null);
      setEditedSize({ name: "", extraPrice: "", value: "" });
      fetchSizes();
    } catch (error) {
      toast.error("Lỗi khi cập nhật kích thước.");
      console.error(error);
    }
  };

  const handleDeleteSize = async (sizeId) => {
    try {
      const confirmDelete = window.confirm(
        "Bạn có chắc chắn muốn xóa kích thước này?"
      );
      if (!confirmDelete) return;

      await sizeService.deleteSize(sizeId);
      toast.success("Xóa kích thước thành công.");
      fetchSizes();
    } catch (error) {
      toast.error("Lỗi khi xóa kích thước.");
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Quản Lý Kích Thước
      </h1>

      {/* Add Size */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Thêm Kích Thước
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={newSizeData.name}
            onChange={(e) =>
              setNewSizeData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Tên kích thước"
            className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            value={newSizeData.extraPrice}
            onChange={(e) =>
              setNewSizeData((prev) => ({
                ...prev,
                extraPrice: e.target.value,
              }))
            }
            placeholder="Giá thêm"
            className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            value={newSizeData.value}
            onChange={(e) =>
              setNewSizeData((prev) => ({ ...prev, value: e.target.value }))
            }
            placeholder="Giá trị"
            className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          onClick={handleCreateSize}
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all"
        >
          Thêm
        </button>
      </div>

      {/* Size List */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Danh Sách Kích Thước
        </h2>
        <table className="w-full border-collapse border rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-green-100 text-gray-700">
              <th className="border px-4 py-2 text-left">Tên Kích Thước</th>
              <th className="border px-4 py-2 text-left">Giá Thêm</th>
              <th className="border px-4 py-2 text-left">Giá Trị</th>
              <th className="border px-4 py-2 text-left">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((size) => (
              <tr key={size.id} className="hover:bg-gray-100 transition-all">
                <td className="border px-4 py-2">
                  {editingSize === size.id ? (
                    <input
                      type="text"
                      value={editedSize.name}
                      onChange={(e) =>
                        setEditedSize((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-2 py-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    size.name
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingSize === size.id ? (
                    <input
                      type="number"
                      value={editedSize.extraPrice}
                      onChange={(e) =>
                        setEditedSize((prev) => ({
                          ...prev,
                          extraPrice: e.target.value,
                        }))
                      }
                      className="w-full px-2 py-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    size.extraPrice
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingSize === size.id ? (
                    <input
                      type="number"
                      value={editedSize.value}
                      onChange={(e) =>
                        setEditedSize((prev) => ({
                          ...prev,
                          value: e.target.value,
                        }))
                      }
                      className="w-full px-2 py-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    size.value
                  )}
                </td>
                <td className="border px-4 py-2 flex gap-2">
                  {editingSize === size.id ? (
                    <button
                      onClick={() => handleEditSize(size.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
                    >
                      Lưu
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingSize(size.id);
                        setEditedSize(size);
                      }}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-all"
                    >
                      Sửa
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteSize(size.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-white/60 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <Loader className="animate-spin h-10 w-10 text-green-500 mb-4" />
            <div className="text-green-700 font-semibold text-lg">
              Đang xử lý...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
