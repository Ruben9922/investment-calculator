import React from "react";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import NumberFormat from 'react-number-format';
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function NumberFormatCustom(props) {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            decimalScale={0}
            // prefix="¤ "
        />
    );
}

function calculate(initialAmount, recurringAmount, growth, yearCount) {
    const multiplier = 1 + growth;
    const monthlyMultiplier = Math.pow(multiplier, 1 / 12);

    let valueByYear = [];
    valueByYear.push(initialAmount);
    for (let i = 1; i <= yearCount; i++) {
        let value = valueByYear[i - 1];
        for (let j = 0; j < 12; j++) {
            value += recurringAmount;
            value *= monthlyMultiplier;
        }
        valueByYear.push(value);
    }
    return valueByYear;
}

export default function App() {
    const classes = useStyles();

    // const [initialAmount, setInitialAmount] = React.useState(0);
    // const [recurringAmount, setRecurringAmount] = React.useState(0);
    // const [growth, setGrowth] = React.useState(0.1);
    const [inputs, setInputs] = React.useState({
        initialAmount: "20000",
        recurringAmount: "500",
        growth: "10",
        yearCount: "50",
    });

    const handleChange = event => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    };

    let valueByYear = calculate(parseFloat(inputs.initialAmount), parseFloat(inputs.recurringAmount),
        parseFloat(inputs.growth) / 100, parseInt(inputs.yearCount));

    return [
        <Header/>,
        <Container maxWidth="md">
            <div className={classes.root}>
                <TextField
                    label="Initial amount"
                    value={inputs.initialAmount}
                    onChange={handleChange}
                    name="initialAmount"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        inputComponent: NumberFormatCustom,
                    }}
                    variant="outlined"
                />
                <TextField
                    label="Monthly amount"
                    value={inputs.recurringAmount}
                    onChange={handleChange}
                    name="recurringAmount"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        inputComponent: NumberFormatCustom,
                    }}
                    variant="outlined"
                />
                <TextField
                    label="Annual growth"
                    value={inputs.growth}
                    onChange={handleChange}
                    name="growth"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    variant="outlined"
                />
                <TextField
                    label="Years"
                    value={inputs.yearCount}
                    onChange={handleChange}
                    name="yearCount"
                    variant="outlined"
                />
            </div>
            <Alert severity="warning">
                <AlertTitle>Disclaimer</AlertTitle>
                This is for indicative purposes only and should not be used as the basis for any investment decision. The data shown is purely hypothetical, based on the parameters entered, and does not necessarily reflect real-world investing. It does not take into account inflation, taxes, fees or other factors that may affect the value of your investment. I do not make any guarantees regarding the accuracy of the data shown.
            </Alert>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Year</TableCell>
                            <TableCell align="right">Value ($)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {valueByYear.map((value, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {`Year ${index}`}
                                </TableCell>
                                <TableCell align="right">
                                    <NumberFormat
                                        value={value}
                                        displayType="text"
                                        thousandSeparator
                                        isNumericString
                                        decimalScale={0}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    ];
}
