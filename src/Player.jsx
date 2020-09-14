import React, { useState, useCallback, useEffect } from "react";

import bufferToBase64 from "./Helpers/bufferToBase64";

import playIcon from "./Images/play.png";
import pauseIcon from "./Images/pause.png";
import prevIcon from "./Images/previous.png";

export default function Player({showPlayer, currentSong}) {

  const [isPaused, setIsPaused] = useState(true);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState("0:00");

  useEffect(() => {
    setIsPaused(true);
  }, [currentSong]);

  useEffect(() => {
    let timerId;
    if(document.getElementById('player')) {
      timerId = setInterval(() => {
        const currentTime = document.getElementById('player').currentTime
        document.getElementById('play-track').value = currentTime;
        let minutes = Math.floor(currentTime / 60);
        let seconds = `${Math.ceil(currentTime % 60)}`;
        let formatedDuration = `${minutes}:${seconds.length === 2 ? seconds : 0 + seconds}`;
        setCurrentTime(formatedDuration);
      }, 1000);
    };
    return () => {
      clearTimeout(timerId);
    }
  });

  const onStartHandler = useCallback(() => {
    setIsPaused(false);
    document.getElementById('player').play()
  }, []);

  const onPauseHandler = useCallback(() => {
    setIsPaused(true);
    document.getElementById('player').pause()
  }, [])

  const onVolumeChange = useCallback((e) => {
    const { value } = e.target;
    setVolume(value);
    document.getElementById('player').volume = value / 100;
    console.log(document.getElementById('player').currentTime);
    const volume = document.getElementById('volume-measure');
    volume.classList.toggle("showed");
    setTimeout(() => {volume.classList.toggle("showed");}, 2000)
  },[])

  return <div className={`player ${showPlayer ? "" : "inactive"}`}>
    {currentSong && <>
      <img alt="cover" src={`data:image/png;base64,${bufferToBase64(currentSong.tag.image.data)}`}></img>
      <p className="song-title">{currentSong.tag.title}</p>
      <p className="song-artist">{currentSong.tag.artist}</p>
      <div className="play-track-wrapper">
        <audio src={currentSong.song} />
        <audio id="player">
          <source src={currentSong.song} type="audio/mpeg"/>
        </audio>
        <progress title="Sorry you can't rewind audio in this version" id="play-track" max={currentSong.durationInSeconds}/>
        <div className="timestamps-wrapper">
          <span className="current-timestamp">{currentTime}</span>
          <span className="duration">{currentSong.duration}</span>
        </div>
      </div>
      <div className="controls-wrapper">
        <div className="playback-wrapper">
          <button className="control-previous">
          <img alt="previous" src={prevIcon}/>
        </button>
        {isPaused ? <button onClick={onStartHandler} className="control-play">
          <img alt="pause" src={playIcon}/>
        </button> :
        <button onClick={onPauseHandler} className="control-pause">
          <img alt="play" src={pauseIcon}/>
        </button>}
        <button className="control-next">
          <img alt="next" src={prevIcon}/>
        </button>
        </div>
        <div className="volume-wrapper">
          <input
            className="volume-range"
            title={`${volume}%`}
            onChange={onVolumeChange}
            type="range"
            min="0"
            max="100"
            defaultValue="100"
          />
          <div id="volume-measure" className="volume-measure">{volume}%</div>
        </div>
        
      </div>
    </>}
  </div>;
}
