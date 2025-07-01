const formatDateTime = (timeString) => {
  if (!timeString) return "";
  const date = new Date(timeString);
  return (
    date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) +
    " " +
    date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
};
export default formatDateTime;
