import YearData from "./yearData.ts";

export function calculate(initialAmount: number, recurringAmount: number, growth: number, yearCount: number): YearData[] {
    const multiplier = 1 + growth;
    const monthlyMultiplier = multiplier ** (1 / 12);

    const yearsData: YearData[] = [];
    yearsData.push({ year: 0, totalValue: initialAmount });
    for (let year = 1; year <= yearCount; year++) {
        let totalValue = yearsData[year - 1].totalValue;
        for (let j = 0; j < 12; j++) {
            totalValue += recurringAmount;
            totalValue *= monthlyMultiplier;
        }
        yearsData.push({ year: year, totalValue });
    }
    return yearsData;
}
