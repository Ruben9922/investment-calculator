import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {Updater} from "use-immer";
import InvalidInputAlert from "../InvalidInputAlert.tsx";
import {validate} from "../validate.ts";
import {calculate} from "./calculate.ts";
import InvestmentsChart from "./InvestmentsChart.tsx";
import InvestmentsForm from "./InvestmentsForm.tsx";
import InvestmentsTable from "./InvestmentsTable.tsx";
import {InvestmentsFormData} from "./models.ts";

type InvestmentsTabProps = {
    investmentsFormData: InvestmentsFormData;
    setInvestmentsFormData: Updater<InvestmentsFormData>;
};

function InvestmentsTab({ investmentsFormData, setInvestmentsFormData }: InvestmentsTabProps) {
    const [isAlertShown, setIsAlertShown] = useState(true);

    const initialAmount = parseFloat(investmentsFormData.initialAmountString);
    const monthlyAmount = parseFloat(investmentsFormData.monthlyAmountString);
    const yearlyAmount = parseFloat(investmentsFormData.yearlyAmountString);
    const growth = parseFloat(investmentsFormData.growthString);
    const yearCount = parseInt(investmentsFormData.yearCountString);

    const valid = validate(initialAmount, monthlyAmount, yearlyAmount, growth, yearCount);

    const yearsData = valid ? calculate({
        initialAmount,
        monthlyAmount,
        yearlyAmount,
        growth: growth / 100,
        yearCount,
    }) : null;

    return (
        <Stack spacing={4}>
            {isAlertShown && (
                <Alert severity="warning" onClose={() => setIsAlertShown(false)}>
                    <AlertTitle>Disclaimer</AlertTitle>
                    This is for indicative purposes only and should not be used as the basis for any investment decision. The data shown is purely hypothetical, based on the parameters entered, and does not necessarily reflect real-world investing. It does not take into account inflation, taxes, fees or other factors that may affect the value of your investment. I do not make any guarantees regarding the accuracy of the data shown.
                </Alert>
            )}

            <Stack spacing={2}>
                <InvestmentsForm
                    initialAmountString={investmentsFormData.initialAmountString}
                    monthlyAmountString={investmentsFormData.monthlyAmountString}
                    yearlyAmountString={investmentsFormData.yearlyAmountString}
                    growthString={investmentsFormData.growthString}
                    yearCountString={investmentsFormData.yearCountString}
                    setInitialAmountString={v => setInvestmentsFormData(ifd => void (ifd.initialAmountString = v))}
                    setMonthlyAmountString={v => setInvestmentsFormData(ifd => void (ifd.monthlyAmountString = v))}
                    setYearlyAmountString={v => setInvestmentsFormData(ifd => void (ifd.yearlyAmountString = v))}
                    setGrowthString={v => setInvestmentsFormData(ifd => void (ifd.growthString = v))}
                    setYearCountString={v => setInvestmentsFormData(ifd => void (ifd.yearCountString = v))}
                />

                <Typography align="center" variant="body2">
                    Growth is compounding and calculated monthly, based on the annual growth specified.
                </Typography>
            </Stack>

            {valid ? (
                <>
                    <InvestmentsChart yearsData={yearsData!} />
                    <InvestmentsTable yearsData={yearsData!} />
                </>
            ) : <InvalidInputAlert />}
        </Stack>
    );
}

export default InvestmentsTab;
