// function generateErrorMessage(fieldName: string, min: number, max: number): string {
//     return `Must be between ${min} and ${max} (inclusive).`
// }

export function validateInitialAmount(initialAmount: number): string | null {
    if (initialAmount <= 0 || initialAmount > 1_000_000_000_000) {
        return "Must be greater than zero and less than (or equal to) 1,000,000,000,000"
    }

    return null;
}

export function validateRecurringAmount(recurringAmount: number): string | null {
    if (recurringAmount <= 0 || recurringAmount > 1_000_000_000_000) {
        return "Must be greater than zero and less than (or equal to) 1,000,000,000,000"
    }

    return null;
}

export function validateGrowth(growth: number): string | null {
    if (growth <= 0 || growth > 1_000_000) {
        return "Must be greater than zero and less than (or equal to) 1,000,000"
    }

    return null;
}

export function validateYearCount(yearCount: number): string | null {
    if (yearCount <= 0 || yearCount > 100) {
        return "Must be greater than zero and less than (or equal to) 100"
    }

    return null;
}

export function validate(initialAmount: number, recurringAmount: number, growth: number, yearCount: number): boolean {
    return !validateInitialAmount(initialAmount)
        && !validateRecurringAmount(recurringAmount)
        && !validateGrowth(growth)
        && !validateYearCount(yearCount);
}
