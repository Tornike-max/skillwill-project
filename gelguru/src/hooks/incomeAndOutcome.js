export function incomeAndOutcome(data, expenceData) {
  const income = calculateIncome(data);
  const expence = calculateExpence(expenceData);

  return { income, expence };
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
