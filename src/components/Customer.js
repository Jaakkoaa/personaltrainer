import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function Customer(props) {

   
    React.useEffect(() => console.log(props.customers),[props.customers]);
    React.useEffect(() => props.getCustomers(),[]);

    const columns = [
        {field:'firstname', sortable: true, filter: true},
        {field:'lastname', sortable: true, filter: true},
        {field:'city', sortable: true, filter: true},
        {field:'email', sortable: true, filter: true}
    ]

    return(

        <div className="ag-theme-alpine" style={{height:400,width:'60%', padding:50,margin:'auto' }}>
    
            <AgGridReact
            rowData={props.customers}
            columnDefs={columns}
            ></AgGridReact>
        </div>

    )    
}