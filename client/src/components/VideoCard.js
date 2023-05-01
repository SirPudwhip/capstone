import ReactPlayer from 'react-player'


function VideoCard({description, link, name}) {

    console.log(description, link, name)


    return(
        <div class="max-w-sm rounded border-1 ">
            <div class="px-4 py-8">
            <ReactPlayer url ={link}/>
                <div class="font-bold text-xl mb-2">{name}</div>
                    <p class="text-gray-700 text-base">
                        {description}
                    </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
            </div>
        </div>
    )
}


export default VideoCard