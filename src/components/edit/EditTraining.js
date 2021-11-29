import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogContent } from "@mui/material";
import axios from "axios";
import React from "react";

export default function EditTraining(props) { 

const [training, setTraining] = React.useState({
    activity:'',
    date:'',
    duration:''
}) 
const [open, setOpen] = React.useState(false);
const inputChanged = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
    console.log(training);
  }

const putTraining = () => {
    console.log(props.training);
    axios.put(props.training.links[0].href, training)
    .then(data => {
        console.log(data);
        props.getTrainings();
    })
    .catch(err => console.error(err))
    setOpen(false);
}

return(
    <>
    <Button onClick={() => setOpen(true)}>Edit</Button>
     <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
        <TextField
        style={{marginTop:10}}
        name="activity"
        value={training.activity}
        onChange={inputChanged}
        label="activity"
        fullWidth
      />
          <TextField
        style={{marginTop:10}}
        name="date"
        value={training.date}
        type="datetime-local"
        onChange={inputChanged}
        label="date"
        fullWidth
      />
          <TextField
        style={{marginTop:10}}
        name="duration"
        value={training.duration}
        onChange={inputChanged}
        label="duration"
        fullWidth
      />


    <Button style={{marginBottom:30}} onClick={putTraining}>Edit</Button>
    </DialogContent>
    </Dialog>
    </>
)
}