import styled from "styled-components";
import bgImage from "../../assets/image/bg.svg";
import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemons, seeAllHandler, onSortChange }) => {
  const clickCardHandler = (pokemonName) => {
    // console.log(pokemonName);
  };

  const changeSortHandler = (e) => {
    onSortChange(e.target.value);
  };
  return (
    <PokemonListStyled>
      <div className="container">
        <div className="header">
          <p>計 {pokemons.length}匹</p>
          <div>
            <label htmlFor="sort">Sort</label>

            <select name="pets" id="sort" onChange={changeSortHandler}>
              <option value="">Sort results by...</option>
              <option value="lowest">Lowest Number</option>
              <option value="highest">Highest Number</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
        </div>
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
    .header {
      grid-column: 1 / -1;
      display: flex;
      justify-content: space-between;
      div {
        display: flex;
        gap: 1rem;
        align-items: center;
      }
      select {
        padding: 0.25rem 1rem;
      }
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
      color: ${({ theme }) => theme.water};
      background-color: #efefef;
      &:hover {
        background-color: ${({ theme }) => theme.water};
        color: #f5f5f5;
      }
    }
  }
`;
export default PokemonList;
