import Grid from "@mui/material/Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import {useContext} from "react";
import {NumberFormatValues, NumericFormat} from "react-number-format";
import {Updater, useImmer} from "use-immer";
import {CurrencyContext} from "../App.tsx";
import {validateGrowth, validateInitialAmount, validateRecurringAmount, validateYearCount} from "../validate.ts";
import {InvestmentsFormData, InvestmentsFormDataKeys, InvestmentsInputs} from "./models.ts";

type InvestmentsFormProps = {
    investmentsFormData: InvestmentsFormData;
    setInvestmentsFormData: Updater<InvestmentsFormData>;
};

const initialDirty: Record<InvestmentsFormDataKeys, boolean> = {
    initialAmountString: false,
    monthlyAmountString: false,
    yearlyAmountString: false,
    growthString: false,
    yearCountString: false,
};

function InvestmentsForm({ investmentsFormData, setInvestmentsFormData }: InvestmentsFormProps) {
    const currency = useContext(CurrencyContext);

    const [dirty, setDirty] = useImmer(initialDirty);

    const values: InvestmentsInputs = {
        initialAmount: parseFloat(investmentsFormData.initialAmountString),
        monthlyAmount: parseFloat(investmentsFormData.monthlyAmountString),
        yearlyAmount: parseFloat(investmentsFormData.yearlyAmountString),
        growth: parseFloat(investmentsFormData.growthString),
        yearCount: parseInt(investmentsFormData.yearCountString),
    };

    const errorMessages: Record<InvestmentsFormDataKeys, string | null> = {
        initialAmountString: validateInitialAmount(values.initialAmount),
        monthlyAmountString: validateRecurringAmount(values.monthlyAmount),
        yearlyAmountString: validateRecurringAmount(values.yearlyAmount),
        growthString: validateGrowth(values.growth),
        yearCountString: validateYearCount(values.yearCount),
    };

    const set = (key: InvestmentsFormDataKeys, updatedValue: string) => {
        setInvestmentsFormData(mfd => void (mfd[key] = updatedValue));
        setDirty(d => void (d[key] = true));
    };

    const onValueChange = (key: InvestmentsFormDataKeys) => (values: NumberFormatValues) => set(key, values.value);

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3}}>
                <NumericFormat
                    label="Initial amount"
                    value={investmentsFormData.initialAmountString}
                    customInput={TextField}
                    onValueChange={onValueChange("initialAmountString")}
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
                    error={dirty.initialAmountString && !!errorMessages.initialAmountString}
                    helperText={dirty.initialAmountString && errorMessages.initialAmountString}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
                <NumericFormat
                    label="Monthly amount"
                    value={investmentsFormData.monthlyAmountString}
                    customInput={TextField}
                    onValueChange={onValueChange("monthlyAmountString")}
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
                    error={dirty.monthlyAmountString && !!errorMessages.monthlyAmountString}
                    helperText={dirty.monthlyAmountString && errorMessages.monthlyAmountString}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
                <NumericFormat
                    label="Yearly amount"
                    value={investmentsFormData.yearlyAmountString}
                    customInput={TextField}
                    onValueChange={onValueChange("yearlyAmountString")}
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
                    error={dirty.yearlyAmountString && !!errorMessages.yearlyAmountString}
                    helperText={dirty.yearlyAmountString && errorMessages.yearlyAmountString}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <NumericFormat
                    label="Annual growth"
                    value={investmentsFormData.growthString}
                    customInput={TextField}
                    onValueChange={onValueChange("growthString")}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="growth"
                    slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
                    fullWidth
                    error={dirty.growthString && !!errorMessages.growthString}
                    helperText={dirty.growthString && errorMessages.growthString}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <NumericFormat
                    label="Years"
                    value={investmentsFormData.yearCountString}
                    customInput={TextField}
                    onValueChange={onValueChange("yearCountString")}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="yearCount"
                    fullWidth
                    error={dirty.yearCountString && !!errorMessages.yearCountString}
                    helperText={dirty.yearCountString && errorMessages.yearCountString}
                />
            </Grid>
        </Grid>
    );
}

export default InvestmentsForm;
