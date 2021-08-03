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
      className={`card ${pokemon.types[0].type.name}-card`}
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
  border-radius: 15px;
  box-shadow: 20px 20px 60px #c9c9c9, -20px -20px 60px #ffffff;

  &.grass-card {
    background-color: #9bcc5033;
    .header {
      background: #9bcc5099;
    }
  }
  &.fire-card {
    background-color: #fd7d2433;
    .header {
      background: #fd7d2499;
    }
  }
  &.water-card {
    background-color: #4592c433;
    .header {
      background: #4592c499;
    }
  }
  &.bug-card {
    background-color: #729f3f33;
    .header {
      background: #729f3f99;
    }
  }
  &.normal-card {
    background-color: #a4acaf33;
    .header {
      background: #a4acaf99;
    }
  }
  &.poison-card {
    background-color: #b97fc933;
    .header {
      background: #b97fc999;
    }
  }
  &.electric-card {
    background-color: #eed53533;
    .header {
      background: #eed53599;
    }
  }
  &.ground-card {
    background: linear-gradient(to bottom right, #f7de3f33, #ab984233);
    .header {
      background: linear-gradient(to bottom right, #f7de3f99, #ab984299);
    }
  }
  &.fairy-card {
    background-color: #fdb9e933;
    .header {
      background: #fdb9e999;
    }
  }
  &.rock-card {
    background-color: #a38c2133;
    .header {
      background: #a38c2199;
    }
  }
  &.fighting-card {
    background-color: #d5672333;
    .header {
      background: #d5672399;
    }
  }
  &.psychic-card {
    background-color: #f366b933;
    .header {
      background: #f366b999;
    }
  }
  &.ice-card {
    background-color: #51c4e733;
    .header {
      background: #51c4e799;
    }
  }
  &.ghost-card {
    background-color: #7b62a333;
    .header {
      background: #7b62a399;
    }
  }
  &.dragon-card {
    background: linear-gradient(to bottom right, #53a4cf33, #f16e5733);
    .header {
      background: linear-gradient(to bottom right, #53a4cf99, #f16e5799);
    }
  }
  &:hover {
    animation: ${wobbleHorBottom} 0.8s both;
  }
  .header {
    padding: 2rem;
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
    padding: 0.25rem 1.25rem;
    border-radius: 5px;
    font-size: 0.875rem;
    text-transform: capitalize;
  }
`;

export default PokemonCard;
