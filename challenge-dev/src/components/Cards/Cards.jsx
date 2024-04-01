import Card from "../Card/Card";

export default function Cards({ characters}) {
  return (
    <div className="cards-container">
      {
      characters.map((character) => (
        <Card key={character.id} character={character} id={character.id} 
        />
      ))
      }
    </div>
  );
}
