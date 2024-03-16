import {LineChart} from "@mui/x-charts";
import {formatNumberForChart, formatNumberForTable} from "./validate.ts";
import YearData from "./yearData.ts";

type ChartProps = {
    yearsData: YearData[];
};

function Chart({ yearsData }: ChartProps) {
    return (
        <LineChart
            series={[{
                data: yearsData
                    .map(yearData => yearData.totalValue)
                    .map(totalValue => isFinite(totalValue) ? totalValue : null),
                label: "Value ($)",
                showMark: false,
                valueFormatter: (value: number | null) => value === null ? "An incomprehensible amount of money 💰🤯" : formatNumberForTable(value),
            }]}
            height={400}
            yAxis={[{ valueFormatter: (value: number) => formatNumberForChart(value) }]}
            margin={{ left: 65 }}
            xAxis={[{ label: "Year", data: yearsData.map(yearData => yearData.year) }]}
        />
    );
}

export default Chart;
