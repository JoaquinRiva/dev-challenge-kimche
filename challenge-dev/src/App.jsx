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
import { useLocation } from "react-router-dom";

export const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { search } = useLocation();
  const [searchCharacter, { loading: searchLoading, data: searchData }] = useLazyQuery(GET_CHARACTERS_BY_NAME);
  const { loading, data } = useQuery(GET_CHARACTERS, {
    variables: { page: currentPage },
  });

  const [allCharacters, setAllCharacters] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [pageNumberInput, setPageNumberInput] = useState('');

  useEffect(() => {
    if (!searchLoading && searchData && searchData.characters.results.length > 0) {
      setCharacters(searchData.characters.results);
      setFilteredCharacters(searchData.characters.results);
      setTotalPages(searchData.characters.info.pages);
    }
  }, [searchLoading, searchData]);

  useEffect(() => {
    if (!loading && data) {
      setAllCharacters(data.characters.results);
      setCharacters(data.characters.results);
      setFilteredCharacters(data.characters.results);
      setTotalPages(data.characters.info.pages);
    }
  }, [loading, data]);

  useEffect(() => {
    if (search === "") {
      setCurrentPage(1);
    }
  }, [search]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handlePageChange = () => {
    let page = parseInt(pageNumberInput);
    if (isNaN(page) || page < 1) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }
    setCurrentPage(page);
  };

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
    setCharacters(allCharacters);
    setFilteredCharacters(allCharacters);
  };

  const handleResetFilters = () => {
    setFilteredCharacters(characters);
  };

  return (
    <div className="App">
      <Nav
        searchHandler={searchHandler}
        showAllCharactersHandler={handleShowAllCharacters}
      />
      <Filters onApplyFilters={handleApplyFilters} onResetFilters={handleResetFilters} />
      <Routes>
  <Route path="/home" element={
    <>
      <Cards characters={filteredCharacters} />
      {!loading && filteredCharacters.length > 0 && (
        <div className="pagination-container">
          <div className="pagination">
            <button className="buttonPag" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
            <span className="spanPag">{currentPage}</span>
            <button className="buttonPag" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
      )}
    </>
  } />
  <Route path="/detail/:id" element={<Detail />} />
  <Route path="*" element={<ErrorPage />} />
  <Route path="/" element={<Navigate to='home'/>} />
</Routes>
      
    </div>
  );
      };

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        pages
        next
      }
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
      info {
        pages
      }
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
