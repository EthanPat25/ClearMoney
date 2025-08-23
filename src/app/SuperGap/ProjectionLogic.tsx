const wageInflation = 0.037; // 3.7% wage inflation per year

interface Result {
  hello: number; // Nominal future value
  hi: number;    // Today's dollars (adjusted for wage inflation)
}

// Function to calculate the future value of contributions in today's dollars
export const futureValueTodayDollars = (
  ContributionPerPeriod: number,
  annualRate: number,
  frequency: number,
  years: number
): Result => {
  const n = frequency * years; // Total periods (e.g., for quarterly = 4 * years)
  const r = annualRate / frequency; // Rate per period (quarterly in this case)

  // Future value of annuity (contributions growing over time)
  const futureValue = ContributionPerPeriod * ((Math.pow(1 + r, n) - 1) / r);

  // Deflate future value to today's dollars using wage inflation
  const todayDollars = futureValue / Math.pow(1 + wageInflation, years);

  return {
    hello: futureValue, // Future value in nominal dollars
    hi: todayDollars,   // Adjusted value in today's dollars
  };
};

// Function to calculate superannuation contributions over time
export const SuperannuationContributions = (
  CurrentAge: number,
  AgeOfRetirement: number,
  SG: number, // Should be in decimal format (e.g., 11.5% → 0.115)
  Salary: number,
  frequency: number = 4 // Default to quarterly (4 periods per year)
): any => {
  const YearsTillRetirement = AgeOfRetirement - CurrentAge;

  // Calculate the annual contribution based on SG and Salary
  const annualContribution = Salary * SG;

  // Use the futureValueTodayDollars function to calculate the results
  const result = futureValueTodayDollars(annualContribution / frequency, 0.075, frequency, YearsTillRetirement);

  return result; // Return the result
};

// Test
console.log(SuperannuationContributions(25, 65, 0.115, 70000));

