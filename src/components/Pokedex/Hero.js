import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { shuffle } from "../../helper.js";

const Hero = ({ pokemons }) => {
  const [hoverPokemon, setHoverPokemon] = useState(null);
  const [shuffledPokemons, setShuffledPokemons] = useState();

  const hoverHandler = (e) => {
    setHoverPokemon(e.target.id || e.target.alt);
  };
  const hoverLeaveHandler = () => {
    setHoverPokemon(null);
  };

  useEffect(() => {
    setShuffledPokemons(shuffle(pokemons));
  }, [pokemons]);

  if (pokemons.length === 0) {
    return (
      <HeroStyled>
        <ul>
          {[...Array(300)].map((_, i) => {
            return <li key={i}></li>;
          })}
        </ul>
      </HeroStyled>
    );
  }
  return (
    <HeroStyled>
      <ul>
        {shuffledPokemons.map((pokemon) => {
          return (
            <li
              key={pokemon.id}
              id={pokemon.name}
              className="item"
              onMouseEnter={hoverHandler}
              onMouseLeave={hoverLeaveHandler}
            >
              {hoverPokemon === pokemon.name && (
                <div className="overlay">
                  <p>{pokemon.name}</p>
                </div>
              )}
              <img src={pokemon.image.default} alt={pokemon.name} />
            </li>
          );
        })}
      </ul>
    </HeroStyled>
  );
};

const moveToLeft = keyframes`
  from {
      transform: translateX(0);
  }

  to {
      transform: translateX(-200%);
  }
`;

const cover = keyframes`
from {
    transform: translateY(100%);
}
to {
    transform: translateY(0);
}
`;
const HeroStyled = styled.div`
  overflow: hidden;

  ul {
    display: grid;
    grid-template-columns: repeat(75, 100px);
    list-style: none;
    animation: ${moveToLeft} 300s linear infinite alternate;
  }
  li {
    aspect-ratio: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;

    background-color: #fff;
    transition: transform 0.5s ease;
    &:hover {
      transform: scale(1.2);
      z-index: 5;
    }
    a {
      display: flex;
    }
  }
  .overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    animation: ${cover} 0.2s ease-in;

    display: flex;
    justify-content: center;
    align-items: center;
    color: #f5f5f5;
    font-size: 1.125rem;
  }
`;

export default Hero;
