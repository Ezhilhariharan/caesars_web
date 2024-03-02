export default function dateDifferenceInDays(date1: Date, date2: Date) {
  const timeDifference = date2.getTime() - date1.getTime();
  const daysDifference = Math.abs(
    Math.floor(timeDifference / (1000 * 3600 * 24))
  );
  if (daysDifference === 0) {
    const daysDifferenceInHours = Math.abs(
      Math.floor(timeDifference / (1000 * 3600 * 24))
    );
    return daysDifferenceInHours;
  } else {
    const daysDifferenceInDays = Math.abs(
      Math.floor(timeDifference / (1000 * 3600 * 24))
    );
    return daysDifferenceInDays;
  }
}
