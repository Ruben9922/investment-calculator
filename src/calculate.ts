export function calculate(initialAmount: number, recurringAmount: number, growth: number, yearCount: number): number[] {
    const multiplier = 1 + growth;
    const monthlyMultiplier = multiplier ** (1 / 12);

    const valuesByYear: number[] = [];
    valuesByYear.push(initialAmount);
    for (let i = 1; i <= yearCount; i++) {
        let value = valuesByYear[i - 1];
        for (let j = 0; j < 12; j++) {
            value += recurringAmount;
            value *= monthlyMultiplier;
        }
        valuesByYear.push(value);
    }
    return valuesByYear;
}
