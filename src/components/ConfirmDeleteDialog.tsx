import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@mui/material';

export default function ConfirmationDialog({
    open,
    onClose,
    onConfirm,
    customerName
}: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    customerName: string;
}) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <DialogContentText variant='body1'>
                    Are you sure you wamt to delete customer<br />
                    <strong>{customerName}</strong>?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm} color="error" variant="outlined">Continue</Button>
            </DialogActions>
        </Dialog>
  );
}
