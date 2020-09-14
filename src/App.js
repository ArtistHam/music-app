import React, { useEffect, useState, useCallback } from 'react';
import { parse } from 'id3-parser';
import { fetchFileAsBuffer } from 'id3-parser/lib/universal/helpers';

import SongList from './SongList';
import AlbumList from './AlbumList';
import Player from './Player';
import './App.css';

import song1 from "./Songs/Seether-Pig.mp3";
import song2 from "./Songs/Seether-Truth.mp3";
import song3 from "./Songs/Seether-Pride.mp3";
import song4 from "./Songs/Seether-Remedy.mp3";
import song5 from "./Songs/Seether-Broken.mp3";
import song6 from "./Songs/Seether-69_Tea.mp3";
import song7 from "./Songs/Seether-Needles.mp3";
import song8 from "./Songs/Seether-Fuck_It.mp3";
import song9 from "./Songs/Seether-The_Gift.mp3";
import song10 from "./Songs/Seether-Love_Her.mp3";
import song11 from "./Songs/Seether-Gasoline.mp3";
import song12 from "./Songs/Seether-Fade_Away.mp3";
import song13 from "./Songs/Seether-Fine_Again.mp3";
import song14 from "./Songs/Seether-Sympathetic.mp3";
import song15 from "./Songs/Seether-Driven_Under.mp3";

import {ReactComponent as SongIcon} from "./Images/song.svg";
import {ReactComponent as AlbumIcon} from "./Images/music_album.svg";
import {ReactComponent as DropdownOff} from "./Images/dropdown-off.svg";

const songs = [song1, song2, song3, song4, song5, song6, song7, song8, song9, song10, song11, song12, song13, song14, song15];

function App() {

  const [songsWithTags, setSongWithTags] = useState([]);
  const [activeTab, setActiveTab] = useState("SONGS");
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    songs.forEach((song) => {
      let au = document.createElement('audio');
      au.src = song;
      au.addEventListener('loadedmetadata', function(){
          let duration = au.duration;
          let minutes = Math.floor(duration / 60);
          let seconds = `${Math.ceil(duration % 60)}`;
          let formatedDuration = `${minutes}:${seconds.length === 2 ? seconds : 0 + seconds}`;
          fetchFileAsBuffer(song).then(parse).then(tag => setSongWithTags(s => [...s, {song, tag, duration: formatedDuration, durationInSeconds: duration }]));
      },false);
    });
  }, []);

  useEffect(() => {
    if(songsWithTags.length + 1 >= songs.length) {
      setLoading(false);
    }
  },[songsWithTags])

  const openPlayer = useCallback((songData) => (e) => {
    setShowPlayer(true);
    setCurrentSong(songData);
  }, []);

  return (
    <div className="App">
      <header className="topbar">
        {showPlayer && <button onClick={() => {setShowPlayer(false);setCurrentSong(null)}} className="back-btn">
            <DropdownOff/>
          </button>}
        <div className="app-name">SEETHER MUSIC</div>
      </header>
      <Player showPlayer={showPlayer} currentSong={currentSong}/>
      <main className="main-content">
        { activeTab === "SONGS" ?
        <SongList songsWithTags={songsWithTags} openPlayer={openPlayer} loading={loading} /> :
        <AlbumList songsWithTags={songsWithTags} openPlayer={openPlayer} />}
      </main>
      <footer className="footer">
        <button disabled={loading} onClick={() => {setActiveTab("SONGS")}} className={`${activeTab === "SONGS" ? "active" : ""}`}>
          <SongIcon className="icon"/>
          Songs
        </button>
        <button disabled={loading} onClick={() => {setActiveTab("ALBUMS")}} className={`${activeTab === "ALBUMS" ? "active" : ""}`}>
          <AlbumIcon className="icon"/>
          Albums
        </button>
      </footer>
    </div>
  );
}

export default App;
