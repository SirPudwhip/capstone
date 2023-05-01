import { useEffect, useState} from 'react'
import VideoCard from './VideoCard'

function Home () {

    const [vidList, setVidList] = useState([])

    useEffect(() => {
        fetch('/videos')
        .then(r => r.json())
        .then(res => {
            setVidList(res)
        })
    }, [])

    const homeList = vidList.map((v) => {
        console.log(v)
        return <VideoCard key = {v.id} name = {v.name} description={v.description} id={v.id} link={v.link}/>
    })
    
    return(
        <div class='grid grid-cols-3 gap-3	'>
            {homeList}
        </div>
    ) 
}

export default Home