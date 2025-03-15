import InputAdornment from "@mui/material/InputAdornment";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import {useContext} from "react";
import {NumericFormat} from "react-number-format";
import {CurrencyContext} from "./App.tsx";
import {validateGrowth, validateInitialAmount, validateRecurringAmount, validateYearCount} from "./validate.ts";

type FormProps = {
    initialAmountString: string;
    monthlyAmountString: string;
    yearlyAmountString: string;
    growthString: string;
    yearCountString: string;
    setInitialAmountString: (updatedInitialAmountString: string) => void;
    setMonthlyAmountString: (updatedMonthlyAmountString: string) => void;
    setYearlyAmountString: (updatedYearlyAmountString: string) => void;
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
                  monthlyAmountString,
                  yearlyAmountString,
                  growthString,
                  yearCountString,
                  setInitialAmountString,
                  setMonthlyAmountString,
                  setYearlyAmountString,
                  setGrowthString,
                  setYearCountString,
              }: FormProps) {
    const currency = useContext(CurrencyContext);

    const initialAmount = parseFloat(initialAmountString);
    const monthlyAmount = parseFloat(monthlyAmountString);
    const yearlyAmount = parseFloat(yearlyAmountString);
    const growth = parseFloat(growthString);
    const yearCount = parseInt(yearCountString);

    const initialAmountErrorMessage = validateInitialAmount(initialAmount);
    const monthlyAmountErrorMessage = validateRecurringAmount(monthlyAmount);
    const yearlyAmountErrorMessage = validateRecurringAmount(yearlyAmount);
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
            <Grid xs={12} sm={6} md={2.5}>
                <TextField
                    label="Monthly amount"
                    value={monthlyAmountString}
                    onChange={event => setMonthlyAmountString(event.target.value)}
                    name="monthlyAmount"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                        inputComponent: NumberFormatCustom,
                    }}
                    variant="outlined"
                    fullWidth
                    error={!!monthlyAmountErrorMessage}
                    helperText={monthlyAmountErrorMessage}
                />
            </Grid>
            <Grid xs={12} sm={6} md={2.5}>
                <TextField
                    label="Yearly amount"
                    value={yearlyAmountString}
                    onChange={event => setYearlyAmountString(event.target.value)}
                    name="yearlyAmount"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                        inputComponent: NumberFormatCustom,
                    }}
                    variant="outlined"
                    fullWidth
                    error={!!yearlyAmountErrorMessage}
                    helperText={yearlyAmountErrorMessage}
                />
            </Grid>
            <Grid xs={12} sm={6} md={2}>
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
            <Grid xs={12} sm={6} md={2}>
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
