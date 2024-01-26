import {
  isWithinInterval,
  parseISO,
  subDays,
  startOfDay,
  endOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,
} from "date-fns";

export function filterByDate(period, data, expenceData) {
  let interval;

  switch (period) {
    case "today":
      interval = {
        start: startOfDay(subDays(new Date(), 1)),
        end: endOfDay(new Date()),
      };
      break;
    case "week":
      interval = {
        start: startOfWeek(subDays(new Date(), 7)),
        end: endOfDay(new Date()),
      };
      break;
    case "month":
      interval = { start: startOfMonth(new Date()), end: endOfDay(new Date()) };
      break;
    case "year":
      interval = {
        start: startOfYear(subDays(new Date(), 365)),
        end: endOfDay(new Date()),
      };
      break;
    default:
      interval = { start: startOfDay(new Date()), end: endOfDay(new Date()) };
  }

  const filteredIncomeData =
    data &&
    data?.filter((item) => {
      const entryDate = parseISO(item.entry_date);
      return isWithinInterval(entryDate, interval);
    });

  const filteredExpenceData =
    expenceData &&
    expenceData?.filter((item) => {
      const entryDate = parseISO(item.entry_date);
      return isWithinInterval(entryDate, interval);
    });

  const todayIncome = calculateIncome(filteredIncomeData);
  const weekIncome = calculateIncome(filteredIncomeData);
  const monthIncome = calculateIncome(filteredIncomeData);
  const yearIncome = calculateIncome(filteredIncomeData);
  const balance = calculateBalance(filteredIncomeData, filteredExpenceData);
  const income = calculateIncome(data);
  const expence = calculateExpence(expenceData);

  return {
    filteredData: filteredIncomeData,
    balance,
    todayIncome,
    weekIncome,
    monthIncome,
    yearIncome,
    income,
    expence,
  };
}

function calculateIncome(data) {
  return data?.reduce(
    (accum, cur) =>
      accum +
      Number(cur?.salary || 0) +
      Number(cur?.rent_income || 0) +
      Number(cur?.remittances || 0) +
      Number(cur.business_income || 0),
    0
  );
}

function calculateExpence(expenceData) {
  return expenceData?.reduce(
    (accum, cur) =>
      accum +
      Number(cur?.cafe_restaurant || 0) +
      Number(cur?.groceries_shopping || 0) +
      Number(cur?.health || 0) +
      Number(cur.other || 0) +
      Number(cur.transportation || 0) +
      Number(cur.utilities || 0),
    0
  );
}

function calculateBalance(incomeData, expenseData) {
  const totalIncome =
    incomeData &&
    incomeData.reduce(
      (accum, cur) =>
        accum +
        Number(cur?.salary || 0) +
        Number(cur?.rent_income || 0) +
        Number(cur?.remittances || 0) +
        Number(cur.business_income || 0) +
        Number(cur.other || 0),
      0
    );

  const totalExpenses =
    expenseData && // Adjusted variable name to match your function
    expenseData.reduce(
      // Adjusted variable name to match your function
      (accum, cur) =>
        accum +
        Number(cur?.cafe_restaurant || 0) +
        Number(cur?.groceries_shopping || 0) +
        Number(cur?.health || 0) +
        Number(cur.other || 0) +
        Number(cur.transportation || 0) +
        Number(cur.utilities || 0),
      0
    );

  const balance = totalIncome + totalExpenses;
  return balance;
}
