/** @format */

export const getCurrentFullDate = () => {
  const currentDate: Date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate: string = currentDate.toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};
export const toStringAsFixed = (amount: number | string): string | null => {
  if (isNaN(Number(amount))) {
    return "0.00";
  }

  if (typeof amount === "number") {
    return amount.toFixed(2).toString();
  } else if (typeof amount === "string") {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount)) {
      return parsedAmount.toFixed(2).toString();
    }
  }

  return null;
};
export const toNumberAsFixed = (amount: number | string): number | null => {
  if (isNaN(Number(amount))) {
    return 0.0;
  }

  if (typeof amount === "number") {
    return parseFloat(amount.toFixed(2));
  } else if (typeof amount === "string") {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount)) {
      return Number(parsedAmount.toFixed(2));
    }
  }

  return null;
};
