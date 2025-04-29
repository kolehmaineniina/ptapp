import { Button, Drawer, Typography } from "@mui/material";
import { Customer, Training } from "../api/types";
import { useNavigate } from "react-router-dom";
import TrainingsList from "./TrainingList";

export default function CustomerDrawer({open, onClose, onDelete, customer, trainings}: {
    anchor: string;
    open: boolean;
    onClose: () => void;
    onDelete: (customer: Customer) => void;
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
                <TrainingsList trainings={trainings} onDelete={onClose} showDelete={false}/>
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
                <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={() => onDelete(customer)}
                >Delete Customer
                </Button>
            </div>
        </Drawer>
    )
}