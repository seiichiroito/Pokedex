import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { rgba } from "polished";

import Layout from "../components/layout/Layout";
import useHttp from "../hooks/use-http";
import bgImage from "../assets/image/bg.svg";
import Cube from "../components/UI/Cube";
const API_URL = "https://pokeapi.co/api/v2/pokemon";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState();
  const { name } = useParams();
  const { sendRequest } = useHttp();

  const fetchPokemon = useCallback(async () => {
    const responseData = await sendRequest({
      url: `${API_URL}/${name}`,
    });

    const pokemonData = {
      id: responseData.id,
      name: responseData.name,
      types: responseData.types,
      image: responseData.sprites.other.dream_world.front_default,
      hoverImage: responseData.sprites.other["official-artwork"].front_default,
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
      <PokemonStyled types={pokemon?.types}>
        {/* Name and back link */}
        <div className="container">
          <header className="header">
            <h1>{pokemon?.name}</h1>
            <span className="id">
              #{pokemon?.id.toString().padStart(3, "0")}
            </span>
          </header>

          {/* Image and Status */}
          <main className="content">
            <Cube pokemon={pokemon}/>
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
  height: 100vh;
  .container {
    max-width: 1048px;
    margin: 2rem auto;
    padding: 0 2rem;
    box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);

    background: ${({ theme, types }) => {
      const typeColor = theme[types[0].type.name];
      if (typeof typeColor === "string") {
        return rgba(typeColor, theme.alpha.sm);
      } else {
        return `linear-gradient(to bottom right, ${rgba(
          typeColor[0],
          theme.alpha.sm
        )}, ${rgba(typeColor[1], theme.alpha.sm)})`;
      }
    }};
  }
  /* HEADER */
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h1 {
    text-align: center;
    font-size: 2rem;
    padding: 1rem;
    font-weight: normal;
    text-transform: capitalize;
  }
  .id {
    color: #555;
    font-size: 2rem;
  }

  /* CONTENT */
`;

export default Pokemon;
