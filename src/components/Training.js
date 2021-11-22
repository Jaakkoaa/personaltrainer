import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function Training(props) {

    React.useEffect(() => console.log(props.trainings),[props.trainings]);
    React.useEffect(() => props.getTrainings(),[]);    

    const columns = [
        {field:'activity', sortable: true, filter: true},
        {field:'date', sortable: true, filter: true},
        {field:'duration', sortable: true, filter: true},
    ]

    return(
        <div className="ag-theme-alpine" style={{height:400,width:'60%', padding:50,margin:'auto' }}>
            <AgGridReact
            rowData={props.trainings}
            columnDefs={columns}
            ></AgGridReact>
        </div>
    )

}