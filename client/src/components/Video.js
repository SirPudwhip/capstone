import { useParams } from "react-router-dom"
import ReactPlayer from 'react-player'
import {useState, useEffect} from 'react'
import VideoCard from './VideoCard'
import ComObj from './ComObj'


function Video() {
    const { id } = useParams()
    const [video, setVideo] = useState({})

    useEffect(() => {
      fetch(`/videos/${id}`)
      .then(r => r.json())
      .then(setVideo)
    }, [])

    let comList = null
    console.log(video)
    
    if (video.comments) {
        comList = video.comments.map((com) => {
          return <ComObj key = {com.id} comment = {com} />
        })
    } 

    const submitCom = (e) => {
      e.preventDefault()
      console.log("comment submitted")
      fetch('/comment')
    }

    return (
      <div>
        <ReactPlayer url ={video.link}/>
        <h1>{video.name}</h1>
        <h2>{video.description}</h2>
          <div>

          </div>
          <div >
            {comList}
          </div>
      </div>
    )
} 

export default Video