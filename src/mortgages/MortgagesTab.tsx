import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {Updater} from "use-immer";
import InvalidInputAlert from "../InvalidInputAlert.tsx";
import {validateMortgage} from "../validate.ts";
import {calculate} from "./calculate.ts";
import {MortgageFormData} from "./models.ts";
import MortgagesForm from "./MortgagesForm.tsx";
import MortgagesTable from "./MortgagesTable.tsx";

type MortgagesTabProps = {
    mortgageFormData: MortgageFormData;
    setMortgageFormData: Updater<MortgageFormData>;
};

function MortgagesTab({ mortgageFormData, setMortgageFormData }: MortgagesTabProps) {
    const borrowedAmount = parseFloat(mortgageFormData.borrowedAmountString);
    const years = parseInt(mortgageFormData.yearsString);
    const monthlyRepayment = parseFloat(mortgageFormData.monthlyRepaymentString);
    const monthlyOverpayment = parseFloat(mortgageFormData.monthlyOverpaymentString);
    const initialInterestRate = parseFloat(mortgageFormData.initialInterestRateString);
    const initialInterestRateYears = parseInt(mortgageFormData.initialInterestRateYearsString);
    const subsequentInterestRate = parseFloat(mortgageFormData.subsequentInterestRateString);
    const overpaymentLimit = parseFloat(mortgageFormData.overpaymentLimitString);
    const overpaymentFee = parseFloat(mortgageFormData.overpaymentFeeString);

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
                    borrowedAmountString={mortgageFormData.borrowedAmountString}
                    yearsString={mortgageFormData.yearsString}
                    monthlyRepaymentString={mortgageFormData.monthlyRepaymentString}
                    monthlyOverpaymentString={mortgageFormData.monthlyOverpaymentString}
                    initialInterestRateString={mortgageFormData.initialInterestRateString}
                    initialInterestRateYearsString={mortgageFormData.initialInterestRateYearsString}
                    subsequentInterestRateString={mortgageFormData.subsequentInterestRateString}
                    overpaymentLimitString={mortgageFormData.overpaymentLimitString}
                    overpaymentFeeString={mortgageFormData.overpaymentFeeString}
                    setBorrowedAmountString={v => setMortgageFormData(mfd => void (mfd.borrowedAmountString = v))}
                    setYearsString={v => setMortgageFormData(mfd => void (mfd.yearsString = v))}
                    setMonthlyRepaymentString={v => setMortgageFormData(mfd => void (mfd.monthlyRepaymentString = v))}
                    setMonthlyOverpaymentString={v => setMortgageFormData(mfd => void (mfd.monthlyOverpaymentString = v))}
                    setInitialInterestRateString={v => setMortgageFormData(mfd => void (mfd.initialInterestRateString = v))}
                    setInitialInterestRateYearsString={v => setMortgageFormData(mfd => void (mfd.initialInterestRateYearsString = v))}
                    setSubsequentInterestRateString={v => setMortgageFormData(mfd => void (mfd.subsequentInterestRateString = v))}
                    setOverpaymentLimitString={v => setMortgageFormData(mfd => void (mfd.overpaymentLimitString = v))}
                    setOverpaymentFeeString={v => setMortgageFormData(mfd => void (mfd.overpaymentFeeString = v))}
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
