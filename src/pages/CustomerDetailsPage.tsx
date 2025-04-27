import { Typography } from "@mui/material";
import { Params, useParams } from "react-router-dom";

export default function CustomerDetailsPage() {
    const params = useParams()
    const id = params.id 
    /* const { id } = use.Params()*/
        
    return (
        <div>
            <Typography variant='h4' gutterBottom>Customer Profile</Typography>
            <Typography variant="body1"> Customer ID: {id}</Typography>
        </div>
    )
}