import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Detail.css'

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      origin {
        name
      }
      image
    }
  }
`;

export const Detail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    if (!loading && data) {
      if (data.character) {
        setCharacter(data.character);
      } else {
        window.alert("No hay personajes con ese ID");
      }
    }
  }, [loading, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="detailCard">
      {character && (
        <>
          <img className="imagenDetail" src={character.image} alt="" />
          <h2>{character.name}</h2>
          <h2>{character.status}</h2>
          <h2>{character.species}</h2>
          <h2>{character.origin?.name}</h2>
        </>
      )}
    </div>
  );
};
