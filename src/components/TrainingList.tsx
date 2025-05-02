import { List, ListItem, ListItemText, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Training } from "../assets/types";

export default function TrainingsList({trainings, onDelete, showDelete} : {
    trainings: Training[];
    onDelete: (url:string) => void;
    showDelete: boolean;
}) {

    return (
        <div>
            {trainings.length > 1 ? (
            <List>
            {trainings.map((training: Training) => (
                <ListItem 
                key={training.id}
                secondaryAction={
                    showDelete &&
                    <IconButton edge="end" aria-label="delete" onClick={() => onDelete(training._links.self.href)}>
                      <DeleteIcon />
                    </IconButton>
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