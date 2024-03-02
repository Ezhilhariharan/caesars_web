// convert to decimal odds
const convertValuesToDecimal = (value: any) => {
  if (value !== '-')
    if (Math.sign(value) === 1) return (value = (value / 100 + 1).toFixed(2));
    else return (value = ((100 / value - 1) * -1).toFixed(2));

  return value;
};

// convert to american odds
const convertValuesToAmerican = (value: any) => {
  if (value !== '-')
    if (value > 2) value = `+${Math.round((value - 1) * 100)}`;
    else value = Math.round(-100 / (value - 1));
  return value;
};

export const oddsConversion = (_d: any, oddsType: any) => {
  if (oddsType === 'Decimal Odds')
    return _d.map((d: any) => {
      if (d.exact !== 0 && d.over !== 0 && d.under !== 0) {
        d.under = convertValuesToDecimal(d.under);
        d.exact = convertValuesToDecimal(d.exact);
        d.over = convertValuesToDecimal(d.over);
        return d;
      }
    });

  if (oddsType === 'American Odds')
    return _d.map((d: any) => {
      if (d.exact !== 0 && d.over !== 0 && d.under !== 0) {
        d.under = convertValuesToAmerican(d.under);
        d.exact = convertValuesToAmerican(d.exact);
        d.over = convertValuesToAmerican(d.over);
        return d;
      }
    });

  return _d;
};
