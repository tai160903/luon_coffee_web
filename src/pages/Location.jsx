import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin, Phone, Clock, Coffee, Navigation } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Location = () => {
  // Single shop location
  const location = {
    id: 1,
    name: "Lượn Cà Phê - Khổng Tử",
    address: "22 Khổng Tử, Bình Thọ, Thủ Đức, Hồ Chí Minh, Việt Nam",
    phone: "0927 363 868",
    hours: "7:00 - 12:00 | 17:00 - 22:00",
    position: [10.8450912, 106.7668635],
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50 min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Vị Trí Cửa Hàng
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ghé thăm Lượn Cà Phê để trải nghiệm không gian thoải mái và thưởng
            thức cà phê đậm đà theo phong cách Việt Nam.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <Coffee className="mr-2 text-amber-600 h-5 w-5" />
                {location.name}
              </h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{location.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                  <span>{location.phone}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                  <span>{location.hours}</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href={`https://www.google.com/maps/place/L%C6%B0%E1%BB%A3n+Cafe/@10.8450912,106.7668635,21z/data=!4m6!3m5!1s0x317527b6ba09cb81:0xf9316bab9f2cadc4!8m2!3d10.8450492!4d106.7668223!16s%2Fg%2F11xks4bzzs?entry=ttu&g_ep=EgoyMDI1MDYyOS4wIKXMDSoASAFQAw%3D%3D`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-xl transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Chỉ Đường
                </a>
                <a
                  href={`tel:${location.phone.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Gọi Ngay
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-[400px] z-0">
            <MapContainer
              center={location.position}
              zoom={16}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={false}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={location.position}>
                <Popup>
                  <div className="p-2 max-w-xs">
                    <h3 className="text-base font-bold text-gray-800 mb-1">
                      {location.name}
                    </h3>
                    <p className="text-sm text-gray-600">{location.address}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {location.phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      Giờ mở cửa: {location.hours}
                    </p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Phương Tiện Di Chuyển
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Đi Bằng Xe Máy/Ô Tô
              </h3>
              <p className="text-gray-600">
                Từ trung tâm Thủ Đức, đi theo đường Võ Văn Ngân, rẽ vào đường
                Khổng Tử. Quán nằm ở số 22, có bảng hiệu &quot;Lượn Cà Phê&quot;
                phía trước. Có chỗ đỗ xe rộng rãi phía trước quán.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Đi Bằng Xe Buýt
              </h3>
              <p className="text-gray-600">
                Các tuyến xe buýt 8, 19 và 53 đi qua khu vực này. Xuống tại trạm
                gần ngã tư Võ Văn Ngân, đi bộ khoảng 5 phút để đến quán.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Liên Hệ Với Chúng Tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-2">
                Đặt Bàn & Phục Vụ
              </h3>
              <p className="text-amber-600 font-bold">{location.phone}</p>
              <p className="text-sm text-gray-600">(Trong giờ mở cửa)</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-2">
                Email Liên Hệ
              </h3>
              <p className="text-amber-600 font-bold">info@luoncaphe.com</p>
              <p className="text-sm text-gray-600">(Hỗ trợ 24/7)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
