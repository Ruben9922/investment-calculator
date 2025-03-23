import {MortgagesInputs, MortgageYearData} from "./models.ts";

export function calculate({
                              borrowedAmount,
                              years,
                              monthlyRepayment,
                              monthlyOverpayment,
                              interestRate,
                              overpaymentLimit,
                              overpaymentFee,
                          }: MortgagesInputs): MortgageYearData[] {
    const yearsData: MortgageYearData[] = [];
    yearsData.push({
        year: 0,
        capital: borrowedAmount,
        interest: 0,
        outstandingValue: borrowedAmount,
        repaid: 0,
        overpaymentFees: 0,
    });
    for (let year = 1; year <= years; year++) {
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

        yearsData.push({ year, capital, interest, outstandingValue: totalValue, repaid, overpaymentFees });
    }
    return yearsData;
}
