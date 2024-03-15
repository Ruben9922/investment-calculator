import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {NumericFormat} from "react-number-format";
import {calculate} from "./calculate.ts";
import {validate} from "./validate.ts";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";

type TableProps = {
    initialAmountString: string;
    recurringAmountString: string;
    growthString: string;
    yearCountString: string;
};

function Table({ initialAmountString, recurringAmountString, growthString, yearCountString }: TableProps) {
    const initialAmount = parseFloat(initialAmountString);
    const recurringAmount = parseFloat(recurringAmountString);
    const growth = parseFloat(growthString) / 100;
    const yearCount = parseInt(yearCountString);

    const valid = validate(initialAmount, recurringAmount, growth, yearCount);
    const valuesByYear = valid ? calculate(initialAmount, recurringAmount, growth, yearCount) : null;

    return valid ? (
        <TableContainer component={Paper}>
            <MuiTable size="small" aria-label="table containing values for each year">
                <TableHead>
                    <TableRow>
                        <TableCell>Year</TableCell>
                        <TableCell align="right">Value ($)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {valuesByYear!.map((value, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {`Year ${index}`}
                            </TableCell>
                            <TableCell align="right">
                                <NumericFormat
                                    value={value}
                                    displayType="text"
                                    thousandSeparator
                                    valueIsNumericString
                                    decimalScale={0}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    ) : (
        <Alert severity="error">
            <AlertTitle>Invalid input</AlertTitle>
            Please fix the errors and try again.
        </Alert>
    );
}

export default Table;
