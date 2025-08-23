let nominal_return = 0.07;        // nominal return
let tax_on_earnings = 0.15;        // tax on earnings
let investment_fee_percentage = 0.0019;      // investment fee
let admin_fee = 74;          // flat admin fee
let inflation = 0.037;       // inflation
let number_years = 30;          // number of years
let withdrawal_rate = 0.02;   // 4% withdrawal rate

const simulateWithdrawalsOverTime = () => {
    let current_balance = 100000;
    let withdrawal = current_balance * withdrawal_rate;
    for (let j = 1; j <= number_years; j++) {
        let earnings = current_balance * nominal_return;
        let net_earnings = earnings * (1 - tax_on_earnings);
        let fee = current_balance * investment_fee_percentage;
        current_balance = current_balance + net_earnings - fee - withdrawal - admin_fee;
        withdrawal *= (1 + inflation); // increase withdrawal for inflation
    }
    let real_value = current_balance / Math.pow(1 + inflation, number_years); // deflate final balance to today's dollars
    console.log(`Nominal balance after ${number_years} years:`, current_balance.toFixed(2));
    console.log("Inflation-adjusted (today’s dollars):", real_value.toFixed(2));
}

const projectInvestmentGrowth = () => {
    let current_balance = 30000;
    for (let j = 1; j <= number_years; j++) {
        let earnings = current_balance * nominal_return;
        let net_earnings = earnings * (1 - tax_on_earnings);
        let fee = current_balance * investment_fee_percentage;
        current_balance = current_balance + net_earnings - fee - admin_fee;
    }
    let real_value = current_balance / Math.pow(1 + inflation, number_years); // deflate final balance to today's dollars
    console.log(`Nominal balance after ${number_years} years:`, current_balance.toFixed(2));
    console.log("Inflation-adjusted (today’s dollars):", real_value.toFixed(2));
}


