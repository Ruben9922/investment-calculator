import Grid from "@mui/material/Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import {useContext} from "react";
import {NumericFormat} from "react-number-format";
import {CurrencyContext} from "../App.tsx";
import {
    validateInitialAmount,
    validateInterestRate,
    validatePercentMin0Max100,
    validateRecurringAmount,
    validateYearCount
} from "../validate.ts";

type MortgagesFormProps = {
    borrowedAmountString: string;
    yearsString: string;
    monthlyRepaymentString: string;
    monthlyOverpaymentString: string;
    initialInterestRateString: string;
    initialInterestRateYearsString: string;
    subsequentInterestRateString: string;
    overpaymentLimitString: string;
    overpaymentFeeString: string;
    setBorrowedAmountString: (updatedBorrowedAmountString: string) => void;
    setYearsString: (updatedYearsString: string) => void;
    setMonthlyRepaymentString: (updatedMonthlyRepaymentString: string) => void;
    setMonthlyOverpaymentString: (updatedMonthlyOverpaymentString: string) => void;
    setInitialInterestRateString: (updatedInitialInterestRateString: string) => void;
    setInitialInterestRateYearsString: (updatedInitialInterestRateYearsString: string) => void;
    setSubsequentInterestRateString: (updatedSubsequentInterestRateString: string) => void;
    setOverpaymentLimitString: (updatedOverpaymentLimitString: string) => void;
    setOverpaymentFeeString: (updatedOverpaymentFeeString: string) => void;
};

function MortgagesForm({
    borrowedAmountString,
    yearsString,
    monthlyRepaymentString,
    monthlyOverpaymentString,
    initialInterestRateString,
    initialInterestRateYearsString,
    subsequentInterestRateString,
    overpaymentLimitString,
    overpaymentFeeString,
    setBorrowedAmountString,
    setYearsString,
    setMonthlyRepaymentString,
    setMonthlyOverpaymentString,
    setInitialInterestRateString,
    setInitialInterestRateYearsString,
    setSubsequentInterestRateString,
    setOverpaymentLimitString,
    setOverpaymentFeeString,
}: MortgagesFormProps) {
    const currency = useContext(CurrencyContext);

    const borrowedAmount = parseFloat(borrowedAmountString);
    const years = parseInt(yearsString);
    const monthlyRepayment = parseFloat(monthlyRepaymentString);
    const monthlyOverpayment = parseFloat(monthlyOverpaymentString);
    const initialInterestRate = parseFloat(initialInterestRateString);
    const initialInterestRateYears = parseInt(initialInterestRateYearsString);
    const subsequentInterestRate = parseFloat(subsequentInterestRateString);
    const overpaymentLimit = parseFloat(overpaymentLimitString);
    const overpaymentFee = parseFloat(overpaymentFeeString);

    const borrowedAmountErrorMessage = validateInitialAmount(borrowedAmount);
    const yearsErrorMessage = validateYearCount(years);
    const monthlyRepaymentErrorMessage = validateRecurringAmount(monthlyRepayment);
    const monthlyOverpaymentErrorMessage = validateRecurringAmount(monthlyOverpayment);
    const initialInterestRateErrorMessage = validateInterestRate(initialInterestRate);
    const initialInterestRateYearsErrorMessage = validateYearCount(initialInterestRateYears);
    const subsequentInterestRateErrorMessage = validateInterestRate(subsequentInterestRate);
    const overpaymentLimitErrorMessage = validatePercentMin0Max100(overpaymentLimit);
    const overpaymentFeeErrorMessage = validatePercentMin0Max100(overpaymentFee);

    // todo: just use a single interest rate, otherwise it's just overcomplicating things
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3}}>
                <NumericFormat
                    label="Borrowed amount"
                    value={borrowedAmountString}
                    customInput={TextField}
                    onValueChange={values => setBorrowedAmountString(values.value)}
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
                    error={!!borrowedAmountErrorMessage}
                    helperText={borrowedAmountErrorMessage}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <NumericFormat
                    label="Years"
                    value={yearsString}
                    customInput={TextField}
                    onValueChange={values => setYearsString(values.value)}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="years"
                    fullWidth
                    error={!!yearsErrorMessage}
                    helperText={yearsErrorMessage}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
                <NumericFormat
                    label="Monthly repayment"
                    value={monthlyRepaymentString}
                    customInput={TextField}
                    onValueChange={values => setMonthlyRepaymentString(values.value)}
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
                    error={!!monthlyRepaymentErrorMessage}
                    helperText={monthlyRepaymentErrorMessage}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
                <NumericFormat
                    label="Monthly overpayment"
                    value={monthlyOverpaymentString}
                    customInput={TextField}
                    onValueChange={values => setMonthlyOverpaymentString(values.value)}
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
                    error={!!monthlyOverpaymentErrorMessage}
                    helperText={monthlyOverpaymentErrorMessage}
                />
            </Grid>
            {/* todo allow decimal interest rates (2 d.p.) */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <NumericFormat
                    label="Initial interest rate"
                    value={initialInterestRateString}
                    customInput={TextField}
                    onValueChange={values => setInitialInterestRateString(values.value)}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="initialInterestRate"
                    slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
                    fullWidth
                    error={!!initialInterestRateErrorMessage}
                    helperText={initialInterestRateErrorMessage}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <NumericFormat
                    label="Initial interest rate period (yrs)"
                    value={initialInterestRateYearsString}
                    customInput={TextField}
                    onValueChange={values => setInitialInterestRateYearsString(values.value)}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="initialInterestRateYears"
                    slotProps={{ input: { endAdornment: <InputAdornment position="end">yrs</InputAdornment> } }}
                    fullWidth
                    error={!!initialInterestRateYearsErrorMessage}
                    helperText={initialInterestRateYearsErrorMessage}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <NumericFormat
                    label="Subsequent interest rate"
                    value={subsequentInterestRateString}
                    customInput={TextField}
                    onValueChange={values => setSubsequentInterestRateString(values.value)}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="subsequentInterestRate"
                    slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
                    fullWidth
                    error={!!subsequentInterestRateErrorMessage}
                    helperText={subsequentInterestRateErrorMessage}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <NumericFormat
                    label="Overpayment limit"
                    value={overpaymentLimitString}
                    customInput={TextField}
                    onValueChange={values => setOverpaymentLimitString(values.value)}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="overpaymentLimit"
                    slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
                    fullWidth
                    error={!!overpaymentLimitErrorMessage}
                    helperText={overpaymentLimitErrorMessage}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <NumericFormat
                    label="Overpayment fee"
                    value={overpaymentFeeString}
                    customInput={TextField}
                    onValueChange={values => setOverpaymentFeeString(values.value)}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="overpaymentFee"
                    slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
                    fullWidth
                    error={!!overpaymentFeeErrorMessage}
                    helperText={overpaymentFeeErrorMessage}
                />
            </Grid>
        </Grid>
    );
}

export default MortgagesForm;
