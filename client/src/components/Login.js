import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const theAction = {type: 'squeak/change'}

    const handleChange = (e) => {
        let name = e.target.name    
        let value = e.target.value
        setFormData({...formData, [name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch("/login", {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'email': formData.email,
                'password': formData.password,
            })
           
        })
        .then((response) => {
            if(response.status==200) {
                dispatch(theAction)
            }
            else return response.json();
          })
          .then(console.log);
        
        navigate('/')
          
    }

    return(
        <section class=" bg-fixed bg-gradient-to-t from-blue to-charcoal-light to-40%">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="object-scale-down h-38 w-60 rounded-3xl" src={require('../images/SumpCity2.png')} alt="logo"/>
            </a>
            <div class="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-charcoal-dark dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-blue md:text-2xl">
                        Sign in to your account
                    </h1>
                    <form onChange= {handleChange} onSubmit = {handleSubmit} class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-blue dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" class=" border border-gray-300 font-medium text-blue sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-blue dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class=" border border-gray-300 tfont-medium text-blue sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                  <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-blue focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                </div>
                                <div class="ml-3 text-sm">
                                  <label for="remember" class="text-blue dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="#" class="text-sm text-blue font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>
                        <button type="submit" class="w-full text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        <p class="text-sm font-light text-blue dark:text-gray-400">
                            Don’t have an account yet? <a href="#" class="font-medium text-violet hover:underline dark:text-primary-500">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
    )


}

export default Login