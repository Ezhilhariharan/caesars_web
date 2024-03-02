export const reverseMargin = (margin: number, old_o: any) => {
  const calculateMarginPercentage = margin / 100;
  const balanceMargin = 1 - calculateMarginPercentage;
  const newOddWithoutMargin = old_o / balanceMargin;

  return newOddWithoutMargin.toFixed(2);
};

export const oddsWithoutMargin = (d: any, margin: number) => {
  if (d.over !== '-' && d.over !== '')
    d.over = reverseMargin(margin, parseFloat(d.over));
  else d.over;

  if (d.under !== '-' && d.under !== '')
    d.under = reverseMargin(margin, parseFloat(d.under));
  else d.under;

  if (d.exact !== '-' && d.exact !== '')
    d.exact = reverseMargin(margin, parseFloat(d.exact));
  else d.exact;

  return d;
};
