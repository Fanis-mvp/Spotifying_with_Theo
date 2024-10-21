import React, { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar(props) {
  const [term, setTerm] = useState("");

  const passTerm = (e) => {
    props.onSearch(term);    
  };

  const handleTermChange = ({ target }) => {
    setTerm(target.value);
  };

  return (
    <div className={styles.SearchBar}>
      <input
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleTermChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            passTerm();
          }
        }}
      />
      <button className={styles.SearchButton} onClick={passTerm}>
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;
