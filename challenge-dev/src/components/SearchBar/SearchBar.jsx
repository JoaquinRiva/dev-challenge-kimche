import React, { useState } from "react";

export default function SearchBar({ searchHandler }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
    setError(""); 
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  const handleClick = () => {
    search();
  };

  const search = () => {
    if (name.trim() === "") {
      setError("Please enter a character name.");
    } else {
      searchHandler(name);
      setName(""); 
    }
  };

  return (
    <div className="searchControls">
      <input
        className="controlsInput"
        type="search"
        placeholder="Insert name"
        onChange={handleChange}
        value={name}
        onKeyDown={handleKeyPress}
      />
      <button className="controls" onClick={handleClick}>
        Search
      </button>
      <br />
      
      {error && <p className="error">{error}</p>}
    </div>
  );
}
