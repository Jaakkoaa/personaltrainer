import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import Paper from '@mui/material/Paper'
import React from "react";

export default function Statistics(props) {

    const [data, setData] = React.useState(props.trainings);

    return(
       <div> 
           <Paper style={{margin:"auto", marginTop:10, width:'80%'}}>
           <BarChart data={data} width={600} height={300} style={{margin:'auto'}}>
                <Bar fill="#8884d8" dataKey="duration" />
                <XAxis dataKey="activity" />
                <YAxis />
            </BarChart>
            </Paper>
       </div>
    )
}