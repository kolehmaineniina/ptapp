import { useQuery } from "@tanstack/react-query";
import { groupBy, sumBy } from 'lodash';
import { getAllTrainings } from "../api/trainings";
import { Training } from "../types";
import { Box, Typography } from "@mui/material";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

export default function TrainingsStats() {
    
    const { data, isLoading, error} = useQuery({
            queryKey: ['allTrainings'], 
            queryFn: () => {
                return  getAllTrainings();
            },
        });
    
    const trainings = data?._embedded?.trainings?.map( (t: Training) => ({
        activity: t.activity, duration: t.duration
    }
    )) ?? [];

    const grouped= groupBy(trainings, 'activity');
    const totals = Object.entries(grouped).map((entry) => {
        return {
            activity: entry[0],
            minutes: sumBy(entry[1], 'duration'),
        }
    })

    console.log(totals)
       
    return (
        <Box sx={{width: '100%', height: '100%'}}>
            <Typography variant="h6">This is stats</Typography>
            <BarChart width={600} height={600} data={totals}>
                <XAxis dataKey="activity" />
                <YAxis />
                <Bar dataKey="minutes"/>
            </BarChart>
        </Box>
    )

}

