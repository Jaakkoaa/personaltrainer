import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';
import Training from './components/Training';
import Calendar from './components/Calendar';
import React from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button } from '@mui/material';
import Statistics from './components/statistics/Statistics';
function App() {
  
  const url = 'https://customerrest.herokuapp.com/';
  
  const [customers, setCustomer] = React.useState([]);
  const [trainings, setTrainings] = React.useState([]);
  const [buttonIndex, setButtonIndex] = React.useState(1);

  const getTrainings = () => {
    axios.get(`${url}/api/trainings`)
    .then(res =>{
      setTrainings(res.data.content);
      console.log(trainings);} )
    .catch(err => console.error(err));
  }

  const getCustomers = () => {
      axios.get(`${url}/api/customers`)
      .then(res => setCustomer(res.data.content))
      .catch(err => console.error(err));
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => setButtonIndex(1)}> Training </Button>
          <Button color="inherit" onClick={() => setButtonIndex(2)}> Customers </Button>
          <Button color="inherit" onClick={() => setButtonIndex(3)}> Calendar </Button>
          <Button color="inherit" onClick={() => setButtonIndex(4)}> Statistics </Button>
        </Toolbar>
      </AppBar>
      {buttonIndex===1 && <Training getTrainings={getTrainings} trainings={trainings} />}
      {buttonIndex===2 && <Customer getCustomers={getCustomers} customers={customers} url={url}/>}
      {buttonIndex===3 && <Calendar trainings={trainings} getTrainings={getTrainings}/>}
      {buttonIndex===4 && <Statistics trainings={trainings}/>}
    </div>
  );
}

export default App;
