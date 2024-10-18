import React, { useState } from "react";
import styles from "./App.module.css";
import SearchResults from '../SearchResults/SearchResults';
import Playlist from "../Playlist/Playlist";

function App() {
  const [searchResults, setSearchResults] = useState([
    {
      name: "Search example name 1",
      artist: "Search example artist 1",
      album: "Search example album 1",
      id: 1
    },
    {
      name: "Search example name 2",
      artist: "Search example artist 2",
      album: "Search example album 2",
      id: 2
    }]
  );

  const [playlistName, setPlaylistName] = useState('PlaylistYeah');
  const [playlistTracks, setPlayilistTracks] = useState([
    {
    name: "Track example name 1",
    artist: "Track example artist 1",
    album: "Track example album 1",
    id: 1
  },
  {
    name: "Track example name 2",
    artist: "Track example artist 2",
    album: "Track example album 2",
    id: 2
  }]);

  const addTrack = (track) => {
    const existingTrack = playlistTracks.find(t => t.id === track.id)
    const newTrack = playlistTracks.concat(track)
    if (existingTrack) {
      console.log('Track already exists!')
    } else {
      setPlayilistTracks(newTrack);
    }
  };

  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        {/* <!-- Add a SearchBar component --> */}

        <div className={styles["App-playlist"]}>
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults userSearchResults={searchResults} onAdd={addTrack} />
          {/* <!-- Add a Playlist component --> */}
          <Playlist playlistName={playlistName} playlistTracks={playlistTracks} />
        </div>
      </div>
    </div>
  );
}

export default App;
