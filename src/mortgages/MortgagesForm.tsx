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
    interestRateString: string;
    overpaymentLimitString: string;
    overpaymentFeeString: string;
    setBorrowedAmountString: (updatedBorrowedAmountString: string) => void;
    setYearsString: (updatedYearsString: string) => void;
    setMonthlyRepaymentString: (updatedMonthlyRepaymentString: string) => void;
    setMonthlyOverpaymentString: (updatedMonthlyOverpaymentString: string) => void;
    setInterestRateString: (updatedInterestRateString: string) => void;
    setOverpaymentLimitString: (updatedOverpaymentLimitString: string) => void;
    setOverpaymentFeeString: (updatedOverpaymentFeeString: string) => void;
};

function MortgagesForm({
    borrowedAmountString,
    yearsString,
    monthlyRepaymentString,
    monthlyOverpaymentString,
    interestRateString,
    overpaymentLimitString,
    overpaymentFeeString,
    setBorrowedAmountString,
    setYearsString,
    setMonthlyRepaymentString,
    setMonthlyOverpaymentString,
    setInterestRateString,
    setOverpaymentLimitString,
    setOverpaymentFeeString,
}: MortgagesFormProps) {
    const currency = useContext(CurrencyContext);

    const borrowedAmount = parseFloat(borrowedAmountString);
    const years = parseInt(yearsString);
    const monthlyRepayment = parseFloat(monthlyRepaymentString);
    const monthlyOverpayment = parseFloat(monthlyOverpaymentString);
    const interestRate = parseFloat(interestRateString);
    const overpaymentLimit = parseFloat(overpaymentLimitString);
    const overpaymentFee = parseFloat(overpaymentFeeString);

    const borrowedAmountErrorMessage = validateInitialAmount(borrowedAmount);
    const yearsErrorMessage = validateYearCount(years);
    const monthlyRepaymentErrorMessage = validateRecurringAmount(monthlyRepayment);
    const monthlyOverpaymentErrorMessage = validateRecurringAmount(monthlyOverpayment);
    const interestRateErrorMessage = validateInterestRate(interestRate);
    const overpaymentLimitErrorMessage = validatePercentMin0Max100(overpaymentLimit);
    const overpaymentFeeErrorMessage = validatePercentMin0Max100(overpaymentFee);

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
                    label="Interest rate"
                    value={interestRateString}
                    customInput={TextField}
                    onValueChange={values => setInterestRateString(values.value)}
                    thousandSeparator
                    valueIsNumericString
                    decimalScale={0}

                    name="interestRate"
                    slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
                    fullWidth
                    error={!!interestRateErrorMessage}
                    helperText={interestRateErrorMessage}
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
