import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Training } from "../api/types";

export default function TrainingsList({trainings/*, onDeleteTraining*/} : {
    trainings: Training[];
    /*onDeleteTraining: () => void;*/
}) {

    return (
        <div>
            <Typography variant="h5" gutterBottom>Training Sessions</Typography>
            <List>
            {trainings.map((training: Training) => (
                <ListItem key={training.id}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={`${training.activity}`}
                        secondary={`${training.date}: ${training.duration} minutes`}/>
                </ListItem>
            ))}
        </List>
        </div>
        
    )
}