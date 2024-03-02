export const handleFormValues = (initalValue: any, key: any, value: any) => {
  const initial = { ...initalValue };
  initial[key] = value;
  return initial;
};
