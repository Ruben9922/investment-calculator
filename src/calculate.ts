import YearData from "./yearData.ts";

export function calculate(
    initialAmount: number,
    monthlyAmount: number,
    yearlyAmount: number,
    growth: number,
    yearCount: number,
): YearData[] {
    const yearlyMultiplier = 1 + growth;
    const monthlyMultiplier = yearlyMultiplier ** (1 / 12);

    const yearsData: YearData[] = [];
    yearsData.push({ year: 0, principal: initialAmount, profit: 0, totalValue: initialAmount });
    for (let year = 1; year <= yearCount; year++) {
        let principal = yearsData[year - 1].principal;
        let totalValue = yearsData[year - 1].totalValue;
        for (let j = 0; j < 12; j++) {
            principal += monthlyAmount;
            totalValue += monthlyAmount;

            // Apply growth on a monthly basis
            totalValue *= monthlyMultiplier;
        }

        principal += yearlyAmount;
        totalValue += yearlyAmount;

        const profit = totalValue - principal;
        yearsData.push({ year, principal, profit, totalValue });
    }
    return yearsData;
}

export function calculateProfitPercent(yearData: YearData): number {
    return yearData.principal ? yearData.profit / yearData.principal : 0;
}
