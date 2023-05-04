import {Outlet, Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

function NavBar() {

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

    return(
        <header aria-label="Site Header" className="bg-charcoal-dark">
        <div
          className="mx-auto flex h-20 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
          >
        <Link to="/">
        <span className="sr-only">Home</span>
        <img src={require('../images/SlumpCity.png')} />
        </Link>

    <div className="flex flex-1 bg-charcoal-dark items-center justify-end md:justify-between">
      <nav aria-label="Site Nav" className="hidden md:block flex flex-row">
        <ul className="flex justify-between gap-6 text-sm">
          <li>
            <Link className="text-blue font-medium text-lg transition hover:text-gray-500/75" to="/video">
              Search
            </Link>
          </li>

          <li>
            <a className="text-blue font-medium text-lg transition hover:text-gray-500/75" href="/">
              Content Creator Info
            </a>
          </li>
          <li>
            <a className="text-blue font-medium text-lg transition hover:text-gray-500/75" href="/">
              Developer Updates
            </a>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">

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

        </div>
      </div>
    </div>
  </div>
  <Outlet />
</header>
)}


export default NavBar