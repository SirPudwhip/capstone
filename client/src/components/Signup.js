import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Signup() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmation_pw: ""
    })

    const handleChange = (e) => {
        let name = e.target.name    
        let value = e.target.value
        setFormData({...formData, [name]:value})
    }

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch("/createuser", {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'username': formData.username,
                'email': formData.email,
                'password': formData.password,
                'confirmation_pw': formData.confirmation_pw
            })
        })
        alert('you have made your account!')
        e.target.reset()
        navigate('/login')
    }

    return(
        <section className="bg-fixed bg-gradient-to-t from-blue to-charcoal-light to-40%">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-blue dark:text-white">
                <img className="object-scale-down h-38 w-60 rounded-3xl" src={require('../images/SumpCity2.png')} alt="logo"/>  
                </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-charcoal-dark dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-blue md:text-2xl dark:text-white">
                    Create and account
                </h1>
                <form onSubmit={handleSubmit} onChange={handleChange} className="space-y-4 md:space-y-6 bg-charcoal-dark" action="#"       >
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-blue dark:text-white">Username</label>
                        <input type="username" name="username" id="user-signup" className="bg-gray-50 border border-gray-300 text-blue sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Boink Fundlebumps" required="" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-blue dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-blue sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-blue dark:text-white">Password</label>
                         <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-blue sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-blue dark:text-white">Confirm password</label>
                         <input type="confirm-password" name="confirmation_pw" id="confirmation_pw" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-blue sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                    <button type="submit" className="w-full text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                    <p className="text-sm font-light text-gray-500 dark:text-blue">
                        Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-violet">Login here</a>
                    </p>
                </form>
            </div>
            </div>
        </div>
        </section>
    ) 
}

export default Signup