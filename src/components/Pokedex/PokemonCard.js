import { useState } from "react";
import styled, { keyframes } from "styled-components";

const PokemonCard = ({ pokemon, onClickCard }) => {
  const [hoverPokemon, setHoverPokemon] = useState(null);

  const hoverHandler = (e) => {
    const name = e.target.closest(".card").id;
    setHoverPokemon(name);
  };
  const hoverLeaveHandler = () => {
    setHoverPokemon(null);
  };

  const clickHandler = () => {
    onClickCard(pokemon.name);
  };

  return (
    <PokemonCardStyled
      onMouseEnter={hoverHandler}
      onMouseLeave={hoverLeaveHandler}
      className="card"
      id={pokemon.name}
      onClick={clickHandler}
    >
      <div className="header">
        {hoverPokemon === pokemon.name ? (
          <img src={pokemon.hoverImage} alt={pokemon.name} />
        ) : (
          <img src={pokemon.image} alt={pokemon.name} />
        )}
      </div>
      <div className="detail">
        <p className="id">#{pokemon.id.toString().padStart(3, "0")}</p>
        <p className="name">{pokemon.name}</p>
        <ul>
          {pokemon.types.map((type) => {
            return (
              <li key={type.type.name} className={type.type.name}>
                {type.type.name}
              </li>
            );
          })}
        </ul>
      </div>
    </PokemonCardStyled>
  );
};

const wobbleHorBottom = keyframes`
    0%,
  100% {
    transform: translateX(0%);
    transform-origin: 50% 50%;
  }
  15% {
    transform: translateX(-30px) rotate(-4.8deg);
  }
  30% {
    transform: translateX(15px) rotate(3.6deg);
  }
  45% {
    transform: translateX(-15px) rotate(-2.4deg);
  }
  60% {
    transform: translateX(9px) rotate(1.2deg);
  }
  75% {
    transform: translateX(-6px) rotate(-0.6deg);
  }
`;

const PokemonCardStyled = styled.div`
  /* background-color: #555; */
  background-color: #fff;
  box-shadow: 0 5px 10px 3px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  &:hover {
    animation: ${wobbleHorBottom} 0.8s both;
  }
  .header {
    padding: 2rem;
    background-color: #eee;
    display: flex;
    justify-content: center;
    aspect-ratio: 1;
    border-radius: 10px 10px 0 0;
  }

  .detail {
    padding: 0.5rem;
    display: grid;
    gap: 1rem;
  }
  .id {
    color: #999;
    font-size: 0.875rem;
  }
  .name {
    text-transform: capitalize;
    font-weight: bold;
    font-size: 1.125rem;
  }
  ul {
    list-style: none;
    display: flex;
    gap: 1rem;
    /* flex-wrap: wrap; */
  }
  li {
    padding: 0.25rem 1.5rem;
    border-radius: 5px;
    font-size: 0.875rem;
    text-transform: capitalize;
  }
`;

export default PokemonCard;
