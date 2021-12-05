import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import { Dialog, DialogContent, Button } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import { Paper } from '@mui/material';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import dayjs from 'dayjs';
import axios from 'axios';

export default function TrainingToCustomer(props) {

    const [open, setOpen] = React.useState(false);
    const [openTrainings, setOpenTrainings] = React.useState([]);

    const columns = [
        {field:'activity', sortable: true, filter: true},
        {field: 'date', sortable: true, filter: true, valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY')},
        {field:'duration', sortable: true, filter: true},
        {cellRendererFramework: params => params.data.customer===null ?
        <Button onClick={() => console.log('lisäys')} color="success"><AddCircleIcon/></Button> :
        <Button color="error" onClick={() => console.log('poisto')}><RemoveCircleIcon/></Button>}
    ]


    const DialogOpened = () => {        
        console.log(props.currCustomer);
        findOpenTrainings();
        !open ? setOpen(true) : setOpen(false); 
    }

    const DialogClosed = () => {
        setOpenTrainings([]);
        setOpen(false);
    }

    const findOpenTrainings = () => {
        console.log('finding open trainings')
        for (let i = 0; i < props.trainings.length; i++) {
            if (props.trainings[i].customer === null) {
            console.log(props.trainings[i]);
            setOpenTrainings((openTrainings) => [...openTrainings, props.trainings[i]])}
            else if (`${props.url}api/customers/${props.trainings[i].customer.id}` === props.currCustomer.links[0].href) {
                console.log(props.trainings[i]);
                setOpenTrainings((openTrainings) => [...openTrainings, props.trainings[i]])
            }; 
        } 
        
    }

    return(
        <div >
        <Button color="success" variant="contained" endIcon={<RunCircleIcon/>} onClick={DialogOpened}>trainings</Button>
        <Dialog open={open} onClose={DialogClosed} maxWidth={'xl'}>
            <Paper style={{margin:'auto' ,padding:20}}>
            <DialogContent >
            <Button onClick={DialogClosed} endIcon={<HighlightOffIcon />} color="error"></Button>
                <div className="ag-theme-alpine" style={{height:400,width:800 }}>
                    <AgGridReact
                    rowData={openTrainings}
                    columnDefs={columns}
                    ></AgGridReact>
                </div>
            </DialogContent>
            </Paper>
        </Dialog>
        </div>
    )

}