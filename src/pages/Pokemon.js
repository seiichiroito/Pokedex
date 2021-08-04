import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Layout from "../components/layout/Layout";
import useHttp from "../hooks/use-http";
import bgImage from "../assets/image/bg.svg";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState();
  const { name } = useParams();
  const { sendRequest } = useHttp();

  const fetchPokemon = useCallback(async () => {
    const data = await sendRequest({
      url: `${API_URL}/${name}`,
    });

    const pokemonData = {
      id: data.id,
      name: data.name,
      types: data.types,
      image: {
        default: data.sprites.other.dream_world.front_default,
        icon: data.sprites.front_default,
        art_work: data.sprites.other["official-artwork"].front_default,
      },
      height: data.height,
      weight: data.weight,
      abilities: data.abilities,
    };

    setPokemon(pokemonData);
  }, [name, sendRequest]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  if (!pokemon) {
    return <Layout>loading</Layout>;
  }

  return (
    <Layout>
      <PokemonStyled types={pokemon.types}>
        {/* Name and back link */}
        <div className="container">
          <header className="header">
            <div className="nav">
              <button>
                <span className="icon">&lt;</span> #898 Calyrex
              </button>
              <button>
                #898 Calyrex <span className="icon">&gt;</span>
              </button>
            </div>
            <div className="title">
              <h1>{pokemon.name}</h1>
              <span className="id">
                #{pokemon.id.toString().padStart(3, "0")}
              </span>
            </div>
          </header>

          <main className="content">
            {/* Image and Status */}
            <div className="content__left">
              <di className="content__image">
                <img src={pokemon.image.default} alt={pokemon.name} />
              </di>
              <div>stats</div>
            </div>
            <div className="content__right">
              <div className="content__card">
                <div>
                  <h3>Height</h3>
                  <p>{(pokemon.height * 0.1).toPrecision(2)} m</p>
                </div>
                <div>
                  <h3>Weight</h3>
                  <p>{(pokemon.weight * 0.1).toPrecision(2)} kg</p>
                </div>
                <div className="abilities">
                  <h3>Abilities</h3>
                  {pokemon.abilities.map(({ ability }) => {
                    return <p>{ability.name}</p>;
                  })}
                </div>
              </div>
              <div className="types">
                <div className="types__contain">
                  <p>Type</p>
                  <div>
                    <button>Grass</button>
                    <button>Poison</button>
                  </div>
                </div>
                <div className="types__weaknesses">
                  <p>Weaknesses</p>
                  <div>
                    <button>Fire</button>
                    <button>Psychic</button>
                    <button>Flying</button>
                    <button>Ice</button>
                  </div>
                </div>
              </div>
            </div>
          </main>
          {/* Evolutions and Other info */}
          <footer className="footer"></footer>
        </div>
      </PokemonStyled>
    </Layout>
  );
};

const PokemonStyled = styled.div`
  background-image: url(${bgImage});
  .container {
    max-width: 1048px;
    margin: 2rem auto;
    box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);

    background-color: rgba(255, 255, 255, 0.3);
  }
  /* HEADER */
  .header {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(4, 25px);
    .nav {
      grid-column: 1 / -1;
      grid-row: 1 / span 4;
      display: flex;
      gap: 0.5rem;
    }
    button {
      flex: 1;
      background-color: #999;
      padding: 1rem 3rem;
      border: none;
      display: flex;
      color: #fff;
      font-size: 1.25rem;
      gap: 0.5rem;
      .icon {
        border: 1px solid #fff;
        border-radius: 100px;
        display: flex;
        padding: 0 0.25rem;
      }
      &:nth-of-type(1) {
      }
      &:nth-of-type(2) {
        justify-content: flex-end;
      }
      &:hover {
        color: #30a7d7;
        .icon {
          border-color: #30a7d7;
        }
      }
    }
    .title {
      background-color: #fff;
      grid-column: 2 / span 6;
      grid-row: 3 / span 2;

      display: flex;
      gap: 0.5rem;
      justify-content: center;
      align-items: center;
      position: relative;
      font-size: 2rem;

      span {
        color: #999;
      }
      &::before,
      &:after {
        content: "";
        position: absolute;
        border: 25px solid transparent;
      }
      &::before {
        border-top-color: #999;
        border-left-color: #999;
        top: 0;
        left: 0;
      }

      &::after {
        border-top-color: #999;
        border-right-color: #999;
        top: 0;
        right: 0;
      }
    }

    h1 {
      font-size: 2rem;
      font-weight: normal;
      text-transform: capitalize;
    }
  }

  /* CONTENT */
  .content {
    display: grid;
    gap: 1rem;
    grid-template-columns: 3fr 5fr;
    padding: 2rem;

    &__image {
      background-color: #ddd;
      display: flex;
      justify-content: center;
      aspect-ratio: 1 / 1;
      padding: 2rem;
    }

    &__card {
      background-color: #30a7d7;
      padding: 1rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 2rem;
      border-radius: 10px;
      h3 {
        color: #fff;
        font-weight: normal;
        font-size: 1rem;
        line-height: 1.5;
        border-bottom: 1px solid;
        display: inline-block;
      }
      p {
        margin-top: 0.5rem;
        line-height: 1.5;
      }
      .abilities {
        p {
          text-transform: capitalize;
        }
      }
    }

    * {
      /* outline: 1px solid #ddd; */
    }
  }
`;

export default Pokemon;
