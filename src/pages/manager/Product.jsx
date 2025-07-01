import { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaTags,
  FaExclamationTriangle,
  FaStar,
} from "react-icons/fa";
import ProductService from "../../services/product.service";
import { Loader } from "lucide-react";
import formatCurrency from "../../utils/formatCurrency";
import catagoryService from "../../services/category.service";

const Product = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await ProductService.getProducts();
    if (response && Array.isArray(response.data)) {
      setProducts(response.data);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await catagoryService.getAll();
      setCategories([
        { id: "all", name: "Tất cả" },
        ...categoriesData.data.map((category) => ({
          id: category.id,
          name: category.name,
        })),
      ]);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...products]
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === "all" || product.category.id === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(sortedProducts.map((product) => product.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
      setSelectAll(false);
    } else {
      setSelectedProducts([...selectedProducts, productId]);
      if (selectedProducts.length + 1 === sortedProducts.length) {
        setSelectAll(true);
      }
    }
  };

  const handleDelete = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
    setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    setDeleteConfirmProduct(null);
  };

  const handleBulkDelete = () => {
    setProducts(
      products.filter((product) => !selectedProducts.includes(product.id))
    );
    setSelectedProducts([]);
    setSelectAll(false);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <FaChevronUp className="ml-1 text-xs" />
    ) : (
      <FaChevronDown className="ml-1 text-xs" />
    );
  };

  return (
    <div className="px-1">
      {loading ? (
        <div className="flex justify-center items-center h-64 flex-col">
          <Loader className="w-12 h-12 text-amber-400 animate-spin mb-4" />
          <p className="text-gray-600 text-lg text-amber-300">
            Đang tải danh sách
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Sản phẩm</h1>
            <p className="text-gray-600">
              Quản lý danh sách sản phẩm của bạn, thêm mới, chỉnh sửa và xóa sản
              phẩm một cách dễ dàng.
            </p>
          </div>

          {/* Action bar */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-[#8B4513] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#6B3105] transition-colors"
              >
                <FaPlus className="mr-2" /> Thêm Sản Phẩm
              </button>

              {selectedProducts.length > 0 && (
                <button
                  onClick={() => setDeleteConfirmProduct("bulk")}
                  className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-red-600 transition-colors"
                >
                  <FaTrashAlt className="mr-2" /> Xóa Đã Chọn (
                  {selectedProducts.length})
                </button>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>

              <div className="relative">
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <FaFilter className="absolute left-3 top-3 text-gray-400" />
                <FaChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Products table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-[#8B4513] border-gray-300 rounded focus:ring-[#8B4513]"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </div>
                    </th>
                    <th scope="col" className="px-4 py-3 text-left"></th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("name")}
                    >
                      <div className="flex items-center">
                        Tên Sản Phẩm
                        {getSortIndicator("name")}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("category")}
                    >
                      <div className="flex items-center">
                        Danh Mục
                        {getSortIndicator("category")}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("price")}
                    >
                      <div className="flex items-center">
                        Giá
                        {getSortIndicator("price")}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("description")}
                    >
                      <div className="flex items-center">
                        Mô Tả
                        {getSortIndicator("description")}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("rating")}
                    >
                      <div className="flex items-center">
                        Đánh Giá
                        {getSortIndicator("rating")}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("purchaseCount")}
                    >
                      <div className="flex items-center">
                        Số Lượng Mua
                        {getSortIndicator("purchaseCount")}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Hành Động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-[#8B4513] border-gray-300 rounded focus:ring-[#8B4513]"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="%23cccccc"><path d="M4 5h16v14H4V5zm16 0l-8 6-8-6h16z"/></svg>';
                              e.target.onerror = null;
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          <FaTags className="mr-1 text-gray-400" size={10} />
                          {product.category.name}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.description}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <FaStar className="text-yellow-500 mr-1" />
                          {product.rating}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.purchaseCount}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                          onClick={() => setEditingProduct(product)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => setDeleteConfirmProduct(product)}
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add/Edit Product Modal */}
          {(showAddModal || editingProduct) && (
            <div className="fixed z-50 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                      {editingProduct ? "Edit Product" : "Add New Product"}
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Product Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]"
                          defaultValue={editingProduct?.name}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Price ($)
                          </label>
                          <input
                            type="number"
                            name="price"
                            id="price"
                            step="0.01"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]"
                            defaultValue={editingProduct?.price}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="stock"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Stock
                          </label>
                          <input
                            type="number"
                            name="stock"
                            id="stock"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]"
                            defaultValue={editingProduct?.stock}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category
                        </label>
                        <select
                          id="category"
                          name="category"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513] rounded-md"
                          defaultValue={
                            editingProduct?.category || categories[1]
                          }
                        >
                          {categories.slice(1).map((category, index) => (
                            <option key={index} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Product Image
                        </label>
                        <div className="mt-1 flex items-center">
                          <div className="h-32 w-32 rounded overflow-hidden bg-gray-100">
                            {editingProduct?.image ? (
                              <img
                                src={editingProduct.image}
                                alt={editingProduct.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-gray-400">
                                No image
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513]"
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#8B4513] text-base font-medium text-white hover:bg-[#6B3105] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513] sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setShowAddModal(false);
                        setEditingProduct(null);
                      }}
                    >
                      {editingProduct ? "Save Changes" : "Add Product"}
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setShowAddModal(false);
                        setEditingProduct(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {deleteConfirmProduct && (
            <div className="fixed z-50 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <FaExclamationTriangle className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {deleteConfirmProduct === "bulk"
                            ? `Delete ${selectedProducts.length} selected products`
                            : `Delete ${deleteConfirmProduct.name}`}
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {deleteConfirmProduct === "bulk"
                              ? "Are you sure you want to delete the selected products? This action cannot be undone."
                              : "Are you sure you want to delete this product? This action cannot be undone."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        if (deleteConfirmProduct === "bulk") {
                          handleBulkDelete();
                        } else {
                          handleDelete(deleteConfirmProduct.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setDeleteConfirmProduct(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Product;
