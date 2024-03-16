import {Box, Container, useMediaQuery} from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {blue, grey, pink} from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from '@mui/material/Stack';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useMemo, useState} from "react";
import useDarkMode from "use-dark-mode";
import Chart from "./Chart.tsx";
import Form from "./Form.tsx";
import Header from "./Header.tsx";
import Table from "./Table.tsx";

function App() {
    const [initialAmountString, setInitialAmountString] = useState("20000");
    const [recurringAmountString, setRecurringAmountString] = useState("500");
    const [growthString, setGrowthString] = useState("10");
    const [yearCountString, setYearCountString] = useState("50");
    const [isAlertShown, setIsAlertShown] = useState(true);

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    // Setting onChange to empty function to prevent default behaviour of automatically setting the <body> element's class
    const darkMode = useDarkMode(prefersDarkMode, { onChange: () => {} });

    const theme = useMemo(() =>
        createTheme({
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

                    <Chart
                        initialAmountString={initialAmountString}
                        recurringAmountString={recurringAmountString}
                        growthString={growthString}
                        yearCountString={yearCountString}
                    />

                    <Table
                        initialAmountString={initialAmountString}
                        recurringAmountString={recurringAmountString}
                        growthString={growthString}
                        yearCountString={yearCountString}
                    />
                </Stack>
            </Container>
        </ThemeProvider>
    );
}

export default App;
