import {LineChart} from "@mui/x-charts";
import {calculate} from "./calculate.ts";
import {formatNumberForChart, formatNumberForTable, validate} from "./validate.ts";

type ChartProps = {
    initialAmountString: string;
    recurringAmountString: string;
    growthString: string;
    yearCountString: string;
};

function Chart({ initialAmountString, recurringAmountString, growthString, yearCountString }: ChartProps) {
    const initialAmount = parseFloat(initialAmountString);
    const recurringAmount = parseFloat(recurringAmountString);
    const growth = parseFloat(growthString);
    const yearCount = parseInt(yearCountString);

    const valid = validate(initialAmount, recurringAmount, growth, yearCount);
    const valuesByYear = valid ? calculate(initialAmount, recurringAmount, growth / 100, yearCount) : null;

    return valid && (
        <LineChart
            series={[{
                data: valuesByYear!.map(value => isFinite(value) ? value : null),
                label: "Value ($)",
                showMark: false,
                valueFormatter: (value: number | null) => value === null ? "An incomprehensible amount of money 💰🤯" : formatNumberForTable(value),
            }]}
            height={400}
            yAxis={[{ valueFormatter: (value: number) => formatNumberForChart(value) }]}
            margin={{ left: 65 }}
            xAxis={[{ label: "Year", data: Array.from(new Array(yearCount + 1), (_, i) => i) }]}
        />
    );
}

export default Chart;
