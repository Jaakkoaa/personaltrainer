import { Bar, BarChart, XAxis, YAxis } from "recharts";
import Paper from '@mui/material/Paper'
import React from "react";
import _ from "lodash";

export default function Statistics(props) {

    const [data, setData] = React.useState(props.trainings);

    React.useEffect(() => trainingsToData() ,[]);
    React.useEffect(() => console.log(data) ,[data]);

    const trainingsToData = () => {
        const trainings = _.groupBy(props.trainings, 'activity')
        console.log(trainings);
        setData(Object.keys(trainings).map((training) => ({
            key: training,
            time: _.sumBy(trainings[training], 'duration')
        })))
    }

    return(
       <div> 
           <Paper style={{margin:"auto", marginTop:10, width:'80%'}}>
           <BarChart data={data} width={600} height={300} style={{margin:'auto'}}>
                <Bar fill="#8884d8" dataKey="time" />
                <XAxis dataKey="key" />
                <YAxis />
            </BarChart>
            </Paper>
       </div>
    )
}