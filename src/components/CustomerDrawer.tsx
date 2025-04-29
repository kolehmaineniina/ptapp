import { Button, Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Customer, Training } from "../api/types";
import { useNavigate } from "react-router-dom";
import TrainingsList from "./TrainingList";

export default function CustomerDrawer({open, onClose, customer, trainings}: {
    anchor: string;
    open: boolean;
    onClose: () => void;
    customer: Customer;
    trainings: Training[];
    isLoading: boolean;
    error: Error | null }) {

    const navigate = useNavigate();

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <div style={{ width: 400, padding: "1rem" }}>
                <Typography variant='subtitle1'>{customer.firstname} {customer.lastname}</Typography>
                <Typography variant="h5">
                    Trainings
                </Typography>
                <TrainingsList trainings={trainings} onDelete={onClose}/>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    style={{ marginTop: "1rem" }}
                    fullWidth
                >Close
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    style={{ marginTop: "1rem" }}
                    fullWidth
                    onClick={() => navigate(`/customers/${customer.id}`)}
                >View Full Profile
                </Button>
            </div>
        </Drawer>
    )
}