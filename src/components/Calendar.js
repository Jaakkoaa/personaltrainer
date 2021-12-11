import React from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';


export default function Calendar(props) {
    
    const [events, setEvents] = React.useState([]);

    React.useEffect(() => {
        trainingsToEvents();
    },[]);
    React.useEffect(() => console.log(events),[events]);


    //fullCalendar lisää 2 h tapahtuman alkuun ja loppuun, koska timezone
    //on itäeurooppa +02:00, en osannut keksiä parempaa korjausta, joten -2 h toimii
    //tällä kertaa. Korjaan myöjemmin jos ehdin 
    //TODO: korjaa timezone
    const trainingsToEvents = () => {
        console.log(props.trainings)
        for (let i = 0; i < props.trainings.length; i++) {
            setEvents(events => [...events, 
                {
                    title: props.trainings[i].activity,
                    start: dayjs(props.trainings[i].date).subtract(2, 'h').$d, 
                    end: dayjs(props.trainings[i].date).add(props.trainings[i].duration, 'm').subtract(2, 'h').$d
                }]) 
        }
    }

    return(
        <Paper style={{width:'60%', padding:20, margin:'auto', marginTop:20}}>
        <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        weekends={true}
        events={events}
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
      />
      </Paper>
    )
}