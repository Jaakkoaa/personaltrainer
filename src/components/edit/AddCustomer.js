import React from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios';

export default function AddCustomer(props) {

    const [customer, setCustomer] = React.useState({}) 

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
        console.log(customer);
      }

    const postCustomer = () => {
        axios.post('https://customerrest.herokuapp.com/api/customers', customer)
        .then(data => {
            console.log(data);
            props.getCustomers();
        })
        .catch(err => console.error(err))
        props.setOpen(false);
    }

    return(
        <>
            <TextField
            name="firstname"
            value={customer.firstname}
            onChange={inputChanged}
            label="firstname"
            fullWidth
          />
              <TextField
            name="lastname"
            value={customer.lastname}
            onChange={inputChanged}
            label="lastname"
            fullWidth
          />
              <TextField
            name="email"
            value={customer.email}
            onChange={inputChanged}
            label="email"
            fullWidth
          />
            <TextField
            name="streetaddress"
            value={customer.streetaddress}
            onChange={inputChanged}
            label="streetaddress"
            fullWidth
          />
            <TextField
            name="city"
            value={customer.city}
            onChange={inputChanged}
            label="city"
            fullWidth
          />
            <TextField
            name="postcode"
            value={customer.postcode}
            onChange={inputChanged}
            label="postcode"
            fullWidth
          />
              <TextField
            name="phone"
            value={customer.phone}
            onChange={inputChanged}
            label="phone"
            fullWidth
          />

        <Button style={{marginBottom:30}} onClick={postCustomer}>Add</Button>
        </>
    )
}