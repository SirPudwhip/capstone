import {Outlet, Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useState} from 'react'

function NewNav() {

  const [isOpen, setIsOpen]=useState(false)

  const stateValue = useSelector(s => {
    return s
  })

  console.log(stateValue)

  let handleClick = () => {
    console.log("clicked remove!")

    fetch(`/logout`, {
        method: 'DELETE',
      })
    }

  const handleMenu = (e) => {
    setIsOpen(!isOpen)
  }

    return(
      <nav className='relative flex items-center justify-between container h-20 mx-auto bg-charcoal-dark'>
        <div >
          <Link  to="/">
            <span className="sr-only">Home</span>
            <img src={require('../images/SlumpCity.png')} />
          </Link>
        </div>
        <div className="hidden md:flex">
          <Link className=" p-2 text-blue font-medium text-lg mx-6 hover:rounded-full hover:border-blue border-2 border-transparent px-4 " to="/video">
            Search
          </Link>
          <Link className="p-2 text-blue font-medium text-lg mx-6 hover:rounded-full hover:border-blue border-2 border-transparent px-4 " to="/video">
            Content Creator Info
          </Link>
          <Link className="p-2 text-blue font-medium text-lg mx-6 hover:rounded-full hover:border-blue border-2 border-transparent px-4" to="/video">
            Developer Updates
          </Link>
        </div>
        <div className='flex items-center gap-4'>
        {
        stateValue ? 

          <a className="block rounded-md bg-blue px-5 py-2.5 text-sm font-medium text-white transition "
          onClick = {handleClick} href='/'>
            Logout
          </a>
       : 
        <Link
            className="block rounded-md bg-blue px-5 py-2.5 text-sm font-medium text-white transition "
          to = '/login'>
            Login
        </Link> 
        
        }

        {
          stateValue ? 
          <Link to='/profile' className="block rounded-md bg-violet px-5 py-2.5 text-sm font-medium text-white transition ">
            Profile
          </Link>

          :

          <Link to='/signup' className="bg-violet hidden rounded-md px-5 py-2.5 text-sm font-medium sm:block">
          Sign Up
          </Link>
        }
          <button id='menu-btn' onClick={handleMenu} className={isOpen? 'md:hidden open block hamburger focus:outline-none': 'md:hidden block hamburger focus:outline-none'} >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
        <div className={isOpen? 'absolute flex flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md' : 'hidden'}>
          <div className='absolute flex flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md'>
          <Link className=" p-2 text-blue font-medium text-lg mx-6 hover:rounded-full hover:border-blue border-2 border-transparent px-4 " to="/video">
            Search
          </Link>
          <Link className="p-2 text-blue font-medium text-lg mx-6 hover:rounded-full hover:border-blue border-2 border-transparent px-4 " to="/video">
            Content Creator Info
          </Link>
          <Link className="p-2 text-blue font-medium text-lg mx-6 hover:rounded-full hover:border-blue border-2 border-transparent px-4" to="/video">
            Developer Updates
          </Link> 
          </div>
        </div>
      </nav>
)}


export default NewNav