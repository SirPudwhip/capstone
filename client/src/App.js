import logo from './logo.svg';
import './App.css';
import NavBar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Video from './components/Video'
import Profile from './components/Profile'
import NewNav from './components/NewNav'
import PostVideo from './components/PostVideo'
import Search from './components/Search'
import Creator from './components/Creator'
import Updates from './components/Updates'
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
    <div className='bg-charcoal-dark'>
        {/* <NavBar/> */}
        <NewNav />
        <h1>{stateValue}</h1>
        <Routes>
            <Route path = '/' element={<Home />} />
            <Route path = '/login' element={<Login />} />
            <Route path = '/signup' element={<Signup />} />
            <Route path = '/video/:id' element={<Video />}/>
            <Route path = '/profile' element={<Profile />}/>
            <Route path = '/postvideo' element={<PostVideo />} />
            <Route path ='/search/' element= {<Search />}/>
            <Route path ='/creator' element= {<Creator />}/>
            <Route path ='/updates' element= {<Updates />}/>
        </Routes>
    </div>
  );
}

export default App;
