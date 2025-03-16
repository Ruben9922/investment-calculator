import {useTheme} from "@mui/material";
import Paper from '@mui/material/Paper';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useContext} from "react";
import {CurrencyContext} from "../App.tsx";
import {calculateProfitPercent} from "./calculate.ts";
import {formatNumberForTable, formatPercent} from "../validate.ts";
import InvestmentYearData from "./investmentYearData.ts";

type InvestmentsTableProps = {
    yearsData: InvestmentYearData[];
};

function InvestmentsTable({ yearsData }: InvestmentsTableProps) {
    const currency = useContext(CurrencyContext);
    const theme = useTheme();

    const getProfitPercentColor = (yearData: InvestmentYearData): string | undefined => {
        if (yearData.profit === 0) {
            return undefined;
        }

        return yearData.profit > 0 ? theme.palette.success.main : theme.palette.error.main;
    };

    return (
        <TableContainer component={Paper}>
            <MuiTable size="small" aria-label="table containing values for each year">
                <TableHead>
                    <TableRow>
                        <TableCell>Year</TableCell>
                        <TableCell align="right">Principal ({currency})</TableCell>
                        <TableCell align="right">Profit ({currency})</TableCell>
                        <TableCell align="right">Profit (%)</TableCell>
                        <TableCell align="right">Total Value ({currency})</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {yearsData.map((yearData) => (
                        <TableRow key={yearData.year}>
                            <TableCell component="th" scope="row">
                                {`Year ${yearData.year}`}
                            </TableCell>
                            <TableCell align="right">
                                {formatNumberForTable(yearData.principal)}
                            </TableCell>
                            <TableCell align="right">
                                {formatNumberForTable(yearData.profit)}
                            </TableCell>
                            <TableCell align="right">
                                <span style={{ color: getProfitPercentColor(yearData) }}>
                                    {formatPercent(calculateProfitPercent(yearData), yearData.profit)}
                                </span>
                            </TableCell>
                            <TableCell align="right">
                                {formatNumberForTable(yearData.totalValue)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
}

export default InvestmentsTable;
