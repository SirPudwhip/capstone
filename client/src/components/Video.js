import { useParams } from "react-router-dom"
import ReactPlayer from 'react-player'


function Video() {
    const { id } = useParams()

    return (
      <div>
        <ReactPlayer url ='youtube.com/watch?v=Cwv5m68pFuc'/>
        <h1>Book {id}</h1>
      </div>
    )
} 

export default Video