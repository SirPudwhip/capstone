import {Outlet, Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

function NewNav() {

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
      <nav class='relative container h-20 mx-auto bg-charcoal-dark'>
        <div class='flex items-center justify-between'>
          <Link class = 'pt-2' to="/">
            <span class="sr-only">Home</span>
            <img src={require('../images/SlumpCity.png')} />
          </Link>
          <div>
            <div class = 'flex justify-center space-x-6'>
              <Link class="text-blue font-medium text-lg " to="/video">
                Search
              </Link>
              <Link class="text-blue font-medium text-lg " to="/video">
                Content Creator Info
              </Link>
              <Link class="text-blue font-medium text-lg " to="/video">
                Developer Updates
              </Link>
            </div>
          </div>
        </div>
      </nav>
)}


export default NewNav