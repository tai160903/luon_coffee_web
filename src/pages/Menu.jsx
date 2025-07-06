"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Coffee, ArrowRight, Loader, Grid, List } from "lucide-react";
import ProductService from "../services/product.service";
import categoryService from "../services/category.service";
import formatCurrency from "../utils/formatCurrency";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const customer = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchCategoriesAndProducts(currentPage, activeCategory);
  }, [activeCategory, currentPage]);
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const fetchCategoriesAndProducts = async (
    page = 1,
    categoryId = activeCategory
  ) => {
    setIsLoading(true);
    try {
      const categoryRes = await categoryService.getAll();
      const allCategory = {
        id: "all",
        name: "Tất Cả",
        icon: Coffee,
        color: "from-amber-400 to-amber-600",
      };
      setCategories([
        allCategory,
        ...(categoryRes.data || []).map((cat) => ({
          ...cat,
          icon: Coffee,
          color: "from-amber-500 to-amber-600",
        })),
      ]);

      // Gọi API lấy sản phẩm theo trang và danh mục
      const params = { page };
      if (categoryId !== "all") params.categoryId = categoryId;
      const response = await ProductService.getProducts(params);
      setProducts(response.data.items || []);
      setCurrentPage(response.data.currentPage || 1);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setCategories([]);
      setProducts([]);
      setTotalPages(1);
    }
    setIsLoading(false);
  };

  // Lọc sản phẩm theo danh mục
  const filteredItems =
    activeCategory === "all"
      ? products
      : products.filter((item) => item.categoryId === activeCategory);

  const activecat = categories.find((cat) => cat.id === activeCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-50">
        <div className="flex flex-col items-center">
          <Loader className="w-12 h-12 text-amber-400 animate-spin mb-4" />
          <div className="text-lg text-amber-700 font-semibold">
            Đang tải thực đơn...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50 min-h-screen">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Coffee className="w-4 h-4 text-amber-300" />
            <span className="text-white/90 text-sm font-medium">
              Thực Đơn Đặc Biệt
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Thực Đơn{" "}
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              Cà Phê Việt
            </span>
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto leading-relaxed">
            Khám phá hương vị đậm đà của cà phê và ẩm thực Việt Nam truyền thống
          </p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-lg shadow-lg z-10 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto py-6 gap-4 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`group flex items-center gap-3 px-6 py-4 rounded-2xl whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : "bg-white text-gray-700 hover:bg-amber-50 border border-gray-200 hover:border-amber-200"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive
                        ? "text-white"
                        : "text-gray-600 group-hover:text-amber-600"
                    }`}
                  />
                  <span className="font-medium">{category.name}</span>
                  {isActive && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {activecat && (
              <>
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${activecat.color} rounded-2xl flex items-center justify-center`}
                >
                  <activecat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {activecat.name}
                  </h2>
                  <p className="text-gray-600">
                    {filteredItems.length} món có sẵn
                  </p>
                </div>
              </>
            )}
          </div>

          {/* View Toggle Switch */}
          <div className="flex items-center bg-white rounded-full p-1 shadow-md border border-gray-100">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow"
                  : "text-gray-700 hover:bg-amber-50"
              }`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                viewMode === "list"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow"
                  : "text-gray-700 hover:bg-amber-50"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems?.map((item) => (
              <Link
                to={`/details/${item.id}`}
                key={item.id}
                className="group block transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-amber-200 h-[380px] flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-amber-100 to-amber-200 overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg";
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-amber-700 transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-amber-700">
                          {formatCurrency(item.price)}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3 flex-grow truncate">
                      {item.description || "Không có mô tả"}
                    </p>

                    {customer && (
                      <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center gap-2 mt-auto">
                        Đặt Món
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="flex flex-col gap-4">
            {filteredItems?.map((item) => (
              <Link
                to={`/details/${item.id}`}
                key={item.id}
                className="group block"
              >
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-amber-200">
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="relative h-48 sm:h-auto sm:w-48 bg-gradient-to-br from-amber-100 to-amber-200 overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg";
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-amber-700 transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-2xl font-bold text-amber-700">
                          {formatCurrency(item.price)}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {item.description || "Không có mô tả"}
                      </p>

                      {customer && (
                        <div className="mt-auto text-right">
                          <button className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300 group-hover:scale-105">
                            Đặt Món
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"px-2"}
              pageCount={totalPages}
              forcePage={currentPage - 1}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={(selectedItem) =>
                setCurrentPage(selectedItem.selected + 1)
              }
              containerClassName={"inline-flex rounded-md shadow-sm"}
              pageClassName={
                "px-4 py-2 border-t border-b border-gray-200 bg-white text-gray-700 hover:bg-amber-50 transition"
              }
              pageLinkClassName={""}
              previousClassName={
                "px-4 py-2 rounded-l-md border border-gray-200 bg-white text-gray-700 hover:bg-amber-50 transition"
              }
              nextClassName={
                "px-4 py-2 rounded-r-md border border-gray-200 bg-white text-gray-700 hover:bg-amber-50 transition"
              }
              activeClassName={"bg-amber-500 text-white font-bold"}
              disabledClassName={"opacity-50 cursor-not-allowed"}
            />
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
              Hiện tại chưa có món nào trong danh mục này
            </p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 py-16 px-4 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Coffee className="w-4 h-4" />
            Ghé Thăm Chúng Tôi
          </div>

          <h2 className="text-4xl font-bold text-white mb-4">
            Trải Nghiệm Hương Vị Chính Hiệu
          </h2>
          <p className="text-xl text-amber-100 mb-8 leading-relaxed max-w-2xl mx-auto">
            Đến với quán cà phê để thưởng thức cà phê và ẩm thực Việt Nam trong
            không gian ấm cúng, thân thiện cùng gia đình và bạn bè.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/location"
              className="group inline-flex items-center gap-2 bg-white text-amber-800 font-bold py-4 px-8 rounded-full hover:bg-amber-50 transition-all duration-300 transform hover:scale-105"
            >
              Tìm Địa Chỉ Quán
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-amber-800 transition-all duration-300"
            >
              Liên Hệ Đặt Bàn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
