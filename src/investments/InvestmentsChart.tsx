import {LineChart} from "@mui/x-charts";
import {useContext} from "react";
import {CurrencyContext} from "../App.tsx";
import {calculateProfitPercent} from "./calculate.ts";
import {formatNumberForChart, formatNumberForTable, formatPercent} from "../validate.ts";
import InvestmentYearData from "./investmentYearData.ts";

type InvestmentsChartProps = {
    yearsData: InvestmentYearData[];
};

function InvestmentsChart({ yearsData }: InvestmentsChartProps) {
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
                    : (`${seriesValueFormatter(v)} (${formatPercent(calculateProfitPercent(yearData), yearData.profit)})`);
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

export default InvestmentsChart;
