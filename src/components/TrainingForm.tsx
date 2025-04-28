import { Button, Stack, TextField, Typography } from "@mui/material";
import { TrainingPost } from "../api/types";

export default function TrainingForm({ training, onChange, onSubmit,
}: {
    training: TrainingPost;
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
        <Button variant="contained" onClick={onSubmit}>Save Training</Button>
        </Stack>
    )
}