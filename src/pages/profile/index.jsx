"use client";

import { useEffect, useState } from "react";
import {
  Edit3,
  Save,
  X,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react";
import userService from "../../services/user.service";

export default function ProfileInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [editInfo, setEditInfo] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await userService.getProfile();
      if (res && res.data && res.data.data) {
        const data = res.data.data;
        setUserInfo({
          fullName: data.fullName || "N/A",
          email: data.email || "N/A",
          phone: data.phoneNumber || "N/A",
          dateOfBirth: data.birthDate ? data.birthDate.slice(0, 10) : "N/A",
          address: data.address || "N/A",
          gender:
            data.gender === 0 ? "male" : data.gender === 1 ? "female" : "N/A",
        });
        setEditInfo({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phoneNumber || "",
          dateOfBirth: data.birthDate ? data.birthDate.slice(0, 10) : "",
          address: data.address || "",
          gender:
            data.gender === 0 ? "male" : data.gender === 1 ? "female" : "other",
        });
      } else {
        // Nếu không có dữ liệu, set mặc định
        setUserInfo({
          fullName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          address: "",
          gender: "other",
        });
        setEditInfo({
          fullName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          address: "",
          gender: "other",
        });
      }
    };
    fetchProfile();
  }, []);

  const handleSave = () => {
    setUserInfo({ ...editInfo });
    setIsEditing(false);
    // Here you would typically save to backend
    alert("Thông tin đã được cập nhật thành công!");
  };

  const handleCancel = () => {
    setEditInfo({ ...userInfo });
    setIsEditing(false);
  };

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <span className="text-gray-500">Đang tải thông tin...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Thông Tin Cá Nhân</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-2xl hover:bg-amber-700 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            Chỉnh Sửa
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Lưu
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-2xl hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
              Hủy
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <User className="w-4 h-4" />
            Họ và Tên
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editInfo.fullName}
              onChange={(e) =>
                setEditInfo({ ...editInfo, fullName: e.target.value })
              }
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
            />
          ) : (
            <div className="px-4 py-3 bg-gray-50 rounded-2xl">
              {userInfo.fullName}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </label>
          {isEditing ? (
            <input
              type="email"
              value={editInfo.email}
              onChange={(e) =>
                setEditInfo({ ...editInfo, email: e.target.value })
              }
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
            />
          ) : (
            <div className="px-4 py-3 bg-gray-50 rounded-2xl">
              {userInfo.email}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Số Điện Thoại
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={editInfo.phone}
              onChange={(e) =>
                setEditInfo({ ...editInfo, phone: e.target.value })
              }
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
            />
          ) : (
            <div className="px-4 py-3 bg-gray-50 rounded-2xl">
              {userInfo.phone}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Ngày Sinh
          </label>
          {isEditing ? (
            <input
              type="date"
              value={editInfo.dateOfBirth}
              onChange={(e) =>
                setEditInfo({ ...editInfo, dateOfBirth: e.target.value })
              }
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
            />
          ) : (
            <div className="px-4 py-3 bg-gray-50 rounded-2xl">
              {new Date(userInfo.dateOfBirth).toLocaleDateString("vi-VN")}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Giới Tính
          </label>
          {isEditing ? (
            <select
              value={editInfo.gender}
              onChange={(e) =>
                setEditInfo({ ...editInfo, gender: e.target.value })
              }
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          ) : (
            <div className="px-4 py-3 bg-gray-50 rounded-2xl">
              {userInfo.gender === "male"
                ? "Nam"
                : userInfo.gender === "female"
                ? "Nữ"
                : "N/A"}
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Địa Chỉ
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editInfo.address}
              onChange={(e) =>
                setEditInfo({ ...editInfo, address: e.target.value })
              }
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
            />
          ) : (
            <div className="px-4 py-3 bg-gray-50 rounded-2xl">
              {userInfo.address}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
