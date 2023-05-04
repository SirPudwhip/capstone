import { useParams } from "react-router-dom"
import ReactPlayer from 'react-player'
import {useState, useEffect} from 'react'
import VideoCard from './VideoCard'
import ComObj from './ComObj'
import {useSelector} from 'react-redux'



function Video() {
    const { id } = useParams()
    const [video, setVideo] = useState({})
    const [formData, setFormData] = useState('')

    const stateValue = useSelector(s => {
      return s
    })

    useEffect(() => {
      fetch(`/videos/${id}`)
      .then(r => r.json())
      .then(setVideo)
    }, [])

    let comList = null
    
    if (video.comments) {
        comList = video.comments.map((com) => {
          return <ComObj key = {com.id} comment = {com} />
        })
    } 
    const handleChange = (e) => {
      setFormData(e.target.value)
      console.log(formData)
    }
    const submitCom = (e) => {
      e.preventDefault()
      console.log("comment submitted")
      fetch('/comments', {
        method: "POST",
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          'video_id': id, 
          'content': formData
        })
      })
      .then(r=>r.json())
      .then(data => {
        setVideo({...video, comments: [...video.comments, data]})
      })
    }

    return (
      <div class = 'h-screen bg-gradient-to-t from-blue to-charcoal-light to-40%'>
          <div class='container mx-auto'>
          <ReactPlayer url ={video.link}/>
          <h1 class='font-semibold text-xl text-blue'>{video.name}</h1>
          <h2 class='text-blue font-medium'>{video.description}</h2>
          </div>
                <form hidden = {stateValue? false : true} onChange={handleChange} onSubmit={submitCom}>
                  <label>Add a comment?</label>
                  <input placeholder="input comment here" name="comment"></input>
                </form>
              {comList}

      </div>
    )
} 

export default Video