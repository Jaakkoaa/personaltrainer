import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogContent } from "@mui/material";
import axios from "axios";
import React from "react";

export default function AddTraining(props) { 

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

  const postTraining = () => {
    axios.post('https://customerrest.herokuapp.com/api/trainings', training)
    .then(data => {
        console.log(data);
        props.getTrainings();
    })
    .catch(err => console.error(err))
    setOpen(false);
}


return(
    <>
    <Button style={{marginBottom:10}} variant="contained" onClick={() => setOpen(true)}>create a training</Button>
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


    <Button style={{marginBottom:30}} onClick={postTraining}>Create</Button>
    </DialogContent>
    </Dialog>
    </>
)
}