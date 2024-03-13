import {Box, Container, useMediaQuery} from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {blue, grey, pink} from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from '@mui/material/Stack';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useMemo, useState} from "react";
import useDarkMode from "use-dark-mode";
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

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    // Setting onChange to empty function to prevent default behaviour of automatically setting the <body> element's class
    const darkMode = useDarkMode(prefersDarkMode, { onChange: () => {} });

    const theme = useMemo(() =>
        createTheme({
            // palette: {
            //     mode: darkMode.value ? "dark" : "light",
            //     primary: {
            //         main: darkMode.value ? blue[800] : blue[900],
            //     },
            //     secondary: {
            //         main: darkMode.value ? pink[200] : "#dc004e",
            //     },
            // },

            palette: {
                mode: darkMode.value ? "dark" : "light",
                ...(darkMode.value ? {
                    primary: {
                        main: blue[200],
                    },
                    secondary: {
                        main: pink[200],
                    },
                    background: {
                        default: "#303030",
                        paper: "#424242",
                    },
                    text: {
                        primary: "#fff",
                        secondary: "rgba(255, 255, 255, 0.7)",
                    },
                    divider: grey[500],
                } : {
                    primary: {
                        main: blue[900],
                    },
                    secondary: {
                        main: "#dc004e",
                    },
                    background: {
                        default: "#fafafa",
                        paper: "#fff",
                    },
                    text: {
                        primary: "rgba(0, 0, 0, 0.87)",
                        secondary: "rgba(0, 0, 0, 0.54)",
                    },
                    // divider: grey[900],
                }),
            }
        }),
    [darkMode.value],
    );

    console.log(theme);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <Header isDarkMode={darkMode.value} toggleDarkMode={darkMode.toggle} />
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
        </ThemeProvider>
    );
}

export default App;
