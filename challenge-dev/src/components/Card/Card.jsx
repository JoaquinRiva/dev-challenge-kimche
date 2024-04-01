import { Link } from "react-router-dom";

export const Card = ({ character, id,  }) => {

  

  return (
    <div>
      <div className="card">
        <Link to={`/detail/${character.id}`}>
          <img className="imagenPj" src={character.image} alt="" />
        </Link>
        <div className="halfcard">
          <h2 className="namecard">{character.name}</h2>
          <h2>{character.species}</h2>
        </div>
      </div>
    </div>
  );
};





export default (Card);
