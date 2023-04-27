import logo from './logo.svg';
import './App.css';
import NavBar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import {useSelector, useDispatch} from 'react-redux'

function App() {

  const dispatch = useDispatch()
  const stateValue = useSelector(s => {
      return s
  })

  const theAction = {type: 'squeak/change'}

  const handleClick = () => {
      dispatch(theAction)
  } 

  return (
    <div>
        <NavBar />
        <h1>{stateValue}</h1>
		<button onClick={handleClick}> change </button>
        <Routes>
            <Route path = '/' element={<Home />}/>
            <Route path = '/login' element={<Login />} />
            <Route path = '/signup' element={<Signup />} />
        </Routes>
    </div>
  );
}

export default App;
