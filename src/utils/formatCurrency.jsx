const formatCurrency = (amount, currency = "VND") => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export default formatCurrency;
