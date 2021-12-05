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
import TrainingToCustomer from './edit/TrainingtoCustomer';



export default function Customer(props) {

    const [openAdd, setOpenAdd] = React.useState(false);
    const [openTrain, setOpenTrain] = React.useState(false);

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
        {cellRendererFramework: params => <Button onClick={() => deleteCustomer(params.data)}>Delete</Button>},
        {cellRendererFramework: () => <Button onClick={() => setOpenTrain(true)}>trainings</Button>}
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
            <Button variant="contained"  onClick={() => setOpenAdd(true)} style={{marginBottom:10}}>Add a Customer</Button>
        
            <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
            <DialogContent>
                <AddCustomer getCustomers={props.getCustomers} setOpen={setOpenAdd}/>
            </DialogContent>
            </Dialog>

            <Dialog open={openTrain} onClose={() => setOpenTrain(false)}>
            <DialogContent>
            <TrainingToCustomer getTrainings={props.getTrainings} trainings={props.trainings}/>
            </DialogContent>
            </Dialog>

            <AgGridReact
            rowData={props.customers}
            columnDefs={columns}
            ></AgGridReact>
        </div>

    )    
}