import {LineChart} from "@mui/x-charts";
import {formatNumberForChart, formatNumberForTable} from "./validate.ts";

type ChartProps = {
    valuesByYear: number[];
    yearCount: number;
};

function Chart({ valuesByYear, yearCount }: ChartProps) {
    return (
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
