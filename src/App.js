import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';
import Training from './components/Training';
import React from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button } from '@mui/material';

function App() {
  
  const url = 'https://customerrest.herokuapp.com/api';
  
  const [customers, setCustomer] = React.useState([]);
  const [trainings, setTrainings] = React.useState([]);
  const [buttonIndex, setButtonIndex] = React.useState(1);

  const getTrainings = () => {
    axios.get(`${url}/trainings`)
    .then(res => setTrainings(res.data.content))
    .catch(err => console.error(err));
  }

  const getCustomers = () => {
      axios.get(`${url}/customers`)
      .then(res => setCustomer(res.data.content))
      .catch(err => console.error(err));
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => setButtonIndex(1)}> Training </Button>
          <Button color="inherit" onClick={() => setButtonIndex(2)}> Customers </Button>
        </Toolbar>
      </AppBar>
      {buttonIndex===1 && <Training getTrainings={getTrainings} trainings={trainings} customers={customers}/>}
      {buttonIndex===2 && <Customer getCustomers={getCustomers} customers={customers} />}
    </div>
  );
}

export default App;
