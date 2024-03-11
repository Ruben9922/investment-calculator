import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {NumericFormat} from "react-number-format";

type TableProps = {
    valuesByYear: number[];
};

function Table({ valuesByYear }: TableProps) {
    return (
        <TableContainer component={Paper}>
            <MuiTable size="small" aria-label="table containing values for each year">
                <TableHead>
                    <TableRow>
                        <TableCell>Year</TableCell>
                        <TableCell align="right">Value ($)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {valuesByYear.map((value, index) => (
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
                                    decimalScale={0}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
}

export default Table;
