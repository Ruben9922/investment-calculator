import {LineChart} from "@mui/x-charts";
import {formatNumberForChart, formatNumberForTable} from "./validate.ts";
import YearData from "./yearData.ts";

type ChartProps = {
    yearsData: YearData[];
};

function Chart({ yearsData }: ChartProps) {
    const seriesValueFormatter = (value: number | null) => value === null
        ? "An incomprehensible amount of money 💰🤯"
        : formatNumberForTable(value);

    const series = [
        {
            data: yearsData
                .map(yearData => yearData.principal)
                .map(principal => isFinite(principal) ? principal : null),
            label: "Principal ($)",
            showMark: false,
            valueFormatter: seriesValueFormatter,
        },
        {
            data: yearsData
                .map(yearData => yearData.profit)
                .map(profit => isFinite(profit) ? profit : null),
            label: "Profit ($)",
            showMark: false,
            valueFormatter: seriesValueFormatter,
        },
        {
            data: yearsData
                .map(yearData => yearData.totalValue)
                .map(totalValue => isFinite(totalValue) ? totalValue : null),
            label: "Total Value ($)",
            showMark: false,
            valueFormatter: seriesValueFormatter,
        }
    ];

    return (
        <LineChart
            series={series}
            height={400}
            yAxis={[{ valueFormatter: (value: number) => formatNumberForChart(value) }]}
            margin={{ left: 65 }}
            xAxis={[{ label: "Year", data: yearsData.map(yearData => yearData.year) }]}
        />
    );
}

export default Chart;
