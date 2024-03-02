export const searchPlayerPosition = (position: any) => {
  if (position === "SP" || position === "BN" || position === "CLOSER") {
    return "pitcher";
  } else {
    return "batter";
  }
};
