import { useQuery } from "@tanstack/react-query";
import { getAllTrainings } from "../api/trainings";
import { Training } from "../types";
import { useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { parseISO } from 'date-fns/parseISO';
import { addMinutes } from 'date-fns/addMinutes';
import { enUS } from 'date-fns/locale'
import { Stack } from "@mui/material";
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function TrainigsCalendar() {

    const [view, setView] = useState<View>('month');

    const handleView = (newView: View) => setView(newView);
    const locales = {
        'en-US': enUS, 
    };

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });
      
    const { data } = useQuery({
        queryKey: ['all-trainings'],
        queryFn: () => getAllTrainings(),
    });

    const trainings = data?._embedded?.trainings ?? [];

    const events = useMemo(() => {
        return trainings.map((training: Training) => {
          const start = parseISO(training.date);
          const end = addMinutes(start, training.duration);
    
          return {
            title: training.activity,
            start,
            end,
          };
        });
      }, [trainings]);

    
    return (
        <Stack sx={{ height: '80vh', width: '100%'}} alignItems='center'>
            <Calendar 
                view={view}
                onView={handleView}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%', width: '90%' }}
            />
        </Stack>


    );
    
}