import { Dialog, DialogContent } from "@mui/material";
import { TrainingToPost } from "../types";
import TrainingForm from "./TrainingForm";
import dayjs from "dayjs";

export default function CalendarDialog({ newTraining, selectedDate, open, onClose, onSubmit, onChange}: {
    newTraining: TrainingToPost;
    selectedDate: Date | null;
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogContent>
                <TrainingForm
                    training={{
                        ...newTraining,
                        date: selectedDate ? dayjs(selectedDate).toISOString() : ""
                    }}
                    onChange={onChange}
                    onSubmit={onSubmit}
                />
            </DialogContent>       
        </Dialog>
    )
}