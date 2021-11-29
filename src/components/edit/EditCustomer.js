import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogContent } from "@mui/material";
import axios from "axios";
import React from "react";

export default function EditCustomer(props) { 

const [customer, setCustomer] = React.useState({}) 
const [open, setOpen] = React.useState(false);
const inputChanged = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value});
    console.log(customer);
  }

const putCustomer = () => {
    console.log(props.customer);
    axios.put(props.customer.links[0].href, customer)
    .then(data => {
        console.log(data);
        props.getCustomers();
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
        name="firstname"
        value={customer.firstname}
        onChange={inputChanged}
        label="firstname"
        fullWidth
      />
          <TextField
        style={{marginTop:10}}
        name="lastname"
        value={customer.lastname}
        onChange={inputChanged}
        label="lastname"
        fullWidth
      />
          <TextField
        style={{marginTop:10}}
        name="email"
        value={customer.email}
        onChange={inputChanged}
        label="email"
        fullWidth
      />
        <TextField
        style={{marginTop:10}}
        name="streetaddress"
        value={customer.streetaddress}
        onChange={inputChanged}
        label="streetaddress"
        fullWidth
      />
        <TextField
        style={{marginTop:10}}
        name="city"
        value={customer.city}
        onChange={inputChanged}
        label="city"
        fullWidth
      />
        <TextField
        style={{marginTop:10}}
        name="postcode"
        value={customer.postcode}
        onChange={inputChanged}
        label="postcode"
        fullWidth
      />
          <TextField
        style={{marginTop:10}}
        name="phone"
        value={customer.phone}
        onChange={inputChanged}
        label="phone"
        fullWidth
      />

    <Button style={{marginBottom:30}} onClick={putCustomer}>Edit</Button>
    </DialogContent>
    </Dialog>
    </>
)
}