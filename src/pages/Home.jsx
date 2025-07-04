import { Link } from "react-router-dom";
import {
  Coffee,
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
  MapPin,
  Heart,
} from "lucide-react";
import { CafeExperienceSection } from "../components/cafe-experience";
// images
import heroImage from "../assets/images/hero-coffee.jpg";
import aboutImage from "../assets/images/about-coffee.jpg";
import { useEffect, useState } from "react";
import ProductService from "../services/product.service";
import formatCurrency from "../utils/formatCurrency";

function Home() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await ProductService.getBestSellers();
        setBestSellers(response.data);
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      }
    };
    fetchBestSellers();
  }, []);

  return (
    <div className="font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/90 via-amber-800/80 to-amber-900/90 z-10"></div>
          <img
            src={heroImage || "/placeholder.svg"}
            alt="Cà Phê Việt Nam"
            className="w-full h-full object-fill"
          />
        </div>

        <div className="container mx-auto px-6 relative z-30 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Coffee className="w-4 h-4 text-amber-300" />
              <span className="text-white/90 text-sm font-medium">
                Cà Phê Việt Nam Chính Hiệu
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              LƯỢN CAFE
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Ghé thăm quán cà phê thoáng mát, nơi bạn có thể thưởng thức những
              tách cà phê Việt Nam chính hiệu được pha chế thủ công từ hạt cà
              phê tươi ngon nhất. Từ cà phê phin truyền thống đến tôi, cà phê
              Việt Nam cơ bản, cà phê Việt Nam truyền thống, cà phê Việt Nam pha
              truyền thống.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link
                to="/menu"
                className="group bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2"
              >
                Xem Thực Đơn Đồ Uống
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-amber-800 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Đăng Ký Để Đặt Trước
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex justify-center items-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-amber-400" />
                <span className="text-sm">Pha Tươi Mỗi Ngày</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-amber-400" />
                <span className="text-sm">Đặt Trước Tiện Lợi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Tại Sao Chọn Cà Phê Của Chúng Tôi?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mỗi tách cà phê kể một câu chuyện về truyền thống, chất lượng và
              đam mê
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="text-amber-700 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CafeExperienceSection />

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Đồ Uống Phổ Biến
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Thức Uống Đặc Trưng
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Các loại cà phê Việt Nam được pha chế thủ công tươi mỗi ngày tại
              quán
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers?.map((product) => (
              <Link to={`/details/${product.id}`} key={product.id}>
                <div key={product.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={
                        product.image || "/placeholder.svg?height=300&width=300"
                      }
                      alt={product.name}
                      className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex justify-center items-center gap-2">
                      <span className="text-2xl font-bold text-amber-700">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Xem Thực Đơn Đầy Đủ
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-amber-600 rounded-2xl blur opacity-20"></div>
                <img
                  src={aboutImage || "/placeholder.svg?height=500&width=400"}
                  alt="Vườn Cà Phê Việt Nam"
                  className="relative rounded-2xl shadow-2xl"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-white mb-6">
                Bắt Nguồn Từ Truyền Thống Việt Nam
              </h2>
              <p className="text-xl text-amber-100 mb-6 leading-relaxed">
                Những hạt cà phê Việt Nam được trồng tại Tây N guyên Việt Nam,
                nơi có khí hậu độc đáo và đất núi lửa màu mỡ tạo điều kiện hoàn
                hảo để trồng những hạt cà phê mạnh mẽ, đậm đà hương vị.
              </p>
              <p className="text-lg text-amber-200 mb-8 leading-relaxed">
                Chúng tôi tôn vinh phương pháp pha cà phê truyền thống Việt Nam
                đồng thời áp dụng kỹ thuật hiện đại để mang đến cho bạn trải
                nghiệm chân thực với mỗi tách cà phê. Cam kết chất lượng của
                chúng tôi kéo dài từ trang trại đến tách cà phê, đảm bảo bạn cảm
                nhận được tinh túy thực sự của Việt Nam.
              </p>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 bg-white text-amber-800 font-bold py-4 px-8 rounded-full hover:bg-amber-50 transition-all duration-300 transform hover:scale-105"
              >
                Khám Phá Câu Chuyện
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Enhanced features data
const features = [
  {
    icon: Coffee,
    title: "Pha Tươi Mỗi Ngày",
    description:
      "Mỗi tách cà phê được pha theo yêu cầu bằng hạt cà phê Việt Nam cao cấp, đảm bảo độ tươi và hương vị tối đa.",
  },
  {
    icon: Clock,
    title: "Đặt Trước Tiện Lợi",
    description:
      "Đặt hàng trước và chọn thời gian lấy hàng. Bỏ qua thời gian chờ đợi và lấy cà phê khi thuận tiện.",
  },
  {
    icon: MapPin,
    title: "Không Gian Thoáng Mát",
    description:
      "Ghé thăm không gian thoáng mát, sử dụng cà phê Việt Nam tại nhà. Giải pháp sử dụng cà phê Việt Nam tại nhà hóa sử dụng cà phê Việt Nam tại nhà.",
  },
  {
    icon: Heart,
    title: "Pha Chế Tâm Huyết",
    description:
      "Mỗi thức uống được pha chế cẩn thận bởi các barista giàu kinh nghiệm sử dụng kỹ thuật Việt Nam chính hiệu.",
  },
];

export default Home;
