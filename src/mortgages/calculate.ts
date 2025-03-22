import MortgageYearData from "./models.ts";

// todo maybe put all these inputs into an object so it's easier to pass around
export function calculate(
    borrowedAmount: number,
    years: number,
    monthlyRepayment: number,
    monthlyOverpayment: number,
    initialInterestRate: number,
    initialInterestRateYears: number,
    subsequentInterestRate: number,
    overpaymentLimit: number, // todo overpayment limits / fees
    overpaymentFee: number,
): MortgageYearData[] {
    const yearsData: MortgageYearData[] = [];
    yearsData.push({
        year: 0,
        capital: borrowedAmount,
        interest: 0,
        interestRate: 0,
        outstandingValue: borrowedAmount,
        repaid: 0,
        overpaymentFees: 0,
    });
    for (let year = 1; year <= years; year++) {
        // todo check it shouldn't be < instead of <=
        const interestRate = year <= initialInterestRateYears ? initialInterestRate : subsequentInterestRate;
        const yearlyMultiplier = 1 + interestRate;
        const monthlyMultiplier = yearlyMultiplier ** (1 / 12);

        let capital = yearsData[year - 1].capital;
        let interest = yearsData[year - 1].interest;
        let totalValue = yearsData[year - 1].outstandingValue;
        let repaid = yearsData[year - 1].repaid;
        for (let month = 0; month < 12; month++) {
            // Apply interest
            totalValue *= monthlyMultiplier;
            interest = totalValue - capital;

            // Apply monthly payment
            const totalMonthlyPayment = monthlyRepayment + monthlyOverpayment;
            capital -= totalMonthlyPayment * (capital / totalValue);
            capital = Math.max(0, capital);
            interest -= totalMonthlyPayment * (interest / totalValue);
            interest = Math.max(0, interest);
            totalValue -= totalMonthlyPayment;
            // Cap repayment so don't repay more than total owed
            repaid += totalMonthlyPayment + Math.min(0, totalValue);
            totalValue = Math.max(0, totalValue);
        }

        const yearlyOverpayment = monthlyOverpayment * 12;
        const overpaymentFees = yearlyOverpayment > (overpaymentLimit * totalValue)
            ? (yearlyOverpayment - (overpaymentLimit * totalValue)) * overpaymentFee
            : 0;

        yearsData.push({ year, capital, interest, interestRate, outstandingValue: totalValue, repaid, overpaymentFees });
    }
    return yearsData;
}
