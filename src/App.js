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
import { Routes, Route, useNavigate} from "react-router-dom";

function App() {
  
  const navigate = useNavigate();
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
          <Button color="inherit" onClick={() => navigate('/')}> Training </Button>
          <Button color="inherit" onClick={() => navigate('/customers')}> Customers </Button>
          <Button color="inherit" onClick={() => navigate('/calendar')}> Calendar </Button>
          <Button color="inherit" onClick={() => navigate('/statistics')}> Statistics </Button>
        </Toolbar>
      </AppBar>
      
    <Routes>
      <Route path="/" element={<Training getTrainings={getTrainings} trainings={trainings} />} />
      <Route path="/customers" element={<Customer getCustomers={getCustomers} customers={customers} url={url}/>} />
      <Route path="/calendar" element={<Calendar trainings={trainings} getTrainings={getTrainings}/>} />
      <Route path="/statistics" element={ <Statistics trainings={trainings}/>}/>
    </Routes>
    </div>
  );
}

export default App;
