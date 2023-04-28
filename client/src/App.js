import logo from './logo.svg';
import './App.css';
import NavBar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import {useEffect} from 'react';
import {useSelector} from 'react-redux'

function App() {

  const stateValue = useSelector(s => {
      return s
  })

  return (
    <div>
        <NavBar />
        <h1>{stateValue}</h1>
        <Routes>
            <Route path = '/' element={<Home />} />
            <Route path = '/login' element={<Login />} />
            <Route path = '/signup' element={<Signup />} />
        </Routes>
    </div>
  );
}

export default App;
