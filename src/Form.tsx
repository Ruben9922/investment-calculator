import {Grid} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from '@mui/material/TextField';
import {NumericFormat} from "react-number-format";

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

function NumberFormatCustom(props) {
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
            isNumericString
            decimalScale={0}
            // prefix="¤ "
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
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
                <TextField
                    label="Initial amount"
                    value={initialAmountString}
                    onChange={event => setInitialAmountString(event.target.value)}
                    name="initialAmount"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        inputComponent: NumberFormatCustom,
                    }}
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <TextField
                    label="Monthly amount"
                    value={recurringAmountString}
                    onChange={event => setRecurringAmountString(event.target.value)}
                    name="recurringAmount"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        inputComponent: NumberFormatCustom,
                    }}
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <TextField
                    label="Annual growth"
                    value={growthString}
                    onChange={event => setGrowthString(event.target.value)}
                    name="growth"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    variant="outlined"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <TextField
                    label="Years"
                    value={yearCountString}
                    onChange={event => setYearCountString(event.target.value)}
                    name="yearCount"
                    variant="outlined"
                    fullWidth
                />
            </Grid>
        </Grid>
    );
}

export default Form;
