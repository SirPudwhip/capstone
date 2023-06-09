import { useEffect, useState } from "react"
import ProfileVidCard from './ProfileVidCard'
import {Outlet, Link} from 'react-router-dom'
import Commented from './Commented'


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
    let commentedVids = null;
    console.log(userData)

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

    if (userData.unique_commented_vids) {
        commentedVids = userData.unique_commented_vids.map((vid) => {
            return <Commented key = {vid.description} video = {vid}/>
        })

    } else {
        console.log('not defined')
    }


    return(
        <div className='min-h-screen bg-gradient-to-t from-blue to-charcoal-light to-40%'>
            <div className=" pb-4 text-center text-blue text-xl font-semibold">
            <p className="mb-4">{userData.username}</p>
            <Link className="bg-blue text-charcoal-dark p-2 rounded-md text-xl hover:bg-orange"
            to='/postvideo'>Post New Video</Link>
            <p className='mt-4'> Here are a list of your videos you wily little rascal! : </p>
            </div>
            <div className='grid grid-cols-6' >
                {vidList}
            </div>
            <div className= "bg-light-gray">
                THESE ARE ALL THE VIDEOS YOU HAVE COMMENTED ON: 
                {commentedVids}
            </div>
        </div>
    )
}

export default Profile