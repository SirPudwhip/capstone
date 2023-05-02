import { useEffect, useState } from "react"
import ProfileVidCard from './ProfileVidCard'


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

    let changeProp = (e) => {
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
            <div class='grid grid-cols-5' >
                {vidList}
            </div>
        </div>
    )
}

export default Profile