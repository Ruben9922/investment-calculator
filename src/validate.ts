function formatNumberForErrorMessage(value: number): string {
    return value >= 1_000_000
        ? value.toExponential()
            .replace("e", "×10^")
            .replace("1×", "")
            .replace("+", "")
        : value.toLocaleString();
}

export function formatNumberForTable(value: number): string {
    if (value === Number.POSITIVE_INFINITY) {
        return "An incomprehensible amount of money 💰🤯";
    }

    return value >= 1_000_000_000_000_000
        ? value.toExponential(3)
            .replace("e", " × 10^")
            .replace("+", "")
        : value.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export function formatNumberForChart(value: number): string {
    return value >= 100_000
        ? value.toExponential(0)
            .replace("e", "×10^")
            .replace("+", "")
        : value.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export function formatProfitPercent(profitPercent: number, profit: number) {
    return profit >= 1_000_000_000_000_000
        ? "+" + profitPercent.toExponential(3)
            .replace("e", " × 10^")
            .replace("+", "") + " %"
        : profitPercent.toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            signDisplay: "always",
        });
}

function validateNumber(value: number, min: number, max: number): string | null {
    if (isNaN(value)) {
        // Value can only be `NaN` if text field is empty
        return "Cannot be empty.";
    }

    if (value < min || value > max) {
        return `Must be between ${formatNumberForErrorMessage(min)} and ${formatNumberForErrorMessage(max)} (inclusive).`
    }

    return null;
}

export function validateInitialAmount(initialAmount: number): string | null {
    return validateNumber(initialAmount, 0, 1_000_000_000_000)
}

export function validateRecurringAmount(recurringAmount: number): string | null {
    return validateNumber(recurringAmount, 0, 1_000_000_000_000)
}

export function validateGrowth(growth: number): string | null {
    return validateNumber(growth, -100, 1_000_000);
}

export function validateYearCount(yearCount: number): string | null {
    return validateNumber(yearCount, 1, 100);
}

export function validate(
    initialAmount: number,
    monthlyAmount: number,
    yearlyAmount: number,
    growth: number,
    yearCount: number,
): boolean {
    return !validateInitialAmount(initialAmount)
        && !validateRecurringAmount(monthlyAmount)
        && !validateRecurringAmount(yearlyAmount)
        && !validateGrowth(growth)
        && !validateYearCount(yearCount);
}
