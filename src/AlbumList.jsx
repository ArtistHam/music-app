import React, { useEffect, useState } from 'react';

import bufferToBase64 from "./Helpers/bufferToBase64";

export default function AlbumList({ songsWithTags, openPlayer}) {

  const [albumList, setAlbumList] = useState([]);
  const [activeAlbum, setActiveAlbum] = useState("");

  useEffect(() => {
    let albumList = [];
    songsWithTags.forEach((song, index) => {
      if(albumList.findIndex(album => album.name === song.tag.album) === -1) {
        albumList.push({name: song.tag.album, songs: [song]})
      } else {
        const albumIndex = albumList.findIndex(album => album.name === song.tag.album);
        albumList[albumIndex].songs = [...albumList[albumIndex].songs, song];
      }
    });
    setAlbumList(albumList);
  }, [songsWithTags]);

  return (
    <div className="list-wrapper">
      {albumList.length > 0 && albumList.map((album) => {
        return (
          <>
            <div className="album-item" key={album.name} onClick={() => {setActiveAlbum(album.name)}}>
              <img alt="cover" src={`data:image/png;base64,${bufferToBase64(album.songs[0].tag.image.data)}`}></img>
              <div className="title-wrapper">
                <div>{album.name}</div>
                <div>{album.songs[0].tag.artist}</div>
              </div>
            </div>
            <div className={`songs-dropdown ${activeAlbum === album.name ? "active" : "inactive"}`}>
              {album.songs.map(song => {
                return (
                  <div className="song-item" key={song.tag.title} onClick={openPlayer(song)}>
                  <img alt="cover" src={`data:image/png;base64,${bufferToBase64(song.tag.image.data)}`}></img>
                  <div className="title-wrapper">
                    <div>{song.tag.title}</div>
                    <div>{song.tag.artist} {song.duration}</div>
                  </div>
                </div>
                )
              })}
            </div>
          </>
        )
      })}
    </div>
  );
}