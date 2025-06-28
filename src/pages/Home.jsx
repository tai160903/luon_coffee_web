import { Link } from "react-router-dom";
import {
  Coffee,
  Leaf,
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

function Home() {
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
              VIỆT COFFEE
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Ghé thăm quán cà phê ấm cúng của chúng tôi để thưởng thức cà phê
              Việt Nam chính hiệu hoặc đặt trước để lấy theo giờ thuận tiện.
              Trải nghiệm hương vị đậm đà và truyền thống được pha chế tươi mỗi
              ngày.
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
            {featuredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src="/placeholder.svg?height=400&width=300"
                    alt={product.name}
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <button className="w-full bg-white text-amber-800 font-bold py-3 px-6 rounded-full hover:bg-amber-50 transition-colors duration-200">
                      Thêm Vào Giỏ
                    </button>
                  </div>
                  {product.sale && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      GIẢM GIÁ
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex justify-center items-center gap-2">
                    <span className="text-2xl font-bold text-amber-700">
                      {product.price.toLocaleString("vi-VN")}₫
                    </span>
                    {product.sale && (
                      <span className="text-sm text-gray-500 line-through">
                        {(product.price * 1.2).toLocaleString("vi-VN")}₫
                      </span>
                    )}
                  </div>
                </div>
              </div>
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
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Leaf className="w-4 h-4" />
                Di Sản Của Chúng Tôi
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Bắt Nguồn Từ Truyền Thống Việt Nam
              </h2>
              <p className="text-xl text-amber-100 mb-6 leading-relaxed">
                Từ năm 1975, gia đình chúng tôi đã trồng cà phê tại Tây Nguyên
                Việt Nam, nơi có khí hậu độc đáo và đất núi lửa màu mỡ tạo điều
                kiện hoàn hảo để trồng những hạt cà phê mạnh mẽ, đậm đà hương
                vị.
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

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Tình Yêu Khách Hàng
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Những Người Yêu Cà Phê Nói Gì
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tham gia cùng hàng nghìn khách hàng hài lòng đã khám phá hương vị
              chính hiệu của cà phê Việt Nam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-8 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center mr-4">
                    <span className="text-amber-800 font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Coffee className="w-4 h-4" />
              Kết Nối Với Chúng Tôi
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Tham Gia Cộng Đồng Cà Phê
            </h2>
            <p className="text-xl text-amber-100 mb-10 leading-relaxed">
              Đăng ký để nhận cập nhật về quán, thức uống mới và ưu đãi đặc
              biệt. Giảm 10% cho lần ghé thăm tiếp theo!
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6">
              <input
                type="email"
                placeholder="Nhập địa chỉ email của bạn"
                className="flex-grow px-6 py-4 rounded-full border-0 focus:outline-none focus:ring-4 focus:ring-white/20 text-gray-800 placeholder-gray-500"
                required
              />
              <button
                type="submit"
                className="bg-white text-amber-800 font-bold py-4 px-8 rounded-full hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
              >
                Giảm 10%
              </button>
            </form>
            <p className="text-amber-200 text-sm">
              Bằng cách đăng ký, bạn đồng ý với Chính sách Bảo mật của chúng
              tôi. Chúng tôi tôn trọng quyền riêng tư và sẽ không bao giờ chia
              sẻ thông tin của bạn.
            </p>
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
    title: "Không Gian Ấm Cúng",
    description:
      "Ghé thăm không gian thân thiện để thưởng thức cà phê trong bầu không khí quán cà phê Việt Nam truyền thống.",
  },
  {
    icon: Heart,
    title: "Pha Chế Tâm Huyết",
    description:
      "Mỗi thức uống được pha chế cẩn thận bởi các barista giàu kinh nghiệm sử dụng kỹ thuật Việt Nam chính hiệu.",
  },
];

// Sample data for featured products
const featuredProducts = [
  {
    id: 1,
    name: "Cà Phê Đá Việt Nam",
    price: 25000,
    sale: false,
  },
  {
    id: 2,
    name: "Cà Phê Phin Truyền Thống",
    price: 20000,
    sale: false,
  },
  {
    id: 3,
    name: "Cà Phê Dừa",
    price: 30000,
    sale: true,
  },
  {
    id: 4,
    name: "Cà Phê Trứng Việt Nam",
    price: 35000,
    sale: false,
  },
];

// Sample testimonials
const testimonials = [
  {
    name: "Nguyễn Thị Hoa",
    location: "Hà Nội, Việt Nam",
    quote:
      "Cà phê Tây Nguyên đã trở thành nghi lễ buổi sáng của tôi. Hương vị cực kỳ đậm đà và chính hiệu. Nó nhắc tôi nhớ về chuyến du lịch Việt Nam và mang lại những kỷ niệm tuyệt vời mỗi ngày!",
  },
  {
    name: "Trần Văn Minh",
    location: "TP. Hồ Chí Minh, Việt Nam",
    quote:
      "Là người đã sống ở Việt Nam nhiều năm, cà phê này mang lại rất nhiều kỷ niệm. Phương pháp pha truyền thống tạo nên sự khác biệt hoàn toàn. Giống như có một mảnh Việt Nam tại nhà.",
  },
  {
    name: "Lê Thị Mai",
    location: "Đà Nẵng, Việt Nam",
    quote:
      "Bộ sưu tập cà phê Việt Nam là sự giới thiệu hoàn hảo về văn hóa cà phê Việt Nam. Giờ tôi hoàn toàn bị cuốn hút và đã đặt hàng nhiều lần. Chất lượng luôn tuyệt vời!",
  },
];

export default Home;
