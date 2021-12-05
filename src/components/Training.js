import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import { Button } from '@mui/material';
import EditTraining from './edit/EditTraining';
import AddTraining from './edit/AddTraining';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import axios from 'axios';
import dayjs from 'dayjs';

export default function Training(props) {

    React.useEffect(() => console.log(props.trainings),[props.trainings]);
    React.useEffect(() => props.getTrainings(),[]);   

    const deleteTraining = (training) => {
        window.confirm('are you sure?') ? 
        axios.delete(training.links[0].href)
        .then(() => props.getTrainings())
        .catch(err => console.error(err))
        : console.log('delete was succesfull');
    }

    const columns = [
        {field:'activity', sortable: true, filter: true},
        {field: 'date', sortable: true, filter: true, valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY')},
        {field:'duration', sortable: true, filter: true},
        {cellRendererFramework: params => <EditTraining training={params.data} getTrainings={props.getTrainings}/> },
        {cellRendererFramework: params => <Button onClick={() => deleteTraining(params.data)}>Delete</Button>}
    ]

    return(
        <div className="ag-theme-alpine" style={{height:400,width:'55%', padding:50,margin:'auto' }}>
        <AddTraining getTrainings={props.getTrainings}/>
            <AgGridReact
            rowData={props.trainings}
            columnDefs={columns}
            ></AgGridReact>
        </div>
    )

}