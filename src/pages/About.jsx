"use client";

import { Link } from "react-router-dom";
import {
  Coffee,
  Leaf,
  Heart,
  Award,
  Users,
  MapPin,
  Calendar,
  ChevronRight,
  Mountain,
  Sunrise,
  Droplets,
  Flame,
} from "lucide-react";

const About = () => {
  const milestones = [
    {
      year: "1975",
      title: "Khởi Nguồn",
      description:
        "Gia đình chúng tôi bắt đầu trồng cà phê tại Tây Nguyên với diện tích nhỏ 2 hecta.",
      icon: Sunrise,
    },
    {
      year: "1985",
      title: "Mở Rộng Trang Trại",
      description:
        "Mở rộng quy mô lên 20 hecta và áp dụng kỹ thuật canh tác bền vững.",
      icon: Mountain,
    },
    {
      year: "1995",
      title: "Quán Cà Phê Đầu Tiên",
      description:
        "Mở quán cà phê đầu tiên tại Sài Gòn, mang hương vị Tây Nguyên đến thành phố.",
      icon: Coffee,
    },
    {
      year: "2010",
      title: "Chứng Nhận Organic",
      description:
        "Đạt chứng nhận cà phê hữu cơ quốc tế, cam kết chất lượng và môi trường.",
      icon: Leaf,
    },
    {
      year: "2024",
      title: "Thế Hệ Mới",
      description:
        "Thế hệ thứ 3 tiếp tục di sản gia đình với công nghệ hiện đại và truyền thống.",
      icon: Heart,
    },
  ];

  const values = [
    {
      icon: Coffee,
      title: "Chất Lượng Tuyệt Hảo",
      description:
        "Từ hạt cà phê được chọn lọc kỹ càng đến từng tách cà phê được pha chế tỉ mỉ.",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: Leaf,
      title: "Bền Vững Môi Trường",
      description:
        "Canh tác hữu cơ, bảo vệ đất đai và hỗ trợ cộng đồng nông dân địa phương.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Heart,
      title: "Truyền Thống Gia Đình",
      description:
        "Giữ gìn và truyền tải tinh hoa văn hóa cà phê Việt Nam qua các thế hệ.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Users,
      title: "Cộng Đồng Yêu Cà Phê",
      description:
        "Tạo không gian gắn kết, nơi mọi người cùng thưởng thức và chia sẻ đam mê cà phê.",
      color: "from-blue-500 to-blue-600",
    },
  ];

  const coffeeProcess = [
    {
      step: "01",
      title: "Trồng Trọt",
      description:
        "Hạt giống được chọn lọc, trồng tại độ cao 800-1200m với khí hậu lý tưởng.",
      icon: Mountain,
    },
    {
      step: "02",
      title: "Thu Hoạch",
      description:
        "Thu hái thủ công khi quả cà phê chín đỏ, đảm bảo chất lượng tối ưu.",
      icon: Sunrise,
    },
    {
      step: "03",
      title: "Chế Biến",
      description:
        "Sử dụng phương pháp ướt truyền thống, tạo hương vị đặc trưng.",
      icon: Droplets,
    },
    {
      step: "04",
      title: "Rang Xay",
      description:
        "Rang theo công thức gia truyền, giữ nguyên tinh túy hương vị.",
      icon: Flame,
    },
  ];

  const teamMembers = [
    {
      name: "Ông Nguyễn Văn Minh",
      role: "Người Sáng Lập",
      description: "50 năm kinh nghiệm trồng và chế biến cà phê Tây Nguyên",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Bà Trần Thị Hoa",
      role: "Chuyên Gia Pha Chế",
      description:
        "Nghệ nhân pha chế với 30 năm kinh nghiệm, giữ gìn công thức truyền thống",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Anh Nguyễn Minh Tuấn",
      role: "Quản Lý Chất Lượng",
      description: "Thế hệ thứ 3, kết hợp truyền thống với công nghệ hiện đại",
      image: "/placeholder.svg?height=300&width=300",
    },
  ];

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
            <span className="text-amber-700 font-medium">Về Chúng Tôi</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Coffee className="w-4 h-4 text-amber-300" />
              <span className="text-white/90 text-sm font-medium">
                Câu Chuyện Của Chúng Tôi
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              50 Năm{" "}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Đam Mê Cà Phê
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-amber-100 mb-8 leading-relaxed">
              Từ những vườn cà phê xanh mướt tại Tây Nguyên đến tách cà phê thơm
              ngon trong tay bạn - hành trình của chúng tôi là câu chuyện về
              tình yêu, truyền thống và chất lượng.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/menu"
                className="group bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Thưởng Thức Ngay
                <Coffee className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-amber-800 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Liên Hệ Chúng Tôi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                Di Sản Gia Đình
              </div>

              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Câu Chuyện Bắt Đầu Từ Tây Nguyên
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Năm 1975, ông Nguyễn Văn Minh - người sáng lập của chúng tôi,
                  bắt đầu hành trình với ước mơn mang hương vị cà phê Tây Nguyên
                  đến với mọi người. Từ một mảnh đất nhỏ 2 hecta, ông đã dành cả
                  cuộc đời để nghiên cứu và hoàn thiện kỹ thuật trồng cà phê.
                </p>

                <p>
                  Với đất đai màu mỡ của núi lửa và khí hậu nhiệt đới gió mùa,
                  Tây Nguyên tạo ra những hạt cà phê có hương vị đậm đà, đặc
                  trưng. Chúng tôi không chỉ trồng cà phê, mà còn giữ gìn và
                  phát triển những giá trị văn hóa truyền thống của vùng đất
                  này.
                </p>

                <p>
                  Ngày nay, thế hệ thứ 3 của gia đình tiếp tục sứ mệnh này với
                  tầm nhìn hiện đại nhưng vẫn giữ nguyên tinh thần và chất lượng
                  mà ông bà đã xây dựng. Mỗi tách cà phê chúng tôi phục vụ đều
                  chứa đựng tình yêu và tâm huyết của ba thế hệ.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700 mb-2">
                    50+
                  </div>
                  <div className="text-sm text-gray-600">Năm Kinh Nghiệm</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700 mb-2">
                    100+
                  </div>
                  <div className="text-sm text-gray-600">Hecta Cà Phê</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700 mb-2">
                    10K+
                  </div>
                  <div className="text-sm text-gray-600">
                    Khách Hàng Hài Lòng
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-amber-600 rounded-3xl blur opacity-20"></div>
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Vườn Cà Phê Tây Nguyên"
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Calendar className="w-4 h-4" />
              Hành Trình Phát Triển
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              50 Năm Một Chặng Đường
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Từ những ngày đầu khiêm tốn đến thương hiệu cà phê được yêu thích
              ngày nay
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <div
                  key={index}
                  className="relative flex items-center mb-12 last:mb-0"
                >
                  {/* Timeline line */}
                  {index !== milestones.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-amber-300 to-amber-500"></div>
                  )}

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="ml-8 flex-1">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-2xl font-bold text-amber-700">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-bold text-gray-800">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coffee Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Coffee className="w-4 h-4" />
              Quy Trình Sản Xuất
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Từ Hạt Giống Đến Tách Cà Phê
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mỗi bước trong quy trình được thực hiện tỉ mỉ để tạo ra hương vị
              hoàn hảo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coffeeProcess.map((process, index) => {
              const Icon = process.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-10 h-10 text-amber-700" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {process.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {process.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {process.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-200 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              Giá Trị Cốt Lõi
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Những Điều Chúng Tôi Tin Tưởng
            </h2>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              Các giá trị định hướng mọi hoạt động và quyết định của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-amber-100 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Đội Ngũ Của Chúng Tôi
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Những Người Tạo Nên Hương Vị
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Gặp gỡ những con người đam mê đứng sau mỗi tách cà phê hoàn hảo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-80 bg-gradient-to-br from-amber-100 to-amber-200 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {member.name}
                  </h3>
                  <div className="text-amber-700 font-medium mb-4">
                    {member.role}
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Coffee className="w-4 h-4" />
              Tham Gia Cùng Chúng Tôi
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Trải Nghiệm Hương Vị Chính Hiệu
            </h2>
            <p className="text-xl text-amber-100 mb-10 leading-relaxed">
              Đến với quán cà phê để cảm nhận câu chuyện 50 năm qua từng tách cà
              phê. Chúng tôi luôn chào đón bạn với sự ấm áp và chân thành.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/menu"
                className="group bg-white text-amber-800 font-bold py-4 px-8 rounded-full hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Xem Thực Đơn
                <Coffee className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-amber-800 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Liên Hệ Chúng Tôi
                <MapPin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
