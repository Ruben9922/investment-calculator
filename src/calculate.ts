import YearData from "./yearData.ts";

export function calculate(initialAmount: number, recurringAmount: number, growth: number, yearCount: number): YearData[] {
    const multiplier = 1 + growth;
    const monthlyMultiplier = multiplier ** (1 / 12);

    const yearsData: YearData[] = [];
    yearsData.push({ year: 0, principal: initialAmount, profit: 0, totalValue: initialAmount });
    for (let year = 1; year <= yearCount; year++) {
        let principal = yearsData[year - 1].principal;
        let totalValue = yearsData[year - 1].totalValue;
        for (let j = 0; j < 12; j++) {
            principal += recurringAmount;
            totalValue += recurringAmount;
            totalValue *= monthlyMultiplier;
        }
        const profit = totalValue - principal;
        yearsData.push({ year, principal, profit, totalValue });
    }
    return yearsData;
}
