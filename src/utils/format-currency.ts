const formatCurrency = (amount: number, currency: string = "USD"): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });

  return formatter.format(amount);
};

export default formatCurrency;
