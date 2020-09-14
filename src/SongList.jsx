import React from 'react';

import bufferToBase64 from "./Helpers/bufferToBase64";
import Loader from "./Images/loader.png";

export default function SongList({songsWithTags, openPlayer}) {

  return (
    <div className="list-wrapper">
      {songsWithTags.length > 0 ? songsWithTags.map((songWithTags) => {
        return (
          <div className="song-item" key={songWithTags.tag.title} onClick={openPlayer(songWithTags)}>
            <img alt="cover" src={`data:image/png;base64,${bufferToBase64(songWithTags.tag.image.data)}`}></img>
            <div className="title-wrapper">
              <div>{songWithTags.tag.title}</div>
              <div>{songWithTags.tag.artist}   {songWithTags.duration}</div>
            </div>
          </div>
        )
      }) :  <div className="loader">
              Please wait, I don't have backend...
              <img alt="pain without backend" src={Loader} />
            </div>}
    </div>
  );
}