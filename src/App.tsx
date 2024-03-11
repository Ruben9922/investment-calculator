import {Box, Container} from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CssBaseline from "@mui/material/CssBaseline";
import Stack from '@mui/material/Stack';
import {useState} from "react";
import Form from "./Form.tsx";
import Header from "./Header.tsx";
import Table from "./Table.tsx";

function calculate(initialAmount: number, recurringAmount: number, growth: number, yearCount: number): number[] {
    const multiplier = 1 + growth;
    const monthlyMultiplier = multiplier ** (1 / 12);

    const valuesByYear: number[] = [];
    valuesByYear.push(initialAmount);
    for (let i = 1; i <= yearCount; i++) {
        let value = valuesByYear[i - 1];
        for (let j = 0; j < 12; j++) {
            value += recurringAmount;
            value *= monthlyMultiplier;
        }
        valuesByYear.push(value);
    }
    return valuesByYear;
}

function App() {
    const [initialAmountString, setInitialAmountString] = useState("20000");
    const [recurringAmountString, setRecurringAmountString] = useState("500");
    const [growthString, setGrowthString] = useState("10");
    const [yearCountString, setYearCountString] = useState("50");
    const [isAlertShown, setIsAlertShown] = useState(true);

    const initialAmount = parseFloat(initialAmountString);
    const recurringAmount = parseFloat(recurringAmountString);
    const growth = parseFloat(growthString) / 100;
    const yearCount = parseInt(yearCountString);
    const valuesByYear = calculate(initialAmount, recurringAmount, growth, yearCount);

    return (
        <>
            <CssBaseline />
            <Header />
            <Container maxWidth="md" component={Box} padding={4}>
                <Stack spacing={4}>
                    {isAlertShown && (
                        <Alert severity="warning" onClose={() => setIsAlertShown(false)}>
                            <AlertTitle>Disclaimer</AlertTitle>
                            This is for indicative purposes only and should not be used as the basis for any investment decision. The data shown is purely hypothetical, based on the parameters entered, and does not necessarily reflect real-world investing. It does not take into account inflation, taxes, fees or other factors that may affect the value of your investment. I do not make any guarantees regarding the accuracy of the data shown.
                        </Alert>
                    )}

                <Form
                    initialAmountString={initialAmountString}
                    recurringAmountString={recurringAmountString}
                    growthString={growthString}
                    yearCountString={yearCountString}
                    setInitialAmountString={setInitialAmountString}
                    setRecurringAmountString={setRecurringAmountString}
                    setGrowthString={setGrowthString}
                    setYearCountString={setYearCountString}
                />

                <Table valuesByYear={valuesByYear} />
                </Stack>
            </Container>
        </>
    );
}

export default App;
