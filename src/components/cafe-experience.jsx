import { Clock, MapPin, Coffee, Users } from "lucide-react";
import cafeExperienceImage from "../assets/images/cafe-experience.jpg";

export function CafeExperienceSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Ghé Thăm Chúng Tôi
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Trải Nghiệm Quán Cà Phê
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thưởng thức cà phê Việt Nam chính hiệu trong không gian ấm cúng hoặc
            đặt trước để lấy hàng tiện lợi
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={cafeExperienceImage}
              alt="Nội Thất Quán Cà Phê Việt Nam"
              className="rounded-2xl shadow-2xl"
            />
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Coffee className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Trải Nghiệm Tại Quán
                </h3>
                <p className="text-gray-600">
                  Thư giãn trong bầu không khí quán cà phê Việt Nam chính hiệu.
                  Thưởng thức cà phê cùng bánh ngọt và đồ ăn nhẹ truyền thống
                  Việt Nam.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Đặt Trước Lấy Hàng
                </h3>
                <p className="text-gray-600">
                  Đặt hàng online và chọn thời gian lấy hàng ưa thích. Cà phê
                  của bạn sẽ được pha tươi và sẵn sàng khi bạn đến.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Không Gian Cộng Đồng
                </h3>
                <p className="text-gray-600">
                  Gặp gỡ bạn bè, làm việc từ xa, hoặc đơn giản tận hưởng khoảnh
                  khắc yên tĩnh. Quán cà phê chào đón mọi người trải nghiệm văn
                  hóa cà phê Việt Nam.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                <h4 className="font-bold text-amber-800 mb-2">Giờ Mở Cửa</h4>
                <div className="text-amber-700 space-y-1">
                  <p>Thứ Hai - Thứ Sáu: 7:00 - 19:00</p>
                  <p>Thứ Bảy - Chủ Nhật: 8:00 - 20:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
