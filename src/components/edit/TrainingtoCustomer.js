import React from 'react';
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import dayjs from 'dayjs';

export default function TrainingToCustomer(props) {

    React.useEffect(() => console.log(props.trainings),[props.trainings]);
    React.useEffect(() => props.getTrainings(),[]);   

    const columns = [
        {field:'activity', sortable: true, filter: true},
        {field: 'date', sortable: true, filter: true, valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY')},
        {field:'duration', sortable: true, filter: true},
    ]

    return(
        <div className="ag-theme-alpine" style={{height:400,width:600 }}>
            <AgGridReact
            rowData={props.trainings}
            columnDefs={columns}
            ></AgGridReact>
        </div>
    )

}