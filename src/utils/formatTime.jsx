const formatTime = (timeString) => {
  if (!timeString) return "";
  return new Date(timeString).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default formatTime;
