import React, { useState } from "react";
import styles from "./App.module.css";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";

function App() {
  const [searchResults, setSearchResults] = useState([
    {
      name: "Search example name 1",
      artist: "Search example artist 1",
      album: "Search example album 1",
      id: 1,
    },
    {
      name: "Search example name 2",
      artist: "Search example artist 2",
      album: "Search example album 2",
      id: 2,
    },
  ]);

  const [playlistName, setPlaylistName] = useState("PlaylistYeah");
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: "Track example name 1",
      artist: "Track example artist 1",
      album: "Track example album 1",
      id: 3,
    },
    {
      name: "Track example name 2",
      artist: "Track example artist 2",
      album: "Track example album 2",
      id: 4,
    },
  ]);

  const addTrack = (track) => {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log("Track already exists!");
    } else {
      setPlaylistTracks(newTrack);
    }
  };

  const removeTrack = (track) => {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  };

  const updatePlayilistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((t) => t.uri);
  };

  const search = (term) => {
    console.log(term);
  };

  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch={search} />
        <div className={styles["App-playlist"]}>
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults userSearchResults={searchResults} onAdd={addTrack} />
          {/* <!-- Add a Playlist component --> */}
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlayilistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
