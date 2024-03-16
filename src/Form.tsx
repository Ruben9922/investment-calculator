import InputAdornment from "@mui/material/InputAdornment";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import {useContext} from "react";
import {NumericFormat} from "react-number-format";
import {CurrencyContext} from "./App.tsx";
import {validateGrowth, validateInitialAmount, validateRecurringAmount, validateYearCount} from "./validate.ts";

type FormProps = {
    initialAmountString: string;
    recurringAmountString: string;
    growthString: string;
    yearCountString: string;
    setInitialAmountString: (updatedInitialAmountString: string) => void;
    setRecurringAmountString: (updatedRecurringAmountString: string) => void;
    setGrowthString: (updatedGrowthString: string) => void;
    setYearCountString: (updatedYearCountString: string) => void;
};

// fixme: replace any with proper type
function NumberFormatCustom(props: any) {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumericFormat
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
            valueIsNumericString
            decimalScale={0}
        />
    );
}

function Form({
                  initialAmountString,
                  recurringAmountString,
                  growthString,
                  yearCountString,
                  setInitialAmountString,
                  setRecurringAmountString,
                  setGrowthString,
                  setYearCountString,
              }: FormProps) {
    const currency = useContext(CurrencyContext);

    const initialAmount = parseFloat(initialAmountString);
    const recurringAmount = parseFloat(recurringAmountString);
    const growth = parseFloat(growthString);
    const yearCount = parseInt(yearCountString);

    const initialAmountErrorMessage = validateInitialAmount(initialAmount);
    const recurringAmountErrorMessage = validateRecurringAmount(recurringAmount);
    const growthErrorMessage = validateGrowth(growth);
    const yearCountErrorMessage = validateYearCount(yearCount);

    return (
        <Grid container spacing={2}>
            <Grid xs={12} sm={6} md={3}>
                <TextField
                    label="Initial amount"
                    value={initialAmountString}
                    onChange={event => setInitialAmountString(event.target.value)}
                    name="initialAmount"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                        inputComponent: NumberFormatCustom,
                    }}
                    variant="outlined"
                    fullWidth
                    error={!!initialAmountErrorMessage}
                    helperText={initialAmountErrorMessage}
                />
            </Grid>
            <Grid xs={12} sm={6} md={3}>
                <TextField
                    label="Monthly amount"
                    value={recurringAmountString}
                    onChange={event => setRecurringAmountString(event.target.value)}
                    name="recurringAmount"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                        inputComponent: NumberFormatCustom,
                    }}
                    variant="outlined"
                    fullWidth
                    error={!!recurringAmountErrorMessage}
                    helperText={recurringAmountErrorMessage}
                />
            </Grid>
            <Grid xs={12} sm={6} md={3}>
                <TextField
                    label="Annual growth"
                    value={growthString}
                    onChange={event => setGrowthString(event.target.value)}
                    name="growth"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        inputComponent: NumberFormatCustom,
                    }}
                    variant="outlined"
                    fullWidth
                    error={!!growthErrorMessage}
                    helperText={growthErrorMessage}
                />
            </Grid>
            <Grid xs={12} sm={6} md={3}>
                <TextField
                    label="Years"
                    value={yearCountString}
                    onChange={event => setYearCountString(event.target.value)}
                    name="yearCount"
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                    }}
                    variant="outlined"
                    fullWidth
                    error={!!yearCountErrorMessage}
                    helperText={yearCountErrorMessage}
                />
            </Grid>
        </Grid>
    );
}

export default Form;
