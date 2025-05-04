import { List, ListItem, ListItemText, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Training } from "../types";

export default function TrainingsList({trainings, onDelete, showDelete} : {
    trainings: Training[];
    onDelete: (url:string) => void;
    showDelete: boolean;
}) {

    return (
        <div>
            {trainings.length > 0 ? (
            <List>
            {trainings.map((training: Training) => (
                <ListItem 
                key={training._links.self.href}
                secondaryAction={
                    showDelete &&
                    <Button startIcon={<DeleteIcon />} onClick={() => onDelete(training._links.self.href)} />
                  }
                >
                   <ListItemText
                        primary={`${new Date(training.date).toLocaleDateString()} - ${training.activity}`}
                        secondary={`${training.duration} minutes`}
                    />
            </ListItem>
            ))}
        </List> ) : (
            <Typography variant="body2">No trainings to show</Typography>
        )
}
        </div>
        
    )
}