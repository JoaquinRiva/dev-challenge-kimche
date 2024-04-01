import React, { useEffect, useState } from "react";
import { Nav } from "./components/Nav/Nav";
import "./App.css";
import Cards from "./components/Cards/Cards";
import { Navigate, Route, Routes } from "react-router-dom";
import { ErrorPage } from "./views/ErrorPage";
import { Detail } from "./views/Detail/Detail";
import { useQuery, gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';
import Filters from "./components/Filters/Filters";


export const App = () => {
  const [searchCharacter, { loading: searchLoading, data: searchData }] = useLazyQuery(GET_CHARACTERS_BY_NAME);
  const { loading: allCharactersLoading, data: allCharactersData } = useQuery(GET_CHARACTERS);
  const [characters, setCharacters] = useState([]);
  const [showAllCharacters, setShowAllCharacters] = useState(true);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    if (!searchLoading && searchData && searchData.characters.results.length > 0) {
      setCharacters(searchData.characters.results);
      setFilteredCharacters(searchData.characters.results);
      setShowAllCharacters(true);
    } else if (!allCharactersLoading && allCharactersData) {
      setCharacters(allCharactersData.characters.results);
      setFilteredCharacters(allCharactersData.characters.results);
      setShowAllCharacters(false);
    }
  }, [searchLoading, searchData, allCharactersLoading, allCharactersData]);

  const searchHandler = (name) => {
    searchCharacter({ variables: { name: name } });
  };

  const handleApplyFilters = (filters) => {
    let filteredResults = characters.filter(character => {
      if (filters.status && character.status !== filters.status)
        return false;
      if (filters.species && character.species !== filters.species)
        return false;
      if (filters.gender && character.gender !== filters.gender)
        return false;
      return true;
    });
    setFilteredCharacters(filteredResults);
  };

  const handleShowAllCharacters = () => {
  setCharacters(allCharactersData.characters.results); 
  setFilteredCharacters(allCharactersData.characters.results); 
  setShowAllCharacters(true);
};

const handleResetFilters = () => {
  setFilteredCharacters(characters); 
  setShowAllCharacters(true); 
};

  return (
    <div className="App">
      <Nav
        searchHandler={searchHandler}
        showAllCharactersHandler={handleShowAllCharacters}
      />
      <Filters onApplyFilters={handleApplyFilters} onResetFilters={handleResetFilters} />
      <Routes>
        <Route path="/home" element={<Cards characters={filteredCharacters} />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Navigate to='home'/>} />
      </Routes>
    </div>
  );
};

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
        image
        status
        species
        gender
      }
    }
  }
`;

const GET_CHARACTERS_BY_NAME = gql`
  query GetCharactersByName($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        image
        status
        species
        gender
      }
    }
  }
`;

