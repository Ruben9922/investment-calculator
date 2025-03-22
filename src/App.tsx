import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {Backdrop, Box, CircularProgress, Container, Tab, useMediaQuery} from "@mui/material";
import {blue, grey, pink} from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {createContext, useEffect, useMemo, useState} from "react";
import useDarkMode from "use-dark-mode";
import {useFetch} from "use-http";
import {useImmer} from "use-immer";
import Header from "./Header.tsx";
import InvestmentsTab from "./investments/InvestmentsTab.tsx";
import {InvestmentsFormData} from "./investments/models.ts";
import {MortgagesFormData} from "./mortgages/models.ts";
import MortgagesTab from "./mortgages/MortgagesTab.tsx";

type FetchCurrencyResult = {
    currencies: Record<string, { name: string, symbol: string }>;
};

type TabValue = "investments" | "mortgages";

const defaultCurrency: string = "$";
export const CurrencyContext = createContext(defaultCurrency);

const initialInvestmentsFormData: InvestmentsFormData = {
    initialAmountString: "20000",
    monthlyAmountString: "500",
    yearlyAmountString: "0",
    growthString: "10",
    yearCountString: "50",
}

const initialMortgagesFormData: MortgagesFormData = {
    borrowedAmountString: "",
    yearsString: "",
    monthlyRepaymentString: "",
    monthlyOverpaymentString: "",
    initialInterestRateString: "",
    initialInterestRateYearsString: "",
    subsequentInterestRateString: "",
    overpaymentLimitString: "",
    overpaymentFeeString: ""
};

function App() {
    const { loading, get, response } = useFetch<FetchCurrencyResult>("https://restcountries.com", {}, []);
    const [currency, setCurrency] = useState(defaultCurrency);

    const [investmentsFormData, setInvestmentsFormData] = useImmer(initialInvestmentsFormData);
    const [mortgagesFormData, setMortgagesFormData] = useImmer(initialMortgagesFormData);

    useEffect(() => {
        (async () => {
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
        })();
    }, [get, response.ok]);

    // todo add routing so selecting tab updates URL
    const [selectedTab, setSelectedTab] = useState<TabValue>("investments");

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
                        <TabContext value={selectedTab}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList
                                    onChange={(_, value) => setSelectedTab(value)}
                                    aria-label="Investment calculator / mortgage calculator tabs"
                                >
                                    <Tab label="Investments" value="investments" />
                                    <Tab label="Mortgages" value="mortgages" />
                                </TabList>
                            </Box>
                            <TabPanel value="investments">
                                {/*    todo remove default tabpanel padding*/}
                                <InvestmentsTab
                                    investmentsFormData={investmentsFormData}
                                    setInvestmentsFormData={setInvestmentsFormData}
                                />
                            </TabPanel>
                            <TabPanel value="mortgages">
                                <MortgagesTab
                                    mortgageFormData={mortgagesFormData}
                                    setMortgageFormData={setMortgagesFormData}
                                />
                            </TabPanel>
                        </TabContext>
                    </Container>
                </CurrencyContext.Provider>
            )}
        </ThemeProvider>
    );
}

export default App;
