import { Stack, TextField } from "@mui/material";
import { TrainingToPost } from "../types"
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from "dayjs";

export default function TrainingForm({ training, onChange,
}: {
    training: TrainingToPost;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <Stack spacing={2} >
            <DatePicker
                label="Date"
                value={training.date ? dayjs(training.date) : null}
                onChange={(date) => {
                    if (date) {
                        onChange({
                            target: {
                            name: "date",
                            value: date.toISOString(),
                            }
                        } as React.ChangeEvent<HTMLInputElement>);
                    }
                }}
                slotProps={{ textField: { fullWidth: true } }}
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
                label="Minutes"
                type="number"
                name="duration"
                value={training.duration}
                onChange={onChange}
                fullWidth
            />
        </Stack>
    )
}