import ReactPlayer from 'react-player'
import {Link} from 'react-router-dom'



function VideoCard({description, link, name, id}) {

    const videoID = link.split('v=')[1];
    const thumbnailURL= `https://img.youtube.com/vi/${videoID}/0.jpg`


    return(
        <Link className="p-4 mx-auto border border-blue rounded-3xl" to={`/video/${id}`}>
            <div className=''>
            <img src={thumbnailURL} width='100%' alt="video thumbnail"/>
            </div>
            <div className='px-4 py-2 text-center'>
                <div className="text-lg text-blue font-bold">{name}</div>
                    <p className="text-blue font-semibold mt-2">
                        {description}
                    </p>
            </div>
        </Link>
    )
}


export default VideoCard