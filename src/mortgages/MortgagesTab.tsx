import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {Updater} from "use-immer";
import InvalidInputAlert from "../InvalidInputAlert.tsx";
import {validateMortgage} from "../validate.ts";
import {calculate} from "./calculate.ts";
import {MortgagesFormData} from "./models.ts";
import MortgagesForm from "./MortgagesForm.tsx";
import MortgagesTable from "./MortgagesTable.tsx";

type MortgagesTabProps = {
    mortgageFormData: MortgagesFormData;
    setMortgageFormData: Updater<MortgagesFormData>;
};

function MortgagesTab({ mortgageFormData, setMortgageFormData }: MortgagesTabProps) {
    const borrowedAmount = parseFloat(mortgageFormData.borrowedAmountString);
    const years = parseInt(mortgageFormData.yearsString);
    const monthlyRepayment = parseFloat(mortgageFormData.monthlyRepaymentString);
    const monthlyOverpayment = parseFloat(mortgageFormData.monthlyOverpaymentString);
    const interestRate = parseFloat(mortgageFormData.interestRateString);
    const overpaymentLimit = parseFloat(mortgageFormData.overpaymentLimitString);
    const overpaymentFee = parseFloat(mortgageFormData.overpaymentFeeString);

    const valid = validateMortgage(
        borrowedAmount,
        years,
        monthlyRepayment,
        monthlyOverpayment,
        interestRate,
        overpaymentLimit,
        overpaymentFee,
    );

    const yearsData = valid ? calculate({
        borrowedAmount,
        years,
        monthlyRepayment,
        monthlyOverpayment,
        interestRate: interestRate / 100,
        overpaymentLimit: overpaymentLimit / 100,
        overpaymentFee: overpaymentFee / 100,
    }) : null;

    // todo disclaimer
    return (
        <Stack spacing={4}>
            <Stack spacing={2}>
                <MortgagesForm mortgageFormData={mortgageFormData} setMortgageFormData={setMortgageFormData} />

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
