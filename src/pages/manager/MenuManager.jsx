"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Coffee,
  UtensilsCrossed,
  Cookie,
  Leaf,
  Eye,
  EyeOff,
  Save,
  X,
  Upload,
  DollarSign,
} from "lucide-react";

const MenuManagement = () => {
  const [activeCategory, setActiveCategory] = useState("coffee");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [newItem, setNewItem] = useState({
    name: "",
    nameEn: "",
    description: "",
    price: "",
    category: "coffee",
    available: true,
    image: "",
  });

  const categories = [
    {
      id: "coffee",
      name: "Cà Phê",
      icon: Coffee,
      color: "from-amber-500 to-amber-600",
    },
    {
      id: "tea",
      name: "Trà",
      icon: Leaf,
      color: "from-green-500 to-green-600",
    },
    {
      id: "food",
      name: "Đồ Ăn",
      icon: UtensilsCrossed,
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "desserts",
      name: "Tráng Miệng",
      icon: Cookie,
      color: "from-pink-500 to-pink-600",
    },
  ];

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      category: "coffee",
      name: "Cà Phê Phin Truyền Thống",
      nameEn: "Traditional Vietnamese Drip Coffee",
      description: "Cà phê Việt Nam truyền thống pha bằng phin với sữa đặc",
      price: 25000,
      available: true,
      image: "/placeholder.svg?height=100&width=100",
      soldToday: 28,
      revenue: 700000,
    },
    {
      id: 2,
      category: "coffee",
      name: "Cà Phê Đá",
      nameEn: "Iced Coffee",
      description: "Cà phê Việt Nam mát lạnh, thơm ngon giải khát",
      price: 28000,
      available: true,
      image: "/placeholder.svg?height=100&width=100",
      soldToday: 24,
      revenue: 672000,
    },
    {
      id: 3,
      category: "coffee",
      name: "Cà Phê Dừa",
      nameEn: "Coconut Coffee",
      description: "Cà phê pha với kem dừa tươi, hương vị nhiệt đới",
      price: 32000,
      available: false,
      image: "/placeholder.svg?height=100&width=100",
      soldToday: 0,
      revenue: 0,
    },
    {
      id: 4,
      category: "coffee",
      name: "Cà Phê Trứng",
      nameEn: "Egg Coffee",
      description: "Lớp kem trứng béo ngậy trên nền cà phê đậm đà",
      price: 35000,
      available: true,
      image: "/placeholder.svg?height=100&width=100",
      soldToday: 15,
      revenue: 525000,
    },
    {
      id: 5,
      category: "tea",
      name: "Trà Xanh",
      nameEn: "Green Tea",
      description: "Trà xanh Việt Nam truyền thống, thanh mát",
      price: 20000,
      available: true,
      image: "/placeholder.svg?height=100&width=100",
      soldToday: 12,
      revenue: 240000,
    },
    {
      id: 6,
      category: "food",
      name: "Bánh Mì Thịt Nướng",
      nameEn: "Grilled Pork Bánh Mì",
      description: "Bánh mì Việt Nam với thịt nướng thơm ngon",
      price: 45000,
      available: true,
      image: "/placeholder.svg?height=100&width=100",
      soldToday: 18,
      revenue: 810000,
    },
  ]);

  const filteredItems = menuItems.filter(
    (item) =>
      item.category === activeCategory &&
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) return;

    const item = {
      id: Date.now(),
      ...newItem,
      price: Number.parseInt(newItem.price),
      soldToday: 0,
      revenue: 0,
    };

    setMenuItems([...menuItems, item]);
    setNewItem({
      name: "",
      nameEn: "",
      description: "",
      price: "",
      category: "coffee",
      available: true,
      image: "",
    });
    setShowAddModal(false);
  };

  const handleEditItem = (item) => {
    setEditingItem({ ...item, price: item.price.toString() });
  };

  const handleSaveEdit = () => {
    if (!editingItem.name || !editingItem.price) return;

    setMenuItems(
      menuItems.map((item) =>
        item.id === editingItem.id
          ? {
              ...editingItem,
              price: Number.parseInt(editingItem.price),
            }
          : item
      )
    );
    setEditingItem(null);
  };

  const handleDeleteItem = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa món này?")) {
      setMenuItems(menuItems.filter((item) => item.id !== id));
    }
  };

  const toggleAvailability = (id) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  return (
    <div className="p-6 bg-gradient-to-br from-amber-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Quản Lý Thực Đơn</h1>
          <p className="text-gray-600">Thêm, sửa, xóa món ăn và đồ uống</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-amber-600 text-white px-6 py-3 rounded-2xl hover:bg-amber-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Thêm Món Mới
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm món ăn..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
          >
            {/* Item Image */}
            <div className="relative h-48 bg-gradient-to-br from-amber-100 to-amber-200">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => toggleAvailability(item.id)}
                  className={`p-2 rounded-xl ${
                    item.available
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.available ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
              {!item.available && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Hết Hàng
                  </span>
                </div>
              )}
            </div>

            {/* Item Info */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{item.nameEn}</p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="mb-4">
                <div className="text-2xl font-bold text-amber-700 mb-2">
                  {item.price.toLocaleString("vi-VN")}₫
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Đã bán: {item.soldToday}</span>
                  <span>DT: {item.revenue.toLocaleString("vi-VN")}₫</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditItem(item)}
                  className="flex-1 bg-blue-100 text-blue-600 py-2 rounded-xl hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="flex-1 bg-red-100 text-red-600 py-2 rounded-xl hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Thêm Món Mới</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên món (Tiếng Việt) *
                  </label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                    placeholder="Nhập tên món"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên món (Tiếng Anh)
                  </label>
                  <input
                    type="text"
                    value={newItem.nameEn}
                    onChange={(e) =>
                      setNewItem({ ...newItem, nameEn: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                    placeholder="English name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder="Mô tả món ăn"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Giá (VNĐ) *
                  </label>
                  <div className="relative">
                    <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="number"
                      value={newItem.price}
                      onChange={(e) =>
                        setNewItem({ ...newItem, price: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                      placeholder="25000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Danh mục *
                  </label>
                  <select
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({ ...newItem, category: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hình ảnh
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Kéo thả hình ảnh hoặc click để chọn
                  </p>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="available"
                  checked={newItem.available}
                  onChange={(e) =>
                    setNewItem({ ...newItem, available: e.target.checked })
                  }
                  className="w-5 h-5 text-amber-600"
                />
                <label htmlFor="available" className="text-gray-700">
                  Có sẵn để bán
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-2xl hover:bg-gray-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddItem}
                  className="flex-1 bg-amber-600 text-white py-3 rounded-2xl hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Thêm Món
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Chỉnh Sửa Món
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên món (Tiếng Việt) *
                  </label>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên món (Tiếng Anh)
                  </label>
                  <input
                    type="text"
                    value={editingItem.nameEn}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, nameEn: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Giá (VNĐ) *
                </label>
                <div className="relative">
                  <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="number"
                    value={editingItem.price}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, price: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="editAvailable"
                  checked={editingItem.available}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      available: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-amber-600"
                />
                <label htmlFor="editAvailable" className="text-gray-700">
                  Có sẵn để bán
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setEditingItem(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-2xl hover:bg-gray-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-amber-600 text-white py-3 rounded-2xl hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Lưu Thay Đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Coffee className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Không có món nào
          </h3>
          <p className="text-gray-500">
            Không tìm thấy món nào phù hợp với bộ lọc hiện tại
          </p>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
