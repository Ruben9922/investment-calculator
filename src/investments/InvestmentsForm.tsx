import Grid from "@mui/material/Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import {useContext} from "react";
import {NumericFormat} from "react-number-format";
import {CurrencyContext} from "../App.tsx";
import {validateGrowth, validateInitialAmount, validateRecurringAmount, validateYearCount} from "../validate.ts";

type InvestmentsFormProps = {
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

function InvestmentsForm({
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
              }: InvestmentsFormProps) {
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
            <Grid size={{ xs: 12, sm: 6, md: 3}}>
                <NumericFormat
                    label="Initial amount"
                    value={initialAmountString}
                    customInput={TextField}
                    onValueChange={values => setInitialAmountString(values.value)}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="initialAmount"
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                        }
                    }}
                    fullWidth
                    error={!!initialAmountErrorMessage}
                    helperText={initialAmountErrorMessage}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
                <NumericFormat
                    label="Monthly amount"
                    value={monthlyAmountString}
                    customInput={TextField}
                    onValueChange={values => setMonthlyAmountString(values.value)}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="monthlyAmount"
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                        }
                    }}
                    fullWidth
                    error={!!monthlyAmountErrorMessage}
                    helperText={monthlyAmountErrorMessage}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
                <NumericFormat
                    label="Yearly amount"
                    value={yearlyAmountString}
                    customInput={TextField}
                    onValueChange={values => setYearlyAmountString(values.value)}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="yearlyAmount"
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                        }
                    }}
                    fullWidth
                    error={!!yearlyAmountErrorMessage}
                    helperText={yearlyAmountErrorMessage}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <NumericFormat
                    label="Annual growth"
                    value={growthString}
                    customInput={TextField}
                    onValueChange={values => setGrowthString(values.value)}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="growth"
                    slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
                    fullWidth
                    error={!!growthErrorMessage}
                    helperText={growthErrorMessage}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <NumericFormat
                    label="Years"
                    value={yearCountString}
                    customInput={TextField}
                    onValueChange={values => setYearCountString(values.value)}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="yearCount"
                    fullWidth
                    error={!!yearCountErrorMessage}
                    helperText={yearCountErrorMessage}
                />
            </Grid>
        </Grid>
    );
}

export default InvestmentsForm;
