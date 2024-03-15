function formatNumberForErrorMessage(value: number): string {
    return value >= 1_000_000
        ? value.toExponential()
            .replace("e", "×10^")
            .replace("1×", "")
            .replace("+", "")
        : value.toLocaleString();
}

export function formatNumberForTable(value: number): string {
    return value >= 1_000_000_000_000_000
        ? value.toExponential(3)
            .replace("e", " × 10^")
            .replace("+", "")
        : value.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function validateNumber(value: number, min: number, max: number): string | null {
    if (value < min || value > max) {
        return `Must be between ${formatNumberForErrorMessage(min)} and ${formatNumberForErrorMessage(max)} (inclusive).`
    }

    return null;
}

export function validateInitialAmount(initialAmount: number): string | null {
    return validateNumber(initialAmount, 1, 1_000_000_000_000)
}

export function validateRecurringAmount(recurringAmount: number): string | null {
    return validateNumber(recurringAmount, 1, 1_000_000_000_000)
}

export function validateGrowth(growth: number): string | null {
    return validateNumber(growth, 1, 1_000_000);
}

export function validateYearCount(yearCount: number): string | null {
    return validateNumber(yearCount, 1, 100);
}

export function validate(initialAmount: number, recurringAmount: number, growth: number, yearCount: number): boolean {
    return !validateInitialAmount(initialAmount)
        && !validateRecurringAmount(recurringAmount)
        && !validateGrowth(growth)
        && !validateYearCount(yearCount);
}
