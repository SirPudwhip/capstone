import { useParams } from "react-router-dom"
import ReactPlayer from 'react-player'
import {useState, useEffect} from 'react'
import VideoCard from './VideoCard'


function Video() {
    const { id } = useParams()
    const [video, setVideo] = useState({})

    useEffect(() => {
      fetch(`/videos/${id}`)
      .then(r => r.json())
      .then(setVideo)
    }, [])

    console.log(video)

    return (
      <div>
        <ReactPlayer url ={video.link}/>
        <h1>{video.name}</h1>
        <h2>{video.description}</h2>
      </div>
    )
} 

export default Video