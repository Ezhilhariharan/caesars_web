// margin calucation formula
const marginFormula = (margin: any, old_o: any) => {
  const probability = 1 / old_o;
  const convertMargin = margin / 100;
  const newMargin = probability * convertMargin;
  const length = +newMargin.toFixed(4);
  const newOdd = 1 / (probability + length);
  return newOdd.toFixed(2);
};

export const calculateOddsWithMargin = (margin: any, source: any) => {
  if (source.over !== '-' && source.over !== '')
    source.over = marginFormula(margin, parseFloat(source.over));
  else source.over;

  if (source.under !== '-' && source.under !== '')
    source.under = marginFormula(margin, parseFloat(source.under));
  else source.under;

  if (source.exact !== '-' && source.exact !== '')
    source.exact = marginFormula(margin, parseFloat(source.exact));
  else source.exact;

  return source;
};
