import logo from './logo.svg';
import './App.css';
import NavBar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path = '/' element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
