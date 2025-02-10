import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Track from './components/Track';
import Demo from './components/Demo';
import { useState, useEffect } from 'react';
import Private from './components/Private';
import { UserContext } from '../context/UserContext';
import Diet from './components/Diet';

function App() {
  // if firstly no used is logged in then local storage will look like this --> useState({});
  const [loggedUser, setLogUser] = useState(localStorage.getItem("nutrify-user"));
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("nutrify-user");
    console.log('printing the logged user : ', loggedUser);
    if (user) {
      setLogUser(JSON.parse(user));
    }
  }, [navigate]); // Only run this effect on mount and when navigate changes

  return (
    <UserContext.Provider value={{ loggedUser, setLogUser }}>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/track' element={<Private Components={Track} />} />
        <Route path='/demo' element={<Private Components={Demo} />} />
        <Route path='/diet' element= {<Private Components={Diet} />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
