export function formatNumberForErrorMessage(value: number): string {
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

// todo: maybe just use `value` and remove `thresholdValue`
export function formatPercent(value: number, thresholdValue: number = value) {
    return thresholdValue >= 1_000_000_000_000_000
        ? "+" + value.toExponential(3)
        .replace("e", " × 10^")
        .replace("+", "") + " %"
        : value.toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            signDisplay: "always",
        });
}
