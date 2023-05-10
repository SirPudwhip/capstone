import React, {useRef, useState} from 'react';
import ReactPlayer from "react-player";


function NewVid() {

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


 return (
  <div className='vid_player'>
    <ReactPlayer
    ref={playerRef}
    url="https://www.youtube.com/watch?v=PBDTTOJvS1Y"
    playing={isPlaying}
    onProgress={handleProgress}
    />
    <div className="controls">
      <button onClick={togglePlay}>{isPlaying? 'Pause' : 'Play'}</button>
      <input 
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

  </div>
 );
}

export default NewVid