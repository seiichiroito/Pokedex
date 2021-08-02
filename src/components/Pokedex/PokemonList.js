import styled from "styled-components";
import bgImage from "../../assets/image/bg.svg";
import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemons, seeAllHandler }) => {
  const clickCardHandler = (pokemonName) => {
    // console.log(pokemonName);
  };
  return (
    <PokemonListStyled>
      <div className="container">
        <p>計 {pokemons.length}匹</p>
        {pokemons.map((pokemon) => {
          return (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onClickCard={clickCardHandler}
            />
          );
        })}
      </div>
      {pokemons.length === 20 && (
        <div className="seeAll">
          <button onClick={seeAllHandler}>See All</button>
        </div>
      )}
    </PokemonListStyled>
  );
};

const PokemonListStyled = styled.div`
  padding: 3rem 0;
  min-height: 50vh;
  background-image: url(${bgImage});
  .container {
    max-width: 1048px;
    margin: 0 auto;
    padding: 0 2rem;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
    > p {
      grid-column: 1 / -1;
    }
  }
  .seeAll {
    padding: 3rem 0 0;
    display: flex;
    justify-content: center;
    button {
      border: none;
      padding: 0.5rem 3rem;
      font-size: 1.125rem;
      border-radius: 5px;
      color: var(--c-water);
      background-color: #efefef;
      &:hover {
        background-color: var(--c-water);
        color: #f5f5f5;
      }
    }
  }
`;
export default PokemonList;
