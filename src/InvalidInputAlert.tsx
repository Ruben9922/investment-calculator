import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function InvalidInputAlert() {
    return (
        <Alert severity="error">
            <AlertTitle>Invalid input</AlertTitle>
            Please fix the errors and try again.
        </Alert>
    );
}

export default InvalidInputAlert;
