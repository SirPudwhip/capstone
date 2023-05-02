import { useEffect, useState } from "react"
import ProfileVidCard from './ProfileVidCard'
import {Outlet, Link} from 'react-router-dom'


function Profile() {

    const [userData, setUserData] = useState({})
    const [mySwitch, setMySwitch] = useState(false)

    console.log(mySwitch)

    useEffect(() => {
        fetch('/profile')
        .then(r=>r.json())
        .then(setUserData)
    },[mySwitch])


    let vidList = null; 
    console.log(userData.videos)

    let changeProp = () => {
        console.log("this is firing")
        setMySwitch(!mySwitch)
    }

    if (userData.videos) {
        vidList = userData.videos.map((vid) => {
            return <ProfileVidCard changeProp={changeProp} key = {vid.id} video = {vid}/>
        })
    } else {
        console.log('not defined')
    }


    return(
        <div>
            <p>{userData.username}</p>
            <p> Here are a list of your videos you wily little rascal! : </p>
            <Link class="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            to='/postvideo'>Post New Video</Link>
            <div class='grid grid-cols-5' >
                {vidList}
            </div>
        </div>
    )
}

export default Profile