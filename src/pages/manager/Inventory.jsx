"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Eye,
  X,
  Save,
} from "lucide-react";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "ingredients",
    unit: "kg",
    currentStock: "",
    minStock: "",
    maxStock: "",
    unitPrice: "",
    supplier: "",
  });

  const categories = [
    { id: "all", name: "Tất Cả" },
    { id: "ingredients", name: "Nguyên Liệu" },
    { id: "packaging", name: "Bao Bì" },
    { id: "equipment", name: "Thiết Bị" },
    { id: "supplies", name: "Vật Tư" },
  ];

  const statusFilters = [
    { id: "all", name: "Tất Cả" },
    { id: "in_stock", name: "Còn Hàng" },
    { id: "low_stock", name: "Sắp Hết" },
    { id: "out_of_stock", name: "Hết Hàng" },
  ];

  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Cà Phê Arabica",
      category: "ingredients",
      unit: "kg",
      currentStock: 2.5,
      minStock: 5,
      maxStock: 50,
      unitPrice: 180000,
      supplier: "Công ty Cà Phê Việt",
      lastUpdated: "2024-01-15T10:30:00",
      status: "low_stock",
      monthlyUsage: 15.2,
      trend: "up",
    },
    {
      id: 2,
      name: "Cà Phê Robusta",
      category: "ingredients",
      unit: "kg",
      currentStock: 25,
      minStock: 10,
      maxStock: 100,
      unitPrice: 120000,
      supplier: "Công ty Cà Phê Việt",
      lastUpdated: "2024-01-15T09:15:00",
      status: "in_stock",
      monthlyUsage: 28.5,
      trend: "stable",
    },
    {
      id: 3,
      name: "Sữa Đặc",
      category: "ingredients",
      unit: "lon",
      currentStock: 48,
      minStock: 20,
      maxStock: 200,
      unitPrice: 25000,
      supplier: "Vinamilk",
      lastUpdated: "2024-01-14T16:45:00",
      status: "in_stock",
      monthlyUsage: 85,
      trend: "up",
    },
    {
      id: 4,
      name: "Ly Nhựa 500ml",
      category: "packaging",
      unit: "cái",
      currentStock: 0,
      minStock: 100,
      maxStock: 2000,
      unitPrice: 500,
      supplier: "Công ty Bao Bì Xanh",
      lastUpdated: "2024-01-12T14:20:00",
      status: "out_of_stock",
      monthlyUsage: 450,
      trend: "down",
    },
    {
      id: 5,
      name: "Đường Trắng",
      category: "ingredients",
      unit: "kg",
      currentStock: 15,
      minStock: 5,
      maxStock: 50,
      unitPrice: 22000,
      supplier: "Công ty Đường Biên Hòa",
      lastUpdated: "2024-01-15T11:00:00",
      status: "in_stock",
      monthlyUsage: 12.8,
      trend: "stable",
    },
    {
      id: 6,
      name: "Máy Xay Cà Phê",
      category: "equipment",
      unit: "cái",
      currentStock: 2,
      minStock: 1,
      maxStock: 5,
      unitPrice: 15000000,
      supplier: "Công ty Thiết Bị Cafe",
      lastUpdated: "2024-01-10T08:30:00",
      status: "in_stock",
      monthlyUsage: 0,
      trend: "stable",
    },
  ]);

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "in_stock":
        return "bg-green-100 text-green-800";
      case "low_stock":
        return "bg-yellow-100 text-yellow-800";
      case "out_of_stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusName = (status) => {
    switch (status) {
      case "in_stock":
        return "Còn hàng";
      case "low_stock":
        return "Sắp hết";
      case "out_of_stock":
        return "Hết hàng";
      default:
        return "Không xác định";
    }
  };

  const getCategoryName = (category) => {
    switch (category) {
      case "ingredients":
        return "Nguyên liệu";
      case "packaging":
        return "Bao bì";
      case "equipment":
        return "Thiết bị";
      case "supplies":
        return "Vật tư";
      default:
        return "Không xác định";
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
    }
  };

  const getStockPercentage = (current, max) => {
    return Math.min((current / max) * 100, 100);
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.currentStock || !newItem.minStock) return;

    const item = {
      id: Date.now(),
      ...newItem,
      currentStock: Number.parseFloat(newItem.currentStock),
      minStock: Number.parseFloat(newItem.minStock),
      maxStock: Number.parseFloat(newItem.maxStock),
      unitPrice: Number.parseFloat(newItem.unitPrice),
      lastUpdated: new Date().toISOString(),
      status:
        Number.parseFloat(newItem.currentStock) <=
        Number.parseFloat(newItem.minStock)
          ? "low_stock"
          : "in_stock",
      monthlyUsage: 0,
      trend: "stable",
    };

    setInventory([...inventory, item]);
    setNewItem({
      name: "",
      category: "ingredients",
      unit: "kg",
      currentStock: "",
      minStock: "",
      maxStock: "",
      unitPrice: "",
      supplier: "",
    });
    setShowAddModal(false);
  };

  const handleEditItem = (item) => {
    setEditingItem({
      ...item,
      currentStock: item.currentStock.toString(),
      minStock: item.minStock.toString(),
      maxStock: item.maxStock.toString(),
      unitPrice: item.unitPrice.toString(),
    });
  };

  const handleSaveEdit = () => {
    const updatedItem = {
      ...editingItem,
      currentStock: Number.parseFloat(editingItem.currentStock),
      minStock: Number.parseFloat(editingItem.minStock),
      maxStock: Number.parseFloat(editingItem.maxStock),
      unitPrice: Number.parseFloat(editingItem.unitPrice),
      lastUpdated: new Date().toISOString(),
      status:
        Number.parseFloat(editingItem.currentStock) <=
        Number.parseFloat(editingItem.minStock)
          ? "low_stock"
          : "in_stock",
    };

    setInventory(
      inventory.map((item) => (item.id === editingItem.id ? updatedItem : item))
    );
    setEditingItem(null);
  };

  const handleDeleteItem = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa mục này?")) {
      setInventory(inventory.filter((item) => item.id !== id));
    }
  };

  const lowStockCount = inventory.filter(
    (item) => item.status === "low_stock"
  ).length;
  const outOfStockCount = inventory.filter(
    (item) => item.status === "out_of_stock"
  ).length;
  const totalValue = inventory.reduce(
    (sum, item) => sum + item.currentStock * item.unitPrice,
    0
  );

  return (
    <div className="p-6 bg-gradient-to-br from-amber-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Quản Lý Kho</h1>
          <p className="text-gray-600">Theo dõi và quản lý tồn kho</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-amber-600 text-white px-6 py-3 rounded-2xl hover:bg-amber-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Thêm Mặt Hàng
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {inventory.length}
          </div>
          <div className="text-gray-600 text-sm">Tổng mặt hàng</div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-yellow-700 mb-1">
            {lowStockCount}
          </div>
          <div className="text-gray-600 text-sm">Sắp hết hàng</div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-red-700 mb-1">
            {outOfStockCount}
          </div>
          <div className="text-gray-600 text-sm">Hết hàng</div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-green-700 mb-1">
            {(totalValue / 1000000).toFixed(1)}M
          </div>
          <div className="text-gray-600 text-sm">Giá trị tồn kho</div>
        </div>
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
              placeholder="Tìm theo tên mặt hàng, nhà cung cấp..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-3 rounded-2xl font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-amber-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {statusFilters.map((status) => (
              <button
                key={status.id}
                onClick={() => setSelectedStatus(status.id)}
                className={`px-4 py-3 rounded-2xl font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedStatus === status.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventory.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            {/* Item Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <span className="text-sm text-gray-600">
                    {getCategoryName(item.category)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    item.status
                  )}`}
                >
                  {getStatusName(item.status)}
                </span>
                {getTrendIcon(item.trend)}
              </div>
            </div>

            {/* Stock Info */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Tồn kho hiện tại</span>
                <span className="font-bold text-gray-800">
                  {item.currentStock} {item.unit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    item.status === "out_of_stock"
                      ? "bg-red-500"
                      : item.status === "low_stock"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: `${getStockPercentage(
                      item.currentStock,
                      item.maxStock
                    )}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Min: {item.minStock}</span>
                <span>Max: {item.maxStock}</span>
              </div>
            </div>

            {/* Item Details */}
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Đơn giá:</span>
                <span className="font-medium text-gray-800">
                  {item.unitPrice.toLocaleString("vi-VN")}₫/{item.unit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Giá trị:</span>
                <span className="font-medium text-amber-700">
                  {(item.currentStock * item.unitPrice).toLocaleString("vi-VN")}
                  ₫
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sử dụng/tháng:</span>
                <span className="font-medium text-gray-800">
                  {item.monthlyUsage} {item.unit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nhà cung cấp:</span>
                <span className="font-medium text-gray-800 text-right">
                  {item.supplier}
                </span>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-xs text-gray-500 mb-4">
              Cập nhật: {new Date(item.lastUpdated).toLocaleString("vi-VN")}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setShowDetailModal(true);
                }}
                className="flex-1 bg-blue-100 text-blue-600 py-2 rounded-xl hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Chi Tiết
              </button>
              <button
                onClick={() => handleEditItem(item)}
                className="flex-1 bg-green-100 text-green-600 py-2 rounded-xl hover:bg-green-200 transition-colors flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Sửa
              </button>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="px-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Thêm Mặt Hàng Mới
              </h3>
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
                    Tên mặt hàng *
                  </label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                    placeholder="Nhập tên mặt hàng"
                  />
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
                    <option value="ingredients">Nguyên liệu</option>
                    <option value="packaging">Bao bì</option>
                    <option value="equipment">Thiết bị</option>
                    <option value="supplies">Vật tư</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Đơn vị *
                  </label>
                  <select
                    value={newItem.unit}
                    onChange={(e) =>
                      setNewItem({ ...newItem, unit: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="kg">Kilogram (kg)</option>
                    <option value="g">Gram (g)</option>
                    <option value="l">Lít (l)</option>
                    <option value="ml">Mililít (ml)</option>
                    <option value="cái">Cái</option>
                    <option value="lon">Lon</option>
                    <option value="gói">Gói</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Đơn giá *
                  </label>
                  <input
                    type="number"
                    value={newItem.unitPrice}
                    onChange={(e) =>
                      setNewItem({ ...newItem, unitPrice: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                    placeholder="Nhập đơn giá"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tồn kho hiện tại *
                  </label>
                  <input
                    type="number"
                    value={newItem.currentStock}
                    onChange={(e) =>
                      setNewItem({ ...newItem, currentStock: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tồn kho tối thiểu *
                  </label>
                  <input
                    type="number"
                    value={newItem.minStock}
                    onChange={(e) =>
                      setNewItem({ ...newItem, minStock: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tồn kho tối đa
                  </label>
                  <input
                    type="number"
                    value={newItem.maxStock}
                    onChange={(e) =>
                      setNewItem({ ...newItem, maxStock: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nhà cung cấp
                </label>
                <input
                  type="text"
                  value={newItem.supplier}
                  onChange={(e) =>
                    setNewItem({ ...newItem, supplier: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  placeholder="Nhập tên nhà cung cấp"
                />
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
                  Thêm Mặt Hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Item Detail Modal */}
      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Chi Tiết Mặt Hàng
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-10 h-10 text-purple-700" />
                </div>
                <h4 className="text-xl font-bold text-gray-800">
                  {selectedItem.name}
                </h4>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    selectedItem.status
                  )}`}
                >
                  {getStatusName(selectedItem.status)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600">Danh mục</div>
                  <div className="font-medium text-gray-800">
                    {getCategoryName(selectedItem.category)}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600">Đơn vị</div>
                  <div className="font-medium text-gray-800">
                    {selectedItem.unit}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600">Tồn kho hiện tại</div>
                  <div className="font-medium text-gray-800">
                    {selectedItem.currentStock} {selectedItem.unit}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600">Đơn giá</div>
                  <div className="font-medium text-gray-800">
                    {selectedItem.unitPrice.toLocaleString("vi-VN")}₫
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600">Tồn kho tối thiểu</div>
                  <div className="font-medium text-gray-800">
                    {selectedItem.minStock} {selectedItem.unit}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-sm text-gray-600">Tồn kho tối đa</div>
                  <div className="font-medium text-gray-800">
                    {selectedItem.maxStock} {selectedItem.unit}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="text-sm text-gray-600">Nhà cung cấp</div>
                <div className="font-medium text-gray-800">
                  {selectedItem.supplier}
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="text-sm text-gray-600">Sử dụng hàng tháng</div>
                <div className="font-medium text-gray-800">
                  {selectedItem.monthlyUsage} {selectedItem.unit}
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="text-sm text-gray-600">Cập nhật lần cuối</div>
                <div className="font-medium text-gray-800">
                  {new Date(selectedItem.lastUpdated).toLocaleString("vi-VN")}
                </div>
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
                Chỉnh Sửa Mặt Hàng
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên mặt hàng *
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tồn kho hiện tại *
                  </label>
                  <input
                    type="number"
                    value={editingItem.currentStock}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        currentStock: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tồn kho tối thiểu *
                  </label>
                  <input
                    type="number"
                    value={editingItem.minStock}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        minStock: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tồn kho tối đa
                  </label>
                  <input
                    type="number"
                    value={editingItem.maxStock}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        maxStock: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Đơn giá *
                </label>
                <input
                  type="number"
                  value={editingItem.unitPrice}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      unitPrice: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nhà cung cấp
                </label>
                <input
                  type="text"
                  value={editingItem.supplier}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, supplier: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                />
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
      {filteredInventory.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Không có mặt hàng nào
          </h3>
          <p className="text-gray-500">
            Không tìm thấy mặt hàng phù hợp với bộ lọc hiện tại
          </p>
        </div>
      )}
    </div>
  );
};

export default Inventory;
