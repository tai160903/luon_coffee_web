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
  FaCloudUploadAlt,
} from "react-icons/fa";
import ProductService from "../../services/product.service";
import { Loader } from "lucide-react";
import formatCurrency from "../../utils/formatCurrency";
import catagoryService from "../../services/category.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloudinaryService from "../../services/cloudinary.service";

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
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [cloudinaryPublicId, setCloudinaryPublicId] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <FaChevronUp className="ml-1" />
    ) : (
      <FaChevronDown className="ml-1" />
    );
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await ProductService.getAllProducts();

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

  const validateProductForm = () => {
    const nameInput = document.getElementById("name").value.trim();
    const priceInput = document.getElementById("price").value;
    const categoryIdInput = document.getElementById("categoryId").value;

    const errors = [];
    if (!nameInput) {
      errors.push("Tên sản phẩm không được để trống");
    } else if (nameInput.length > 100) {
      errors.push("Tên sản phẩm không được vượt quá 100 ký tự");
    }
    if (!priceInput) {
      errors.push("Giá sản phẩm không được để trống");
    } else {
      const price = parseFloat(priceInput);
      if (isNaN(price)) {
        errors.push("Giá sản phẩm phải là số");
      } else if (price <= 0) {
        errors.push("Giá sản phẩm phải lớn hơn 0");
      } else if (price > 1000000) {
        errors.push("Giá sản phẩm quá cao, vui lòng kiểm tra lại");
      }
    }
    if (!categoryIdInput) {
      errors.push("Vui lòng chọn danh mục");
    }
    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  };

  const handleSaveProduct = async () => {
    const validation = validateProductForm();

    if (!validation.isValid) {
      validation.errors.forEach((error) => toast.error(error));
      return;
    }

    const nameInput = document.getElementById("name").value;
    const descriptionInput = document.getElementById("description").value;
    const priceInput = document.getElementById("price").value;
    const categoryIdInput = document.getElementById("categoryId").value;

    setLoading(true);

    try {
      const formattedName = capitalizeWords(nameInput.trim());

      const productData = {
        name: formattedName,
        description: descriptionInput,
        price: parseFloat(priceInput),
        image: imageUrl || editingProduct?.image || "",
        categoryId: categoryIdInput,
      };

      let response;

      if (editingProduct) {
        response = await ProductService.updateProduct(
          editingProduct.id,
          productData
        );

        if (response) {
          toast.success("Cập nhật sản phẩm thành công!");

          setProducts(
            products.map((p) =>
              p.id === editingProduct.id
                ? {
                    ...p,
                    ...productData,
                    image: imageUrl || p.image,
                    cloudinaryPublicId:
                      cloudinaryPublicId || p.cloudinaryPublicId,
                  }
                : p
            )
          );
        } else {
          throw new Error("Không thể cập nhật sản phẩm");
        }
      } else {
        response = await ProductService.createProduct(productData);

        if (response) {
          toast.success("Thêm sản phẩm thành công!");

          await fetchProducts();
        } else {
          throw new Error("Không thể thêm sản phẩm mới");
        }
      }

      setShowAddModal(false);
      setEditingProduct(null);
      setImageUrl("");
      setImagePreview("");
      setCloudinaryPublicId("");
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(`Lỗi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        if (!file.type.match("image.*")) {
          toast.error("Vui lòng chọn tệp hình ảnh");
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          toast.error(
            "Kích thước hình ảnh quá lớn. Vui lòng chọn hình dưới 5MB"
          );
          return;
        }

        setUploadingImage(true);
        const tempPreview = URL.createObjectURL(file);
        setImagePreview(tempPreview);
        const response = await CloudinaryService(file);
        setImageUrl(response.secure_url);
        setCloudinaryPublicId(response.public_id);
        toast.success("Hình ảnh đã được tải lên thành công!");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Có lỗi khi tải lên hình ảnh. Vui lòng thử lại.");
        setImagePreview("");
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const capitalizeWords = (text) => {
    if (!text) return "";
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleDelete = async (productId) => {
    try {
      setLoading(true);

      // const response = await ProductService.deleteProduct(productId);

      setProducts(products.filter((product) => product.id !== productId));
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
      toast.success("Xóa sản phẩm thành công!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(`Lỗi: ${error.message}`);
    } finally {
      setLoading(false);
      setDeleteConfirmProduct(null);
    }
  };

  const handleBulkDelete = async () => {
    try {
      setLoading(true);

      setProducts(
        products.filter((product) => !selectedProducts.includes(product.id))
      );
      setSelectedProducts([]);
      toast.success(`Đã xóa ${selectedProducts.length} sản phẩm thành công!`);
    } catch (error) {
      console.error("Error bulk deleting products:", error);
      toast.error(`Lỗi: ${error.message}`);
    } finally {
      setLoading(false);
      setDeleteConfirmProduct(null);
      setSelectAll(false);
    }
  };

  const handleToggleAvailable = async (productId) => {
    try {
      setLoading(true);
      const product = products.find((p) => p.id === productId);
      if (!product) throw new Error("Sản phẩm không tồn tại");

      const updatedProduct = {
        ...product,
        isAvaillable: !product.isAvaillable,
      };

      const response = await ProductService.updateAvailable(productId);

      if (response) {
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === productId ? updatedProduct : p))
        );
        toast.success(
          `Đã ${product.isAvaillable ? "vô hiệu hóa" : "kích hoạt"} sản phẩm`
        );
      } else {
        throw new Error("Không thể cập nhật trạng thái sản phẩm");
      }
    } catch (error) {
      console.error("Error toggling product availability:", error);
      toast.error(`Lỗi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-1">
      {loading ? (
        <div className="flex justify-center items-center h-64 flex-col">
          <Loader className="w-12 h-12 text-amber-400 animate-spin mb-4" />
          <p className="text-lg text-amber-300">Đang tải danh sách</p>
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
                      onClick={() => requestSort("available")}
                    >
                      <div className="flex items-center">
                        Có Sẵn
                        {getSortIndicator("available")}
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
                        <input
                          type="checkbox"
                          checked={product.isAvaillable}
                          onChange={() => handleToggleAvailable(product.id)}
                          className="h-4 w-4 text-[#8B4513] border-gray-300 rounded focus:ring-[#8B4513]"
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
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
                      {editingProduct
                        ? "Chỉnh Sửa Sản Phẩm"
                        : "Thêm Sản Phẩm Mới"}
                    </h3>
                    <form className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tên Sản Phẩm
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]"
                          defaultValue={editingProduct?.name || ""}
                          onBlur={(e) => {
                            e.target.value = capitalizeWords(
                              e.target.value.trim()
                            );
                          }}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Mô Tả
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          rows="3"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]"
                          defaultValue={editingProduct?.description || ""}
                        ></textarea>
                      </div>

                      <div>
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Giá (VNĐ)
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          step="1000"
                          min="0"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513]"
                          defaultValue={editingProduct?.price || 0}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="categoryId"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Danh Mục
                        </label>
                        <select
                          id="categoryId"
                          name="categoryId"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513] rounded-md"
                          defaultValue={editingProduct?.category?.id || ""}
                        >
                          {categories.slice(1).map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Hình Ảnh Sản Phẩm
                        </label>
                        <div className="mt-1 flex flex-col space-y-4">
                          {/* Image Preview */}
                          <div className="h-40 w-40 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                            {editingProduct?.image || imagePreview ? (
                              <img
                                src={imagePreview || editingProduct?.image}
                                alt={editingProduct?.name || "Product preview"}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-gray-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-12 w-12"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}
                            {uploadingImage && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <Loader className="w-8 h-8 text-white animate-spin" />
                              </div>
                            )}
                          </div>

                          {/* Cloudinary Upload */}
                          <div>
                            <label
                              htmlFor="cloudinary-upload"
                              className={`
          cursor-pointer flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 rounded-md 
          ${
            uploadingImage
              ? "bg-gray-100 text-gray-400"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }
          transition-colors duration-200
        `}
                              disabled={uploadingImage}
                            >
                              <FaCloudUploadAlt className="text-[#8B4513] text-xl" />
                              <span>
                                {uploadingImage
                                  ? "Đang tải lên..."
                                  : "Tải lên từ máy tính"}
                              </span>
                            </label>
                            <input
                              id="cloudinary-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="sr-only" // Hidden input
                              disabled={uploadingImage}
                            />
                            <p className="mt-1 text-xs text-gray-500">
                              Hỗ trợ: JPG, PNG, GIF (tối đa 5MB)
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#8B4513] text-base font-medium text-white hover:bg-[#6B3105] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513] sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        handleSaveProduct();
                      }}
                    >
                      {editingProduct ? "Lưu Thay Đổi" : "Thêm Sản Phẩm"}
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setShowAddModal(false);
                        setEditingProduct(null);
                        setImageUrl("");
                        setImagePreview("");
                        setCloudinaryPublicId("");
                      }}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

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
