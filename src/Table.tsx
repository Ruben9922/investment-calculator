import Paper from '@mui/material/Paper';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useContext} from "react";
import {CurrencyContext} from "./App.tsx";
import {formatNumberForTable} from "./validate.ts";
import YearData from "./yearData.ts";

type TableProps = {
    yearsData: YearData[];
};

function Table({ yearsData }: TableProps) {
    const currency = useContext(CurrencyContext);

    return (
        <TableContainer component={Paper}>
            <MuiTable size="small" aria-label="table containing values for each year">
                <TableHead>
                    <TableRow>
                        <TableCell>Year</TableCell>
                        <TableCell align="right">Principal ({currency})</TableCell>
                        <TableCell align="right">Profit ({currency})</TableCell>
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
                                {formatNumberForTable(yearData.totalValue)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
}

export default Table;
