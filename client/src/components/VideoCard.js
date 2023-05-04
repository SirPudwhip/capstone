import ReactPlayer from 'react-player'
import {Link} from 'react-router-dom'



function VideoCard({description, link, name, id}) {


    return(
        <Link class="p-4 mx-auto border border-blue rounded-3xl" to={`/video/${id}`}>
            <div class=''>
            <ReactPlayer width={'100%'} url ={link}/>
            </div>
            <div class='px-4 py-2 text-center'>
                <div class="text-lg text-blue font-bold">{name}</div>
                    <p class="text-blue font-semibold mt-2">
                        {description}
                    </p>
            </div>
        </Link>
    )
}


export default VideoCard