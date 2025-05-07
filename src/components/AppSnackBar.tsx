import { Alert, Snackbar } from "@mui/material";

export default function AppSnackbar({open, onClose, severity, message} : {
    open: boolean;
    onClose: () => void;
    severity: "success" | "error" | "info" | "warning";
    message: string;
}) {

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
        <Alert severity={severity} onClose={onClose} variant="filled">
            {message}
        </Alert>
        </Snackbar>
  );
}    
