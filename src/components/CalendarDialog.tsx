import { Box, Button, Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { Customer, TrainingToPost } from "../types";
import TrainingForm from "./TrainingForm";
import dayjs from "dayjs";

export default function CalendarDialog({ customers, newTraining, selectedDate, open, onClose, onSubmit, onChange}: {
    customers: Customer[];
    newTraining: TrainingToPost;
    selectedDate: Date | null;
    open: boolean;
    onClose: () => void;
    onSubmit: (training: TrainingToPost) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent) => void;
}) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        onSubmit(newTraining);
                    } 
                }
            }}
        >
        
        <DialogContent>
            <Stack sx={{width: 250}} spacing={2}>
                <FormControl>
                    <InputLabel>Select Customer</InputLabel>
                    <Select
                        name="customer"
                        value={newTraining.customer ?? ""}
                        onChange={onChange}
                        required
                        fullWidth
                    > {customers.map((c: Customer)=> (
                        <MenuItem key={c.id} value={`https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${c.id}`}>
                            {c.firstname} {c.lastname}
                        </MenuItem>
                    ))}
                    </Select>
                    </FormControl>
                    <TrainingForm
                        training={{
                            ...newTraining,
                            date: selectedDate ? dayjs(selectedDate).toISOString() : ""
                        }}
                        onChange={onChange}
                    />
                    <Button variant="contained" type="submit" disabled={!newTraining.date || !newTraining.activity || Number(newTraining.duration) <= 0}>Save Training</Button>
                </Stack> 
            </DialogContent>      
        </Dialog>
    )
}