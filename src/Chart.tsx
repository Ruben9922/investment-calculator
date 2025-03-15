import {LineChart} from "@mui/x-charts";
import {useContext} from "react";
import {CurrencyContext} from "./App.tsx";
import {calculateProfitPercent} from "./calculate.ts";
import {formatNumberForChart, formatNumberForTable, formatProfitPercent} from "./validate.ts";
import YearData from "./yearData.ts";

type ChartProps = {
    yearsData: YearData[];
};

function Chart({ yearsData }: ChartProps) {
    const currency = useContext(CurrencyContext);

    const seriesValueFormatter = (value: number | null): string => value === null
        ? "An incomprehensible amount of money 💰🤯"
        : formatNumberForTable(value);

    const series = [
        {
            data: yearsData
                .map(yearData => yearData.principal)
                .map(principal => isFinite(principal) ? principal : null),
            label: `Principal (${currency})`,
        },
        {
            data: yearsData
                .map(yearData => yearData.profit)
                .map(profit => isFinite(profit) ? profit : null),
            label: `Profit (${currency})`,
            valueFormatter: (v: number | null, { dataIndex }: { dataIndex: number }) => {
                const yearData = yearsData[dataIndex];
                return v === null
                    ? seriesValueFormatter(v)
                    : (`${seriesValueFormatter(v)} (${formatProfitPercent(calculateProfitPercent(yearData), yearData.profit)})`);
            },
        },
        {
            data: yearsData
                .map(yearData => yearData.totalValue)
                .map(totalValue => isFinite(totalValue) ? totalValue : null),
            label: `Total Value (${currency})`,
        }
    ];

    return (
        <LineChart
            series={series.map(series => ({
                showMark: false,
                valueFormatter: seriesValueFormatter,
                ...series,
            }))}
            height={400}
            yAxis={[{ valueFormatter: (value: number) => formatNumberForChart(value) }]}
            margin={{ left: 65 }}
            xAxis={[{ label: "Year", data: yearsData.map(yearData => yearData.year) }]}
        />
    );
}

export default Chart;
