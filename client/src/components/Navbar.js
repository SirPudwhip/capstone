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
        <header aria-label="Site Header" class="bg-charcoal-dark">
        <div
          class="mx-auto flex h-20 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
          >
        <Link to="/">
        <span class="sr-only">Home</span>
        <img src={require('../images/SlumpCity.png')} />
        </Link>

    <div class="flex flex-1 bg-charcoal-dark items-center justify-end md:justify-between">
      <nav aria-label="Site Nav" class="hidden md:block flex flex-row">
        <ul class="flex justify-between gap-6 text-sm">
          <li>
            <Link class="text-blue font-medium text-lg transition hover:text-gray-500/75" to="/video">
              Search
            </Link>
          </li>

          <li>
            <a class="text-blue font-medium text-lg transition hover:text-gray-500/75" href="/">
              Content Creator Info
            </a>
          </li>
          <li>
            <a class="text-blue font-medium text-lg transition hover:text-gray-500/75" href="/">
              Developer Updates
            </a>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-4">
        <div class="sm:flex sm:gap-4">

        {
        stateValue ? 

          <a class="block rounded-md bg-blue px-5 py-2.5 text-sm font-medium text-white transition "
          onClick = {handleClick} href='/'>
            Logout
          </a>
       : 
        <Link
            class="block rounded-md bg-blue px-5 py-2.5 text-sm font-medium text-white transition "
          to = '/login'>
            Login
        </Link> 
        
        }

        {
          stateValue ? 
          <Link to='/profile' class="block rounded-md bg-violet px-5 py-2.5 text-sm font-medium text-white transition ">
            Profile
          </Link>

          :

          <Link to='/signup' class="bg-violet hidden rounded-md px-5 py-2.5 text-sm font-medium sm:block">
          Sign Up
          </Link>
        }

        </div>

        <button
          class="block rounded p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
        >
          <span class="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
  <Outlet />
</header>
)}


export default NavBar