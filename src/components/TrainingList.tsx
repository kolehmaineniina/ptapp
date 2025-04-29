import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Training } from "../api/types";

export default function TrainingsList({trainings, onDelete: onDelete} : {
    trainings: Training[];
    onDelete: (url:string) => void;
}) {

    return (
        <div>
            <List>
            {trainings.map((training: Training) => (
                <ListItem 
                key={training.id}
                secondaryAction={
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
        </List>
        </div>
        
    )
}