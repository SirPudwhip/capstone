import logo from './logo.svg';
import './App.css';
import NavBar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Video from './components/Video'
import Profile from './components/Profile'
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'


function App() {

  const dispatch = useDispatch()
  const theAction = {type: 'squeak/change'}

  useEffect(() => {
    fetch('/checksession')
    .then((response) => {
      if(response.status==200) {
          dispatch(theAction)
      }
      else return response.json();
    })
  },[])

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
            <Route path = '/video/:id' element={<Video />}/>
            <Route path = '/profile' element={<Profile />}/>
        </Routes>
    </div>
  );
}

export default App;
