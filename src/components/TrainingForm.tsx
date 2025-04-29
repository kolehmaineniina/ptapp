import { Button, Stack, TextField } from "@mui/material";
import { TrainingToPost } from "../api/types";

export default function TrainingForm({ training, onChange, onSubmit,
}: {
    training: TrainingToPost;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}) {
    return (
        <Stack spacing={2}>
        <TextField
            label="Date"
            type="text"
            name="date"
            value={training.date}
            onChange={onChange}
            fullWidth
        />
        <TextField
            label="Activity"
            type="text"
            name="activity"
            value={training.activity}
            onChange={onChange}
            fullWidth
        />
        <TextField
            label="Duration (mins)"
            type="number"
            name="duration"
            value={training.duration}
            onChange={onChange}
            fullWidth
        />
        <Button variant="contained" onClick={onSubmit} disabled={!training.date || !training.activity || Number(training.duration) <= 0}>Save Training</Button>
        </Stack>
    )
}