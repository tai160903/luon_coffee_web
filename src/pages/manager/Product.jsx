import { useState } from "react";
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
} from "react-icons/fa";

const Product = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState(null);

  // Sample product data
  const [products, setProducts] = useState([
    {
      id: 1,
      image: "/images/products/highlands-arabica.jpg",
      name: "Highlands Arabica",
      category: "Coffee Beans",
      price: 14.99,
      stock: 85,
      sku: "VNCF-001",
      status: "Active",
    },
    {
      id: 2,
      image: "/images/products/saigon-phin-filter.jpg",
      name: "Saigon Phin Filter",
      category: "Accessories",
      price: 19.99,
      stock: 42,
      sku: "VNCF-002",
      status: "Active",
    },
    {
      id: 3,
      image: "/images/products/robusta-dark-roast.jpg",
      name: "Robusta Dark Roast",
      category: "Coffee Beans",
      price: 12.99,
      stock: 68,
      sku: "VNCF-003",
      status: "Active",
    },
    {
      id: 4,
      image: "/images/products/coconut-coffee.jpg",
      name: "Coconut Coffee",
      category: "Coffee Beans",
      price: 16.99,
      stock: 37,
      sku: "VNCF-004",
      status: "Low Stock",
    },
    {
      id: 5,
      image: "/images/products/vietnamese-coffee-sampler.jpg",
      name: "Vietnamese Coffee Sampler",
      category: "Gift Sets",
      price: 32.99,
      stock: 24,
      sku: "VNCF-005",
      status: "Low Stock",
    },
    {
      id: 6,
      image: "/images/products/egg-coffee-kit.jpg",
      name: "Egg Coffee Kit",
      category: "Gift Sets",
      price: 24.99,
      stock: 53,
      sku: "VNCF-006",
      status: "Active",
    },
    {
      id: 7,
      image: "/images/products/ceramic-coffee-mug.jpg",
      name: "Ceramic Coffee Mug",
      category: "Accessories",
      price: 9.99,
      stock: 98,
      sku: "VNCF-007",
      status: "Active",
    },
    {
      id: 8,
      image: "/images/products/hanoi-blend.jpg",
      name: "Hanoi Blend",
      category: "Coffee Beans",
      price: 15.99,
      stock: 0,
      sku: "VNCF-008",
      status: "Out of Stock",
    },
  ]);

  const categories = ["All", "Coffee Beans", "Accessories", "Gift Sets"];

  // Handle sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting and filtering
  const sortedProducts = [...products]
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === "All" || product.category === filterCategory;
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

  // Handle checkbox selection
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

  // Get sorting indicator
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <p className="text-gray-600">
          Manage your coffee products and inventory
        </p>
      </div>

      {/* Action bar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#8B4513] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#6B3105] transition-colors"
          >
            <FaPlus className="mr-2" /> Add Product
          </button>

          {selectedProducts.length > 0 && (
            <button
              onClick={() => setDeleteConfirmProduct("bulk")}
              className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-red-600 transition-colors"
            >
              <FaTrashAlt className="mr-2" /> Delete Selected
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
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
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
                    Product
                    {getSortIndicator("name")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("category")}
                >
                  <div className="flex items-center">
                    Category
                    {getSortIndicator("category")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("price")}
                >
                  <div className="flex items-center">
                    Price
                    {getSortIndicator("price")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("stock")}
                >
                  <div className="flex items-center">
                    Stock
                    {getSortIndicator("stock")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {getSortIndicator("status")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
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
                      <span className="text-xs text-gray-500">
                        SKU: {product.sku}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      <FaTags className="mr-1 text-gray-400" size={10} />
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.stock}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : product.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status === "Low Stock" && (
                        <FaExclamationTriangle className="mr-1" size={10} />
                      )}
                      {product.status}
                    </span>
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

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{sortedProducts.length}</span> of{" "}
                <span className="font-medium">{products.length}</span> products
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-[#8B4513] text-sm font-medium text-white"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </a>
              </nav>
            </div>
          </div>
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
                      defaultValue={editingProduct?.category || categories[1]}
                    >
                      {categories.slice(1).map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="sku"
                      className="block text-sm font-medium text-gray-700"
                    >
                      SKU
                    </label>
                    <input
                      type="text"
                      name="sku"
                      id="sku"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]"
                      defaultValue={editingProduct?.sku}
                    />
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
    </div>
  );
};

export default Product;
