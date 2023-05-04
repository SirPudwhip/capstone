import ReactPlayer from 'react-player'
import {Link} from 'react-router-dom'



function VideoCard({description, link, name, id}) {


    return(
        <Link className="p-4 mx-auto border border-blue rounded-3xl" to={`/video/${id}`}>
            <div className=''>
            <ReactPlayer width={'100%'} url ={link}/>
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