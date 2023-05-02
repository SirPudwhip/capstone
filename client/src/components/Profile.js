import { useEffect } from "react"


function Profile() {

    useEffect(() => {
        fetch('/profile')
        .then(r=>r.json())
        .then(console.log)
    },[])

    return(
        <>This is the profile page</>
    )
}

export default Profile