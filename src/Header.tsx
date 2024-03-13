import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {blue} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Toolbar from '@mui/material/Toolbar';
import Tooltip from "@mui/material/Tooltip";
import Typography from '@mui/material/Typography';

type HeaderProps = {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={theme => ({
                backgroundColor: theme.palette.mode === "light" ? theme.palette.primary.main : blue[800],
                backgroundImage: "none",
            })}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Investment Calculator
                    </Typography>
                    <Tooltip title="Go to main website">
                        <IconButton aria-label="home" href="https://rubendougall.co.uk/" color="inherit">
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="GitHub repository">
                        <IconButton aria-label="GitHub" href="https://github.com/Ruben9922/investment-calculator" color="inherit">
                            <GitHubIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}>
                        <IconButton aria-label="GitHub" onClick={toggleDarkMode} color="inherit">
                            {isDarkMode ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
