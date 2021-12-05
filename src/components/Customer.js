import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import AddCustomer from './edit/AddCustomer';
import EditCustomer from './edit/EditCustomer';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import TrainingToCustomer from './edit/TrainingtoCustomer';



export default function Customer(props) {

    const [openAdd, setOpenAdd] = React.useState(false);
    const [trainings, setTrainings] = React.useState([]);

    React.useEffect(() => console.log(props.customers, trainings),[props.customers, trainings]);
    React.useEffect(() => {
        props.getCustomers()
        getTrainings();},[]);

    const columns = [
        {field:'firstname', sortable: true, filter: true},
        {field:'lastname', sortable: true, filter: true},
        {field:'streetaddress', sortable: true, filter: true},
        {field:'postcode', sortable: true, filter: true},
        {field:'email', sortable: true, filter: true},
        {field:'city', sortable: true, filter: true},
        {cellRendererFramework: params => <TrainingToCustomer currCustomer={params.data} url={props.url} trainings={trainings}/>},
        {cellRendererFramework: params => <EditCustomer customer={params.data} getCustomers={props.getCustomers}/> },
        {cellRendererFramework: params => <Button onClick={() => deleteCustomer(params.data)} color="error"><DeleteIcon /></Button>}
    ]

    const deleteCustomer = (customer) => {

        window.confirm('are you sure?') ? 
        axios.delete(customer.links[0].href)
        .then(() => props.getCustomers())
        .catch(err => console.error(err))
        : console.log('delete succesfull');
    }

    const getTrainings = () => {
        axios.get(`${props.url}gettrainings`)
        .then(res =>{
          setTrainings(res.data);
          console.log(trainings);} )
        .catch(err => console.error(err));
      }

    return(

        <div className="ag-theme-alpine" style={{height:600, padding:50,margin:'auto' }}>
            <Button variant="contained"  onClick={() => setOpenAdd(true)} style={{marginBottom:10}}>Add a Customer</Button>
        
            <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
            <DialogContent>
                <AddCustomer getCustomers={props.getCustomers} setOpen={setOpenAdd}/>
            </DialogContent>
            </Dialog>
            <AgGridReact
            style={{width:'100%', height:'100%'}}
            rowData={props.customers}
            columnDefs={columns}
            ></AgGridReact>
        </div>

    )    
}