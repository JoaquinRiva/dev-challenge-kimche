import React, { useState } from "react";
import "./Filters.css"

const Filters = ({ onApplyFilters, onResetFilters }) => {
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");

  const handleApplyFilters = () => {
    
    onApplyFilters({ status, species, gender });
  };

  const handleResetFilters = () => {
   
    setStatus("");
    setSpecies("");
    setGender("");
    
  };

  return (
    <div className="filters">
        <h4 className="h4Filt">Filters:</h4>
      <div>
        <label className="labelFilt" htmlFor="status">Status:</label>
        <select className="select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div>
        <label className="labelFilt" htmlFor="species">Species:</label >
        <select className="select" id="species" value={species} onChange={(e) => setSpecies(e.target.value)}>
          <option value="">All</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          
        </select>
      </div>

      <div>
        <label className="labelFilt" htmlFor="gender">Gender:</label>
        <select className="select" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">Unknown</option>
          
        </select>
      </div>

     
        <button className="controls" onClick={handleApplyFilters}>Apply Filters</button>
        <button className="controls" onClick={handleResetFilters}>Reset Filters</button>
      
    </div>
  );
};

export default Filters;
