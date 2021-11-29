import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button } from '@mui/material';
import AddCustomer from './edit/AddCustomer';
import EditCustomer from './edit/EditCustomer';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';


export default function Customer(props) {

    const [open, setOpen] = React.useState(false);

    React.useEffect(() => console.log(props.customers),[props.customers]);
    React.useEffect(() => props.getCustomers(),[]);

    const columns = [
        {field:'firstname', sortable: true, filter: true},
        {field:'lastname', sortable: true, filter: true},
        {field:'streetaddress', sortable: true, filter: true},
        {field:'postcode', sortable: true, filter: true},
        {field:'email', sortable: true, filter: true},
        {field:'city', sortable: true, filter: true},
        {cellRendererFramework: params => <EditCustomer customer={params.data} getCustomers={props.getCustomers}/> },
        {cellRendererFramework: params => <Button onClick={() => deleteCustomer(params.data)}>Delete</Button>}
    ]

    const deleteCustomer = (customer) => {

        window.confirm('are you sure?') ? 
        axios.delete(customer.links[0].href)
        .then(() => props.getCustomers())
        .catch(err => console.error(err))
        : console.log('delete succesfull');
    }

    return(

        <div className="ag-theme-alpine" style={{height:400,width:'60%', padding:50,margin:'auto' }}>
            <Button variant="contained"  onClick={() => setOpen(true)} style={{marginBottom:10}}>Add a Customer</Button>
        
            <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogContent>
                <AddCustomer getCustomers={props.getCustomers} setOpen={setOpen}/>
            </DialogContent>
            </Dialog>

            <AgGridReact
            rowData={props.customers}
            columnDefs={columns}
            ></AgGridReact>
        </div>

    )    
}