import { useQuery } from "@tanstack/react-query";
import { groupBy, sumBy } from 'lodash';
import { getAllTrainings } from "../api/trainings";
import { Training } from "../types";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
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
        <Box sx={{width: '90%', height: '90%', fontFamily: 'monospace', m: 2, p:2}}>
            <Card>
                <CardHeader
                    title={
                        <Typography textTransform="uppercase" variant="h6">
                        Dashboard
                        </Typography>
                    }
                    subheader={
                        <Typography textTransform="uppercase" variant="caption">
                        Activities
                        </Typography>
                    }
                />
                <CardContent>
                <BarChart width={500} height={400} data={totals}>
                    <XAxis fontWeight="600" dataKey="activity" />
                    <YAxis />
                    <Bar 
                        dataKey="minutes"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart >
                <Typography variant="caption">
                    Training minutes by Activity
                </Typography>    
            </CardContent>  
            </Card>
        </Box>
    )

}

