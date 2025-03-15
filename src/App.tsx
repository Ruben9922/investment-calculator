import {Backdrop, Box, CircularProgress, Container, useMediaQuery} from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {blue, grey, pink} from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from '@mui/material/Stack';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {createContext, useEffect, useMemo, useState} from "react";
import useDarkMode from "use-dark-mode";
import {useFetch} from "use-http";
import {calculate} from "./calculate.ts";
import Chart from "./Chart.tsx";
import Form from "./Form.tsx";
import Header from "./Header.tsx";
import Table from "./Table.tsx";
import {validate} from "./validate.ts";

type FetchCurrencyResult = {
    currencies: Record<string, { name: string, symbol: string }>;
};

const defaultCurrency: string = "$";
export const CurrencyContext = createContext(defaultCurrency);

function App() {
    const { loading, get, response } = useFetch<FetchCurrencyResult>("https://restcountries.com", {}, []);
    const [currency, setCurrency] = useState(defaultCurrency);

    const getCurrency = async () => {
        const currentCountryAlpha2Code = navigator.language.split("-")[1]?.toLowerCase() ?? "";
        const fetchCurrencyResult = await get(`/v3.1/alpha/${encodeURIComponent(currentCountryAlpha2Code)}/?fields=currencies`);

        if (!response.ok) {
            return;
        }

        let updatedCurrency: string;
        if (!fetchCurrencyResult || !fetchCurrencyResult.currencies || Object.values(fetchCurrencyResult.currencies).length < 1) {
            updatedCurrency = defaultCurrency;
        } else {
            updatedCurrency = Object.values(fetchCurrencyResult.currencies)[0].symbol || defaultCurrency;
        }
        setCurrency(updatedCurrency);
    };

    useEffect(() => { void getCurrency(); }, []);

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

            {loading ? (
                <Backdrop open sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                <CurrencyContext.Provider value={currency}>
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

                            {valid ? (
                                <>
                                    <Chart yearsData={yearsData!} />
                                    <Table yearsData={yearsData!} />
                                </>
                            ) : (
                                <Alert severity="error">
                                    <AlertTitle>Invalid input</AlertTitle>
                                    Please fix the errors and try again.
                                </Alert>
                            )}
                        </Stack>
                    </Container>
                </CurrencyContext.Provider>
            )}
        </ThemeProvider>
    );
}

export default App;
