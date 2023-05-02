import {Outlet, Link, json} from 'react-router-dom'
import {useEffect, useState} from 'react'

function ProfileVidCard({video, changeProp}) {
    let {id, name, description, link} = video

    const [showMod, setShowMod] = useState(false)
    const [cardName, setCardName] = useState(name)
    const [cardDescription, setCardDescription] = useState(description)
    const [cardLink, setCardLink] = useState(link)
    

    let handleMod = (e) => {
        console.log(`modify clicked for ${video.id}`)
        setShowMod(!showMod)
    }

    let handleDel = (e) => {
        console.log('delete clicked')

        fetch(`/videos/${video.id}`, {
            method: 'DELETE',
        })
        .then(r => r.json())
        .then(console.log)
        changeProp()
    }
    
    const submitMod = (e) => {
        e.preventDefault()

        if (e.target.name.value !== '') {
            name = e.target.name.value
        }
        if (e.target.description.value !== '') {
            description = e.target.description.value
        }
        if (e.target.link.value !== '') {
            link = e.target.link.value
        }

        fetch(`/videos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' :'application/json'
            },
            body: JSON.stringify({
                'name': name, 
                'description': description, 
                'link' : link
            })
        })
        .then(res => {
            if (!res.ok){
                throw new Error('Something went wrong')
            }
            return res.json();
        })
        .then(data => {
            setCardName(data.name) 
            console.log(data.name)
            setCardDescription(data.description) 
            setCardLink(data.link) 
        })
        e.target.reset()
        changeProp()
        setShowMod(!showMod)
    }
    

    return(

    <div>
        {
            !showMod ? 
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{cardName}</div>
                    <p class="text-gray-700 text-base">
                    {cardDescription}
                    </p>
                    <p class="text-gray-700 text-base">
                        LINK: 
                        {cardLink}
                    </p>
                    <button onClick={handleMod}class="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"> modify </button>
                    <button onClick={handleDel}class="block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-lightRed"> delete </button>
                </div>
            </div>

            :
            
            <form onSubmit = {submitMod}>
                <div class='text-lg font-semibold'>
                    Please Update Your Video: 
                </div>
                <div class="mb-6">
                    <label>{cardName}</label>
                    <input placeholder="input new name" name="name"></input>
                </div>
                <div class="mb-6">
                    <label>{cardDescription}</label>
                    <input placeholder="input new description" name="description"></input>
                </div>
                <div class="mb-6">
                    <label>{cardLink}</label>
                    <input placeholder="input new link" name="link"></input>
                </div>
                <button type="submit" class="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"> modify </button>
            </form>

        }
    
    </div>
    )
}

export default ProfileVidCard