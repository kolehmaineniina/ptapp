import { Avatar, Button, Divider, Drawer, Stack, Typography } from "@mui/material";
import { Customer, Training } from "../api/types";
import { useNavigate } from "react-router-dom";
import TrainingsList from "./TrainingList";
import { Close } from "@mui/icons-material";

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
            <Stack sx={{width:350, px:4}} spacing={2}>
                <Button
                    startIcon={<Close/>}
                    onClick={onClose}
                    sx={{alignSelf:"flex-start"}}
                ></Button>
                <Stack spacing={1} alignItems="center">
                    <Avatar sx={{ width: 80, height: 80 }}>
                        {customer.firstname.charAt(0)}{customer.lastname.charAt(0)}
                    </Avatar>
                    <Typography variant="h6">{customer.firstname} {customer.lastname}</Typography>
                    <Typography variant="body2">ID: {customer.id}</Typography>
                </Stack>
                <Divider />
                <Stack>
                    <Typography variant="h5">Trainings</Typography>
                    <TrainingsList trainings={trainings} onDelete={onClose} showDelete={false}/>
                </Stack>
                <Divider/>
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    onClick={() => navigate(`/customers/${customer.id}`)}
                >View Full Profile
                </Button>
            </Stack>
        </Drawer>
    )
}