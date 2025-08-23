let Balance = 50000;                  // Initial super balance
let retur = 0.075;                    // Nominal investment return (7.5%)
let tax_earnings = 0.07;              // Earnings tax (7%)
let invest_fee = 0.0085;              // Investment fee (0.85%)
let adm_fee = 74;                     // Flat admin fee (today’s dollars)
let awe = 0.037;                      // Wage inflation (for admin fee indexation)
let inflat = 0.037;                   // Inflation (CPI + living standards)
let duration = 40;                    // Number of years

let baseSalary = 70000;              // Base salary
let contribRate = 0.12;              // Employer contribution rate (12%)

let totalAdmin = 0;
let totalInvestmentFees = 0;
let realAdminFees = 0;
let realInvestmentFees = 0;

let startYear = new Date().getFullYear();

for (let j = 0; j < duration; j++) {
    let year = startYear + j;

    // Salary grows with inflation
    let salaryThisYear = baseSalary * Math.pow(1 + inflat, j);
    let contribution = salaryThisYear * contribRate * (1 - 0.15);  // Contributions taxed at 15%

    // Mid-year compound return factor
    let halfYearReturn = Math.pow(1 + retur, 0.5);
    let midYearContribution = contribution * halfYearReturn;

    // Investment earnings and investment fee
    let earnings = Balance * retur;
    let fee = Balance * invest_fee;
    totalInvestmentFees += fee;

    // Net earnings after fee and tax
    let taxableEarnings = earnings - fee;
    let netEarnings = taxableEarnings * (1 - tax_earnings);

    // Admin fee grows with wage inflation (AWE)
    let inflatedAdminFee = adm_fee * Math.pow(1 + awe, j);
    totalAdmin += inflatedAdminFee;

    // Discount fees to today’s dollars
    realAdminFees += inflatedAdminFee / Math.pow(1 + inflat, duration - j);
    realInvestmentFees += fee / Math.pow(1 + inflat, duration - j);

    // Update balance
    Balance = Balance + midYearContribution + netEarnings - inflatedAdminFee;
}

// Final inflation-adjusted value of super
let realValue = Balance / Math.pow(1 + inflat, duration);

console.log("Nominal balance after 30 years:", Balance.toFixed(2));
console.log("Inflation-adjusted (today’s dollars):", realValue.toFixed(2));
console.log("Total nominal admin fees:", totalAdmin.toFixed(2));
console.log("Inflation-adjusted admin fees:", realAdminFees.toFixed(2));
console.log("Percentage-based nominal investment fees:", totalInvestmentFees.toFixed(2));
console.log("Inflation-adjusted percentage-based investment fees:", realInvestmentFees.toFixed(2));
console.log("Nominal total fees:", (totalAdmin + totalInvestmentFees).toFixed(2));
console.log("Total inflation-adjusted fees:", (realAdminFees + realInvestmentFees).toFixed(2));
