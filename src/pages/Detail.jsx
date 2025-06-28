"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Heart,
  Plus,
  Minus,
  ShoppingCart,
  Coffee,
  ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSilce";
import { toast } from "sonner";
import ProductService from "../services/product.service";
import sizeService from "../services/size.service";
import cartService from "../services/cart.service";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchSizes();
    }
  }, [id]);

  // Update selectedSize object when selectedSizeId changes
  useEffect(() => {
    if (selectedSizeId) {
      const size = sizes.find((s) => s.id === selectedSizeId);
      setSelectedSize(size);
    }
  }, [selectedSizeId, sizes]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getProductById(id);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Không thể tải thông tin sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const fetchSizes = async () => {
    try {
      const response = await sizeService.getSizes();
      setSizes(response.data);
      if (response.data.length > 0) {
        setSelectedSizeId(response.data[0].id);
        setSelectedSize(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching sizes:", error);
      setSizes([]);
      toast.error("Không thể tải thông tin kích cỡ");
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!product) return 0;
    const sizePrice = selectedSize?.extraPrice || 0;
    return (product.price + sizePrice) * quantity;
  };

  // Handle quantity changes
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!product || !selectedSize) {
      toast.error("Vui lòng chọn đầy đủ thông tin sản phẩm");
      return;
    }
    console.log("Assa");
    setAddingToCart(true);

    try {
      const customize = {
        note: notes,
        sizeId: selectedSizeId,
        productId: product.id,
        quantity: quantity,
        customizeToppings: [],
      };

      if (isAuthenticated) {
        console.log("Adding to cart with customization:", customize);

        const response = await cartService.addToCart(customize);
        console.log("Add to cart response:", response.data.cartItems);
        if (response && response.data) {
          dispatch(addToCart(response.data.cartItems));
        }
      }

      toast.success(`Đã thêm ${quantity} ${product.name} vào giỏ hàng`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Không thể thêm vào giỏ hàng. Vui lòng thử lại sau.");
    } finally {
      setAddingToCart(false);
    }
  };

  // Toggle favorite status
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);

    if (!isFavorite) {
      toast.success(`Đã thêm ${product.name} vào danh sách yêu thích`);
    } else {
      toast.success(`Đã xóa ${product.name} khỏi danh sách yêu thích`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-amber-50 to-white">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-200 border-t-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm py-4 border-b border-amber-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-amber-700 transition-colors">
              Trang Chủ
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link to="/menu" className="hover:text-amber-700 transition-colors">
              Thực Đơn
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-amber-700 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden group">
              <div className="aspect-square relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={toggleFavorite}
                  className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isFavorite
                      ? "bg-red-500 text-white"
                      : "bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                  <Coffee className="w-4 h-4" />
                  {product.category === "coffee" ? "Cà Phê" : "Đồ Uống"}
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">{product.nameEn}</p>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5]?.map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          product.rating >= star
                            ? "fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {product.rating} ({product.reviews} đánh giá)
                  </span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection - Make Smaller */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Chọn Kích Cỡ
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {sizes?.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => {
                      setSelectedSizeId(size.id);
                    }}
                    className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 transition-all duration-300 min-w-[100px] ${
                      selectedSizeId === size.id
                        ? "border-amber-500 bg-amber-50 text-amber-800"
                        : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50"
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-semibold text-sm">{size.name}</div>
                      <div className="text-xs text-gray-600">
                        {size.value} ml
                      </div>
                      {size.extraPrice > 0 && (
                        <div className="text-xs font-medium text-amber-700">
                          +{size.extraPrice.toLocaleString("vi-VN")}₫
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Ghi Chú Đặc Biệt
              </h3>
              <div className="bg-white rounded-2xl border-2 border-gray-200 focus-within:border-amber-500 transition-colors">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Thêm ghi chú cho đơn hàng của bạn (ví dụ: ít đường, nhiều đá, không sữa...)"
                  className="w-full p-4 rounded-2xl resize-none focus:outline-none"
                  rows={3}
                  maxLength={200}
                />
                <div className="px-4 pb-2 text-xs text-gray-500 text-right">
                  {notes.length}/200 ký tự
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-3xl font-bold text-amber-700">
                    {calculateTotalPrice().toLocaleString("vi-VN")}₫
                  </div>
                  <div className="text-sm text-gray-600">Tổng cộng</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-2xl">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="p-3 hover:bg-gray-100 rounded-l-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="px-6 py-3 font-semibold min-w-[60px] text-center">
                      {quantity}
                    </div>
                    <button
                      onClick={incrementQuantity}
                      className="p-3 hover:bg-gray-100 rounded-r-2xl transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {addingToCart ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Thêm Vào Giỏ Hàng
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
