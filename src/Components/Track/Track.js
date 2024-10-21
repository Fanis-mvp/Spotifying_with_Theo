import React, { useState } from "react";
import styles from "./Track.module.css";

function Track(props) {
  const [audio, setAudio] = useState(null); // Track the audio object
  const [isPlaying, setIsPlaying] = useState(false); // Track whether the preview is playing

  function renderAction() {
    if (props.isRemoval) {
      return (
        <button className={styles["Track-action"]} onClick={passTrackToRemove}>
          -
        </button>
      );
    } else {
      return (
        <button className={styles["Track-action"]} onClick={passTrack}>
          +
        </button>
      );
    }
  }

  const passTrack = () => {
    props.onAdd(props.track);
  };

  const passTrackToRemove = () => {
    props.onRemove(props.track);
  };

  const playPreview = (previewUrl) => {
    if (audio) {
      audio.pause(); // Pause the currently playing preview
      if (isPlaying) {
        setIsPlaying(false); // If already playing, stop it and return
        return;
      }
    }

    // Create a new audio object and play it
    const newAudio = new Audio(previewUrl);
    newAudio.play();
    setAudio(newAudio);
    setIsPlaying(true);

    // When the preview ends, reset the isPlaying state
    newAudio.onended = () => setIsPlaying(false);
  };

  return (
    <div className={styles.Track}>
      <div className={styles["Track-information"]}>
        <h3>{props.track.name}</h3>
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>
      {props.track.previewUrl ? (
        <button className={styles.PlayStopButton} onClick={() => playPreview(props.track.previewUrl)}>
          {isPlaying ? "◼" : "▶"}
        </button>
      ) : (
        <p></p>
      )}
      {renderAction()}
    </div>
  );
}

export default Track;
