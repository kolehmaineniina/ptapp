import { useQuery } from "@tanstack/react-query";
import { groupBy, sumBy } from 'lodash';
import { getAllTrainings } from "../api/trainings";
import { Training } from "../types";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

export default function TrainingsStats() {
    
    const { data } = useQuery({
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
        <Box sx={{display: "flex", justifyContent: "center", width: '100%', height: '100%'}}>
            <Card sx={{mx: 5, height: "60%", width: "80%", fontFamily: 'sans-serif', fontSize:'smaller'}}>
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
                <BarChart width={500} height={500} data={totals}>
                    <XAxis fontWeight="600" dataKey="activity" />
                    <YAxis />
                    <Bar 
                        fill="#dc143C"
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

