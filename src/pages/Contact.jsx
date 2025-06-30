"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Coffee,
  Facebook,
  Instagram,
  MessageCircle,
  ChevronRight,
  Car,
  Bus,
  Navigation,
  Star,
  CheckCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Địa Chỉ Quán",
      details: ["123 Nguyễn Huệ, Quận 1", "TP. Hồ Chí Minh, Việt Nam"],
      color: "from-red-500 to-red-600",
    },
    {
      icon: Phone,
      title: "Điện Thoại",
      details: ["(028) 3822 1234", "0901 234 567"],
      color: "from-green-500 to-green-600",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@caphevietnm.com", "order@caphevietnm.com"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Clock,
      title: "Giờ Mở Cửa",
      details: ["Thứ 2-6: 7:00 - 19:00", "Thứ 7-CN: 8:00 - 20:00"],
      color: "from-amber-500 to-amber-600",
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      handle: "@caphevietnm",
      url: "#",
      color: "hover:bg-blue-50 hover:text-blue-600",
    },
    {
      icon: Instagram,
      name: "Instagram",
      handle: "@caphevietnm",
      url: "#",
      color: "hover:bg-pink-50 hover:text-pink-600",
    },
    {
      icon: MessageCircle,
      name: "Zalo",
      handle: "0901 234 567",
      url: "#",
      color: "hover:bg-blue-50 hover:text-blue-500",
    },
  ];

  const directions = [
    {
      icon: Car,
      title: "Đi Xe Máy/Ô Tô",
      description:
        "Từ Bến Thành Market, đi thẳng đường Nguyễn Huệ 200m. Có chỗ đậu xe miễn phí.",
    },
    {
      icon: Bus,
      title: "Đi Xe Bus",
      description:
        "Tuyến 03, 19, 36 dừng tại trạm Nguyễn Huệ. Đi bộ 2 phút đến quán.",
    },
    {
      icon: Navigation,
      title: "Grab/Taxi",
      description:
        "Tìm kiếm 'Cà Phê Việt - 123 Nguyễn Huệ' trên ứng dụng Grab hoặc báo tài xế.",
    },
  ];

  const faqs = [
    {
      question: "Quán có phục vụ giao hàng không?",
      answer:
        "Hiện tại chúng tôi chỉ phục vụ tại quán và đặt trước lấy hàng. Chúng tôi đang phát triển dịch vụ giao hàng trong tương lai gần.",
    },
    {
      question: "Có thể đặt bàn trước không?",
      answer:
        "Có, bạn có thể gọi điện hoặc nhắn tin để đặt bàn trước, đặc biệt vào cuối tuần và giờ cao điểm.",
    },
    {
      question: "Quán có WiFi miễn phí không?",
      answer:
        "Có, chúng tôi cung cấp WiFi miễn phí cho khách hàng. Mật khẩu được ghi trên menu hoặc hỏi nhân viên.",
    },
    {
      question: "Có chỗ đậu xe không?",
      answer:
        "Có, chúng tôi có khu vực đậu xe máy và ô tô miễn phí cho khách hàng ngay trước quán.",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên";
    }
    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Vui lòng nhập chủ đề";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Vui lòng nhập nội dung tin nhắn";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 2000);
  };

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
            <span className="text-amber-700 font-medium">Liên Hệ</span>
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
                Kết Nối Với Chúng Tôi
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Liên Hệ{" "}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                Cà Phê Việt
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-amber-100 mb-8 leading-relaxed">
              Chúng tôi luôn sẵn sàng lắng nghe và phục vụ bạn. Hãy liên hệ để
              được tư vấn hoặc đặt bàn!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {info.title}
                  </h3>
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Send className="w-4 h-4" />
                  Gửi Tin Nhắn
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Liên Hệ Với Chúng Tôi
                </h2>
                <p className="text-xl text-gray-600">
                  Có câu hỏi hoặc góp ý? Chúng tôi rất mong được nghe từ bạn!
                </p>
              </div>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    Cảm ơn bạn đã liên hệ!
                  </h3>
                  <p className="text-green-700">
                    Chúng tôi đã nhận được tin nhắn và sẽ phản hồi trong vòng 24
                    giờ.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-green-600 hover:text-green-800 font-medium"
                  >
                    Gửi tin nhắn khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Họ và Tên *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                          errors.name
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                        }`}
                        placeholder="Nhập họ và tên"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Số Điện Thoại *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                          errors.phone
                            ? "border-red-300 focus:border-red-500 bg-red-50"
                            : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                        }`}
                        placeholder="Nhập số điện thoại"
                      />
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                        errors.email
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                      }`}
                      placeholder="Nhập địa chỉ email"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Chủ Đề *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none ${
                        errors.subject
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                      }`}
                      placeholder="Nhập chủ đề tin nhắn"
                    />
                    {errors.subject && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nội Dung *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none resize-none ${
                        errors.message
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-amber-500 focus:bg-amber-50/50"
                      }`}
                      placeholder="Nhập nội dung tin nhắn của bạn..."
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Gửi Tin Nhắn
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map & Directions */}
            <div>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <MapPin className="w-4 h-4" />
                  Vị Trí Quán
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Tìm Đường Đến Quán
                </h2>
                <p className="text-xl text-gray-600">
                  Chúng tôi nằm ngay trung tâm thành phố, dễ dàng di chuyển
                </p>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl h-80 flex items-center justify-center mb-8 border border-amber-200">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-amber-700 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-amber-800 mb-2">
                    Bản Đồ Quán Cà Phê
                  </h3>
                  <p className="text-amber-700">
                    123 Nguyễn Huệ, Quận 1, TP.HCM
                  </p>
                </div>
              </div>

              {/* Directions */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Hướng Dẫn Đi Lại
                </h3>
                {directions.map((direction, index) => {
                  const Icon = direction.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100"
                    >
                      <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-amber-700" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {direction.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {direction.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Theo Dõi Chúng Tôi
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Kết Nối Trên Mạng Xã Hội
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cập nhật những món mới, ưu đãi đặc biệt và câu chuyện thú vị về cà
              phê
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  className={`flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 transform hover:-translate-y-2 ${social.color}`}
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{social.name}</h3>
                    <p className="text-gray-600 text-sm">{social.handle}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MessageCircle className="w-4 h-4" />
              Câu Hỏi Thường Gặp
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Những Câu Hỏi Phổ Biến
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tìm câu trả lời nhanh chóng cho những thắc mắc của bạn
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
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
              Ghé Thăm Chúng Tôi
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Chúng Tôi Chờ Đón Bạn!
            </h2>
            <p className="text-xl text-amber-100 mb-10 leading-relaxed">
              Hãy đến và trải nghiệm không gian ấm cúng cùng hương vị cà phê
              Việt Nam chính hiệu. Chúng tôi luôn sẵn sàng phục vụ bạn với tất
              cả tình yêu và tâm huyết.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/menu"
                className="group bg-white text-amber-800 font-bold py-4 px-8 rounded-full hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Xem Thực Đơn
                <Coffee className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Link>
              <a
                href="tel:02838221234"
                className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-amber-800 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Gọi Ngay
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
