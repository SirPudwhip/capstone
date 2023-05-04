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
        .then(r => r.json())
        .then(console.log)

        navigate('/profile')
    }

    return (
        <form onChange={handleChange} onSubmit = {submitMod}>
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
        <button type="submit" class="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"> modify </button>
    </form>
    ) 
}

export default PostVideo