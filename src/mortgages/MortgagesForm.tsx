import Grid from "@mui/material/Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import {useContext} from "react";
import {NumberFormatValues, NumericFormat} from "react-number-format";
import {Updater, useImmer} from "use-immer";
import {CurrencyContext} from "../App.tsx";
import {
    validateInitialAmount,
    validateInterestRate,
    validatePercentMin0Max100,
    validateRecurringAmount,
    validateYearCount
} from "../validate.ts";
import {MortgagesFormData, MortgagesFormDataKeys, MortgagesInputs} from "./models.ts";

type MortgagesFormProps = {
    mortgageFormData: MortgagesFormData;
    setMortgageFormData: Updater<MortgagesFormData>;
};

const initialDirty: Record<MortgagesFormDataKeys, boolean> = {
    borrowedAmountString: false,
    yearsString: false,
    monthlyRepaymentString: false,
    monthlyOverpaymentString: false,
    interestRateString: false,
    overpaymentLimitString: false,
    overpaymentFeeString: false,
}

function MortgagesForm({ mortgageFormData, setMortgageFormData }: MortgagesFormProps) {
    const currency = useContext(CurrencyContext);

    const [dirty, setDirty] = useImmer(initialDirty);

    const values: MortgagesInputs = {
        borrowedAmount: parseFloat(mortgageFormData.borrowedAmountString),
        years: parseInt(mortgageFormData.yearsString),
        monthlyRepayment: parseFloat(mortgageFormData.monthlyRepaymentString),
        monthlyOverpayment: parseFloat(mortgageFormData.monthlyOverpaymentString),
        interestRate: parseFloat(mortgageFormData.interestRateString),
        overpaymentLimit: parseFloat(mortgageFormData.overpaymentLimitString),
        overpaymentFee: parseFloat(mortgageFormData.overpaymentFeeString),
    };

    const errorMessages: Record<MortgagesFormDataKeys, string | null> = {
        borrowedAmountString: validateInitialAmount(values.borrowedAmount),
        yearsString: validateYearCount(values.years),
        monthlyRepaymentString: validateRecurringAmount(values.monthlyRepayment),
        monthlyOverpaymentString: validateRecurringAmount(values.monthlyOverpayment),
        interestRateString: validateInterestRate(values.interestRate),
        overpaymentLimitString: validatePercentMin0Max100(values.overpaymentLimit),
        overpaymentFeeString: validatePercentMin0Max100(values.overpaymentFee),
    };

    const set = (key: MortgagesFormDataKeys, updatedValue: string) => {
        setMortgageFormData(mfd => void (mfd[key] = updatedValue));
        setDirty(d => void (d[key] = true));
    };

    const onValueChange = (key: MortgagesFormDataKeys) => (values: NumberFormatValues) => set(key, values.value);

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <NumericFormat
                    label="Borrowed amount"
                    value={mortgageFormData.borrowedAmountString}
                    customInput={TextField}
                    onValueChange={onValueChange("borrowedAmountString")}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="borrowedAmount"
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                        }
                    }}
                    fullWidth
                    error={dirty.borrowedAmountString && !!errorMessages.borrowedAmountString}
                    helperText={dirty.borrowedAmountString && errorMessages.borrowedAmountString}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <NumericFormat
                    label="Years"
                    value={mortgageFormData.yearsString}
                    customInput={TextField}
                    onValueChange={onValueChange("yearsString")}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="years"
                    fullWidth
                    error={dirty.yearsString && !!errorMessages.yearsString}
                    helperText={dirty.yearsString && errorMessages.yearsString}
                />
            </Grid>
            {/* todo allow decimal interest rates (2 d.p.) */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <NumericFormat
                    label="Interest rate"
                    value={mortgageFormData.interestRateString}
                    customInput={TextField}
                    onValueChange={onValueChange("interestRateString")}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="interestRate"
                    slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
                    fullWidth
                    error={dirty.interestRateString && !!errorMessages.interestRateString}
                    helperText={dirty.interestRateString && errorMessages.interestRateString}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <NumericFormat
                    label="Monthly repayment"
                    value={mortgageFormData.monthlyRepaymentString}
                    customInput={TextField}
                    onValueChange={onValueChange("monthlyRepaymentString")}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="monthlyRepayment"
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                        }
                    }}
                    fullWidth
                    error={dirty.monthlyRepaymentString && !!errorMessages.monthlyRepaymentString}
                    helperText={dirty.monthlyRepaymentString && errorMessages.monthlyRepaymentString}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <NumericFormat
                    label="Monthly overpayment"
                    value={mortgageFormData.monthlyOverpaymentString}
                    customInput={TextField}
                    onValueChange={onValueChange("monthlyOverpaymentString")}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="monthlyOverpayment"
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                        }
                    }}
                    fullWidth
                    error={dirty.monthlyOverpaymentString && !!errorMessages.monthlyOverpaymentString}
                    helperText={dirty.monthlyOverpaymentString && errorMessages.monthlyOverpaymentString}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <NumericFormat
                    label="Overpayment limit"
                    value={mortgageFormData.overpaymentLimitString}
                    customInput={TextField}
                    onValueChange={onValueChange("overpaymentLimitString")}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="overpaymentLimit"
                    slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
                    fullWidth
                    error={dirty.overpaymentLimitString && !!errorMessages.overpaymentLimitString}
                    helperText={dirty.overpaymentLimitString && errorMessages.overpaymentLimitString}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <NumericFormat
                    label="Overpayment fee"
                    value={mortgageFormData.overpaymentFeeString}
                    customInput={TextField}
                    onValueChange={onValueChange("overpaymentFeeString")}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="overpaymentFee"
                    slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
                    fullWidth
                    error={dirty.overpaymentFeeString && !!errorMessages.overpaymentFeeString}
                    helperText={dirty.overpaymentFeeString && errorMessages.overpaymentFeeString}
                />
            </Grid>
        </Grid>
    );
}

export default MortgagesForm;
