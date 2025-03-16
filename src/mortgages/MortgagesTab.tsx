import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import InvalidInputAlert from "../InvalidInputAlert.tsx";
import {validateMortgage} from "../validate.ts";
import {calculate} from "./calculate.ts";
import MortgagesForm from "./MortgagesForm.tsx";
import MortgagesTable from "./MortgagesTable.tsx";

function MortgagesTab() {
    // todo move state up to parent so it persists when switching tabs
    const [borrowedAmountString, setBorrowedAmountString] = useState("");
    const [yearsString, setYearsString] = useState("");
    const [monthlyRepaymentString, setMonthlyRepaymentString] = useState("");
    const [monthlyOverpaymentString, setMonthlyOverpaymentString] = useState("");
    const [initialInterestRateString, setInitialInterestRateString] = useState("");
    const [initialInterestRateYearsString, setInitialInterestRateYearsString] = useState("");
    const [subsequentInterestRateString, setSubsequentInterestRateString] = useState("");
    const [overpaymentLimitString, setOverpaymentLimitString] = useState("");
    const [overpaymentFeeString, setOverpaymentFeeString] = useState("");

    const borrowedAmount = parseFloat(borrowedAmountString);
    const years = parseInt(yearsString);
    const monthlyRepayment = parseFloat(monthlyRepaymentString);
    const monthlyOverpayment = parseFloat(monthlyOverpaymentString);
    const initialInterestRate = parseFloat(initialInterestRateString);
    const initialInterestRateYears = parseInt(initialInterestRateYearsString);
    const subsequentInterestRate = parseFloat(subsequentInterestRateString);
    const overpaymentLimit = parseFloat(overpaymentLimitString);
    const overpaymentFee = parseFloat(overpaymentFeeString);

    const valid = validateMortgage(
        borrowedAmount,
        years,
        monthlyRepayment,
        monthlyOverpayment,
        initialInterestRate,
        initialInterestRateYears,
        subsequentInterestRate,
        overpaymentLimit,
        overpaymentFee,
    );

    const yearsData = valid ? calculate(
        borrowedAmount,
        years,
        monthlyRepayment,
        monthlyOverpayment,
        initialInterestRate / 100,
        initialInterestRateYears,
        subsequentInterestRate / 100,
        overpaymentLimit,
        overpaymentFee / 100,
    ) : null;

    // todo disclaimer
    return (
        <Stack spacing={4}>
            <Stack spacing={2}>
                <MortgagesForm
                    borrowedAmountString={borrowedAmountString}
                    yearsString={yearsString}
                    monthlyRepaymentString={monthlyRepaymentString}
                    monthlyOverpaymentString={monthlyOverpaymentString}
                    initialInterestRateString={initialInterestRateString}
                    initialInterestRateYearsString={initialInterestRateYearsString}
                    subsequentInterestRateString={subsequentInterestRateString}
                    overpaymentLimitString={overpaymentLimitString}
                    overpaymentFeeString={overpaymentFeeString}
                    setBorrowedAmountString={setBorrowedAmountString}
                    setYearsString={setYearsString}
                    setMonthlyRepaymentString={setMonthlyRepaymentString}
                    setMonthlyOverpaymentString={setMonthlyOverpaymentString}
                    setInitialInterestRateString={setInitialInterestRateString}
                    setInitialInterestRateYearsString={setInitialInterestRateYearsString}
                    setSubsequentInterestRateString={setSubsequentInterestRateString}
                    setOverpaymentLimitString={setOverpaymentLimitString}
                    setOverpaymentFeeString={setOverpaymentFeeString}
                />

                <Typography align="center" variant="body2">
                    Interest is compounding and calculated monthly, based on the annual interest rates specified.
                </Typography>

                {valid ? (
                    <>
                        <MortgagesTable yearsData={yearsData!}/>
                    </>
                ) : <InvalidInputAlert />}
            </Stack>
        </Stack>
    );
}

export default MortgagesTab;
