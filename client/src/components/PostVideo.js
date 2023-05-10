import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function PostVideo({modUserData}) {
    const [formData, setFormData] = useState({
        name: "",
        description: "", 
        link: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]:value})
        console.log(formData)
    } 

    const submitMod = (e) => {
        e.preventDefault()
        console.log("form submitted pressed")
        fetch("/videos", {
            method: "POST", 
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                'name': formData['name'],
                'description': formData['description'],
                'link': formData['link']
            })
        })
        .then(response => {
            if (!response.ok){
                throw new Error('bad response from server')
            }
            return response.json()
        })
        .then(console.log)
        .catch(error => {
            console.log('error', error)
        })

        navigate('/profile')
    }

    return (
        <section className="bg-fixed bg-gradient-to-t from-blue to-charcoal-light to-40%">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-blue dark:text-white">
                <img className="object-scale-down h-38 w-60 rounded-3xl" src={require('../images/SumpCity2.png')} alt="logo"/>  
                </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-charcoal-dark dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-blue md:text-2xl dark:text-white">
                    Add A Video
                </h1>
                <form onChange={handleChange} onSubmit = {submitMod} className="space-y-4 md:space-y-6 bg-charcoal-dark"       >
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-blue dark:text-white">Video Name</label>
                        <input  placeholder="input new name" name="name" className="bg-gray-50 border border-gray-300 text-blue sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-blue dark:text-white">Video Description</label>
                        <input placeholder="input new description" name="description" className="bg-gray-50 border border-gray-300 text-blue sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required="" />
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-blue dark:text-white">Video Link</label>
                         <input  placeholder="input new link" name="link"  className="bg-gray-50 border border-gray-300 text-blue sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                    <button type="submit" className="w-full text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Post Video</button>
                </form>
            </div>
            </div>
        </div>
        </section>
    ) 
}

export default PostVideo





{/* <form onChange={handleChange} onSubmit = {submitMod}>
<div class='text-lg font-semibold'>
    Please Post your new Video 
</div>
<div class="mb-6">
    <label>Video Name</label>
    <input placeholder="input new name" name="name"></input>
</div>
<div class="mb-6">
    <label>Video Description</label>
    <input placeholder="input new description" name="description"></input>
</div>
<div class="mb-6">
    <label>Video Link</label>
    <input placeholder="input new link" name="link"></input>
</div>
<button type="submit" class="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"> SUBMIT </button>
</form> */}