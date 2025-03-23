import {InvestmentsInputs, InvestmentYearData} from "./models.ts";

export function calculate({
                              initialAmount,
                              monthlyAmount,
                              yearlyAmount,
                              growth,
                              yearCount,
                          }: InvestmentsInputs): InvestmentYearData[] {
    const yearlyMultiplier = 1 + growth;
    const monthlyMultiplier = yearlyMultiplier ** (1 / 12);

    const yearsData: InvestmentYearData[] = [];
    yearsData.push({ year: 0, principal: initialAmount, profit: 0, totalValue: initialAmount });
    for (let year = 1; year <= yearCount; year++) {
        let principal = yearsData[year - 1].principal;
        let totalValue = yearsData[year - 1].totalValue;
        for (let month = 0; month < 12; month++) {
            principal += monthlyAmount;
            totalValue += monthlyAmount;

            // Apply growth on a monthly basis
            // todo i think this should be applied first, current monthly amount shouldn't immediately receive interest?
            totalValue *= monthlyMultiplier;
        }

        principal += yearlyAmount;
        totalValue += yearlyAmount;

        const profit = totalValue - principal;
        yearsData.push({ year, principal, profit, totalValue });
    }
    return yearsData;
}

export function calculateProfitPercent(yearData: InvestmentYearData): number {
    return yearData.principal ? yearData.profit / yearData.principal : 0;
}
