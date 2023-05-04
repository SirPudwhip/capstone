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
        return <VideoCard key = {v.id} name = {v.name} description={v.description} id={v.id} link={v.link}/>
    })
    
    return(
        <div className=' bg-fixed bg-gradient-to-t from-blue to-charcoal-light to-40% '>
            <div className = 'grid grid-cols-3 mx-6 gap-8' >
                {homeList}
            </div>
        </div>
    ) 
}

export default Home