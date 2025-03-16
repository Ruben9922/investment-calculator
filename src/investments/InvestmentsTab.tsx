import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import InvalidInputAlert from "../InvalidInputAlert.tsx";
import {calculate} from "./calculate.ts";
import {validate} from "../validate.ts";
import InvestmentsChart from "./InvestmentsChart.tsx";
import InvestmentsForm from "./InvestmentsForm.tsx";
import InvestmentsTable from "./InvestmentsTable.tsx";

function InvestmentsTab() {
    // todo move state up to parent so it persists when switching tabs
    const [initialAmountString, setInitialAmountString] = useState("20000");
    const [monthlyAmountString, setMonthlyAmountString] = useState("500");
    const [yearlyAmountString, setYearlyAmountString] = useState("0");
    const [growthString, setGrowthString] = useState("10");
    const [yearCountString, setYearCountString] = useState("50");
    const [isAlertShown, setIsAlertShown] = useState(true);

    const initialAmount = parseFloat(initialAmountString);
    const monthlyAmount = parseFloat(monthlyAmountString);
    const yearlyAmount = parseFloat(yearlyAmountString);
    const growth = parseFloat(growthString);
    const yearCount = parseInt(yearCountString);

    const valid = validate(initialAmount, monthlyAmount, yearlyAmount, growth, yearCount);

    const yearsData = valid ? calculate(initialAmount, monthlyAmount, yearlyAmount, growth / 100, yearCount) : null;

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
                    initialAmountString={initialAmountString}
                    monthlyAmountString={monthlyAmountString}
                    yearlyAmountString={yearlyAmountString}
                    growthString={growthString}
                    yearCountString={yearCountString}
                    setInitialAmountString={setInitialAmountString}
                    setMonthlyAmountString={setMonthlyAmountString}
                    setYearlyAmountString={setYearlyAmountString}
                    setGrowthString={setGrowthString}
                    setYearCountString={setYearCountString}
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
