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
import Statistics from './components/Statistics';


function App() {
  
  const url = 'https://customerrest.herokuapp.com/';
  
  const [customers, setCustomer] = React.useState([]);
  const [trainings, setTrainings] = React.useState([]);
  const [appBarIndex, setAppBarIndex] = React.useState(0);
  const [trainingsWC, setTrainingsWC] = React.useState([]);

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

  const getTrainingsWithCustomers = () => {
    axios.get(`${url}gettrainings`)
    .then(res => setTrainingsWC(res.data))
    .catch(err => console.error(err));
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => setAppBarIndex(0)}> Training </Button>
          <Button color="inherit" onClick={() => setAppBarIndex(1)}> Customers </Button>
          <Button color="inherit" onClick={() => setAppBarIndex(2)}> Calendar </Button>
          <Button color="inherit" onClick={() => setAppBarIndex(3)}> Statistics </Button>
        </Toolbar>
      </AppBar>
    {appBarIndex === 0 &&<Training getTrainings={getTrainings} trainings={trainings} />} 
    {appBarIndex === 1 &&<Customer getCustomers={getCustomers} customers={customers} url={url} getTrainingsWithCustomers={getTrainingsWithCustomers} trainings={trainingsWC}/>}
    {appBarIndex === 2 && <Calendar trainings={trainings} getTrainings={getTrainings}/>}
    {appBarIndex === 3 && <Statistics trainings={trainings} getTrainings={getTrainings}/>}
    </div>
  );
}

export default App;
