import { unstable_HistoryRouter, useParams } from "react-router-dom"
import ReactPlayer from 'react-player'
import {useState, useEffect} from 'react'
import VideoCard from './VideoCard'
import ComObj from './ComObj'
import "../App.css";
import {useRef} from 'react'
import {useSelector} from 'react-redux'



function Video() {
    const { id } = useParams()
    const [video, setVideo] = useState({})
    const [formData, setFormData] = useState('')
    const [isHidden, setIsHidden] = useState(true)
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [seeking, setSeeking] = useState(false);

    const togglePlay = () => {
    setIsPlaying((prevState) => !prevState)
    };

    const handleProgress = (progress) => {
    if (!seeking){
      setPlayed(progress.played);
    }
    };

    const handleSeekMouseDown = () => {
    setSeeking(true)
    }

    const handleSeekChange = (e) => {
    const seekTime = parseFloat(e.target.value);
    setPlayed(seekTime)
    };

    const handleSeekMouseUp = () => {
    setSeeking(false)
    playerRef.current.seekTo(played)
    }

    const stateValue = useSelector(s => {
      return s
    })

    const handleShow = () => {
      setIsHidden(!isHidden)
    }

    useEffect(() => {
      fetch(`/videos/${id}`)
      .then(r => r.json())
      .then(setVideo)
    }, [])

    let comList = null
    let poster = null
    let uList = null

    console.log(video)

    if (video.user) {
      console.log('turkey')
      console.log(video.user.username)
      poster = video.user.username
    }

    if (video.unique_associated_users){
      uList = video.unique_associated_users.map((obj)=> {
        return `${obj.username} |  `
      })
    }

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
      e.target.reset()
    }

    return (
      <div className = 'min-h-screen bg-gradient-to-t from-blue to-charcoal-light to-40%'>
        <div className='flex justify-center'>
          <div className="text-center video">
            <ReactPlayer    
            ref={playerRef}
            url={video.link}
            playing={isPlaying}
            onProgress={handleProgress}
            />
            <div className="flex controls">
              <button className= "mr-2" onClick={togglePlay}>{isPlaying? 'Pause' : 'Play'}</button>
              <input 
              className = "w-full"
              type='range'
              min={0}
              max={1}
              step='any'
              value={played}
              onMouseDown={handleSeekMouseDown}
              onMouseUp={handleSeekMouseUp}
              onChange={handleSeekChange}
              />
            </div>
            <h1 className='font-bold text-xl text-blue'>{video.name}</h1>
            <button className="rounded-md bg-blue mt-2.5 px-5 py-2.5 font-medium text-white" onClick={handleShow}>show more</button>
            <div className = {isHidden? 'hidden' : ''}>
              <h1 className='text-md text-blue mx-auto justify-center max-w-xl'>{video.description}</h1>
              <h1 className='text-lg font-semibold text-blue mx-auto pt-4 justify-center max-w-xl'>Posted By:{poster} </h1>
            </div>
            <div className='bg-charcoal-dark rounded-3xl border border-gray'>
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-blue md:text-2xl">
                        Comments: 
                    </h1>
                    <form className="space-y-4 md:space-y-6" hidden = {stateValue? false : true} onChange={handleChange} onSubmit={submitCom}>
                        <div>
                          <h1 class="text-xl font-bold leading-tight tracking-tight text-blue md:text-2xl">
                          Leave a comment: 
                          </h1>
                        </div>
                        <div>
                            <input name="password" id="comment" placeholder="" class=" border border-gray-300 tfont-medium text-blue sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <button type="submit" class="w-full text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Post Comment</button>
                    </form>
                </div>
            <h1>{comList}</h1>
            </div>
          </div>
        </div>
        <h1>all the people that posted on this video: {uList}</h1>
      </div>
    )
} 

export default Video


{/* <div className='container mx-auto'>
<ReactPlayer url ={video.link}/>
<h1 className='font-semibold text-xl text-blue'>{video.name}</h1>
<h2 className='text-blue font-medium'>{video.description}</h2>
</div>

            <form className="text-blue justify-center" hidden = {stateValue? false : true} onChange={handleChange} onSubmit={submitCom}>
              <label>Add a comment?</label>
              <input placeholder="input comment here" name="comment"></input>
            </form>
      
     */}