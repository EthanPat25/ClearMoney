const nominal_return = 0.07; // nominal return
const tax_on_earnings = 0.15; // tax on earnings
const investment_fee_percentage = 0.0019; // investment fee
const admin_fee = 74; // flat admin fee
const inflation = 0.037; // inflation
const number_years = 30; // number of years
const withdrawal_rate = 0.02; // 4% withdrawal rate

const simulateWithdrawalsOverTime = () => {
  let current_balance = 100000;
  let withdrawal = current_balance * withdrawal_rate;
  for (let j = 1; j <= number_years; j++) {
    const earnings = current_balance * nominal_return;
    const net_earnings = earnings * (1 - tax_on_earnings);
    const fee = current_balance * investment_fee_percentage;
    current_balance =
      current_balance + net_earnings - fee - withdrawal - admin_fee;
    withdrawal *= 1 + inflation; // increase withdrawal for inflation
  }
  const real_value = current_balance / Math.pow(1 + inflation, number_years); // deflate final balance to today's dollars
  console.log(
    `Nominal balance after ${number_years} years:`,
    current_balance.toFixed(2)
  );
  console.log("Inflation-adjusted (today’s dollars):", real_value.toFixed(2));
};

const projectInvestmentGrowth = () => {
  let current_balance = 30000;
  for (let j = 1; j <= number_years; j++) {
    const earnings = current_balance * nominal_return;
    const net_earnings = earnings * (1 - tax_on_earnings);
    const fee = current_balance * investment_fee_percentage;
    current_balance = current_balance + net_earnings - fee - admin_fee;
  }
  const real_value = current_balance / Math.pow(1 + inflation, number_years); // deflate final balance to today's dollars
  console.log(
    `Nominal balance after ${number_years} years:`,
    current_balance.toFixed(2)
  );
  console.log("Inflation-adjusted (today’s dollars):", real_value.toFixed(2));
};

simulateWithdrawalsOverTime();
projectInvestmentGrowth();
