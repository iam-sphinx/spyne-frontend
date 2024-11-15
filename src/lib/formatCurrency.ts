export const formatCurrency = (
  amount: number,
  currency: string,
  locale = "en-US"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};
