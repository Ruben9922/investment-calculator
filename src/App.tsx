import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {Backdrop, Box, CircularProgress, Container, Popover, Tab, useMediaQuery} from "@mui/material";
import Alert from "@mui/material/Alert";
import {blue, grey, pink} from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, {createContext, useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
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
    const [selectedTab, setSelectedTab] = useState<TabValue>("investments");
    const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLButtonElement | null>(null);

    const [investmentsFormData, setInvestmentsFormData] = useImmer(initialInvestmentsFormData);
    const [mortgagesFormData, setMortgagesFormData] = useImmer(initialMortgagesFormData);

    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const query = useMemo(() => new URLSearchParams(search), [search]);

    useEffect(() => {
        switch (pathname) {
            case "/investments": {
                setSelectedTab("investments");
                // todo: maybe do this in a more elegant way
                if (query.has("initialAmount") && query.has("monthlyAmount") && query.has("yearlyAmount")
                    && query.has("growth") && query.has("yearCount")) {
                    setInvestmentsFormData({
                        initialAmountString: query.get("initialAmount") ?? "",
                        monthlyAmountString: query.get("monthlyAmount") ?? "",
                        yearlyAmountString: query.get("yearlyAmount") ?? "",
                        growthString: query.get("growth") ?? "",
                        yearCountString: query.get("yearCount") ?? "",
                    });
                }
                break;
            }
            case "/mortgages": {
                setSelectedTab("mortgages");
                // todo: maybe do this in a more elegant way
                if (query.has("borrowedAmount") && query.has("years") && query.has("monthlyRepayment")
                    && query.has("monthlyOverpayment") && query.has("initialInterestRate")
                    && query.has("initialInterestRateYears") && query.has("subsequentInterestRate")
                    && query.has("overpaymentLimit") && query.has("overpaymentFee"))
                setMortgagesFormData({
                    borrowedAmountString: query.get("borrowedAmount") ?? "",
                    yearsString: query.get("years") ?? "",
                    monthlyRepaymentString: query.get("monthlyRepayment") ?? "",
                    monthlyOverpaymentString: query.get("monthlyOverpayment") ?? "",
                    initialInterestRateString: query.get("initialInterestRate") ?? "",
                    initialInterestRateYearsString: query.get("initialInterestRateYears") ?? "",
                    subsequentInterestRateString: query.get("subsequentInterestRate") ?? "",
                    overpaymentLimitString: query.get("overpaymentLimit") ?? "",
                    overpaymentFeeString: query.get("overpaymentFee") ?? "",
                });
                break;
            }
        }
    }, [pathname, query, setInvestmentsFormData, setMortgagesFormData]);

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

    const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPopoverAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setPopoverAnchorEl(null);
    };

    const popoverOpen = Boolean(popoverAnchorEl);
    const popoverId = popoverOpen ? "simple-popover" : undefined;

    const constructShareUrl = (): string => {
        let paramsObj: Record<string, string> = selectedTab === "mortgages"
            ? mortgagesFormData
            : investmentsFormData;
        // Remove "string" suffix from property names
        paramsObj = Object.fromEntries(Object.entries(paramsObj).map(([k, v]) => [k.replace("String", ""), v]));
        return `${window.location.origin}/projects/investment-calculator/${selectedTab}?${new URLSearchParams(paramsObj)}`;
    };

    const copyShareUrlToClipboard = (): void => void navigator.clipboard.writeText(constructShareUrl());

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
                            <Stack direction="row">
                                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                    <TabList
                                        onChange={(_, value) => navigate(`/${value}`)}
                                        aria-label="Investment calculator / mortgage calculator tabs"
                                    >
                                        <Tab label="Investments" value="investments" />
                                        <Tab label="Mortgages" value="mortgages" />
                                    </TabList>
                                </Box>
                                <Tooltip title="Share">
                                    <IconButton
                                        aria-describedby={popoverId}
                                        onClick={handlePopoverClick}
                                        aria-label="share"
                                    >
                                        <ShareIcon />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
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
                        <Popover
                            id={popoverId}
                            open={popoverOpen}
                            anchorEl={popoverAnchorEl}
                            onClose={handlePopoverClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                        >
                            <Stack paddingX={4} paddingY={3} spacing={2} maxWidth="500px">
                                <Typography gutterBottom>
                                    Copy a URL to share as an example or save for later.
                                </Typography>
                                <Stack direction="row">
                                    <TextField
                                        disabled
                                        label="Share URL"
                                        value={constructShareUrl()}
                                    />
                                    <Tooltip title="Copy URL">
                                        <IconButton
                                            onClick={copyShareUrlToClipboard}
                                            aria-label="copy"
                                        >
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                                <Alert severity="warning"><strong>Anyone with this URL can view all the values entered</strong>; this may be private info so be careful who you share this with!</Alert>
                            </Stack>
                        </Popover>
                    </Container>
                </CurrencyContext.Provider>
            )}
        </ThemeProvider>
    );
}

export default App;
