import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {useContext} from "react";
import {CurrencyContext} from "../App.tsx";
import {formatNumberForTable, formatPercent} from "../validate.ts";
import {MortgageYearData} from "./models.ts";

type MortgagesTableProps = {
    yearsData: MortgageYearData[];
};

function MortgagesTable({ yearsData }: MortgagesTableProps) {
    const currency = useContext(CurrencyContext);

    return (
        <TableContainer component={Paper}>
            <MuiTable size="small" aria-label="table containing values for each year">
                <TableHead>
                    <TableRow>
                        <TableCell>Year</TableCell>
                        <TableCell align="right">Capital ({currency})</TableCell>
                        <TableCell align="right">Interest ({currency})</TableCell>
                        <TableCell align="right">Interest rate (%)</TableCell>
                        {/*<TableCell align="right">Interest (%)</TableCell>*/}
                        <TableCell align="right">Total Value ({currency})</TableCell>
                        <TableCell align="right">Repaid ({currency})</TableCell>
                        <TableCell align="right">Overpayment fees ({currency})</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {yearsData.map((yearData) => (
                        <TableRow key={yearData.year}>
                            <TableCell component="th" scope="row">
                                {`Year ${yearData.year}`}
                            </TableCell>
                            <TableCell align="right">
                                {formatNumberForTable(yearData.capital)}
                            </TableCell>
                            <TableCell align="right">
                                {formatNumberForTable(yearData.interest)}
                            </TableCell>
                            {/* todo format without + symbol */}
                            <TableCell align="right">
                                {formatPercent(yearData.interestRate)}
                            </TableCell>
                            {/* todo */}
                            {/*<TableCell align="right">*/}
                            {/*    {formatProfitPercent(calculateProfitPercent(yearData), yearData.profit)}*/}
                            {/*</TableCell>*/}
                            <TableCell align="right">
                                {formatNumberForTable(yearData.outstandingValue)}
                            </TableCell>
                            <TableCell align="right">
                                {formatNumberForTable(yearData.repaid)}
                            </TableCell>
                            <TableCell align="right">
                                {formatNumberForTable(yearData.overpaymentFees)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
}

export default MortgagesTable;
