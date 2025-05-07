import { useQuery } from "@tanstack/react-query";
import { getAllTrainings } from "../api/trainings";
import { Customer, Training } from "../types";
import { useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { parseISO } from 'date-fns/parseISO';
import { addMinutes } from 'date-fns/addMinutes';
import { enUS } from 'date-fns/locale'
import { Stack, Typography } from "@mui/material";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarDialog from "../components/CalendarDialog";

export default function TrainigsCalendar({customers}: {
    customers: Customer[];
}) {

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
      
    const { data, isLoading, error } = useQuery({
        queryKey: ['all-trainings'],
        queryFn: () => getAllTrainings(),
    });

    const trainings = data?._embedded?.trainings ?? [];

    const events = useMemo(() => {
        
        return trainings.map((training: Training) => {
          const start = parseISO(training.date);
          const end = addMinutes(start, training.duration);
          const customerId = training._links.customer.href.split("/").pop();
          const customer = customers?.find(c => c.id === customerId);
    
          return {
            id: training.id,
            title: training.activity,
            start,
            end,
            resource: {
                customerId: customer?.id,
            }
          };
        });
      }, [trainings]);

      const emptyTraining = {
        date: '',
        activity: '',
        duration: 0,
    };

    const [newTraining, setNewTraining] = useState(emptyTraining);
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                const { name, value } = event.target;
        
                setNewTraining({
                    ...newTraining,
                    [name]: value
                });
            };

    const handleBooking = () => {};
 
    if (isLoading) {
        return <Typography color="info" variant="h6">Loading events</Typography>
    }

    if (error) {
        return <Typography color="error" variant="h6">Failed to load calendar</Typography>
    }
    return (
        <Stack sx={{ height: '80vh', width: '100%', pt: 2}} alignItems='center'>
            <Calendar
                selectable 
                onSelectSlot={(slotInfo) => {
                    setSelectedDate(slotInfo.start);
                    setOpenDialog(true);
                }}
                view={view}
                onView={handleView}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '90%', width: '90%' }}
            />
            <CalendarDialog 
                newTraining={newTraining}
                selectedDate={selectedDate}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSubmit={handleBooking}
                onChange={handleInputChange}
            />
        </Stack>


    );
    
}