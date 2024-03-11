import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import Toolbar from '@mui/material/Toolbar';
import Tooltip from "@mui/material/Tooltip";
import Typography from '@mui/material/Typography';

function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
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
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
