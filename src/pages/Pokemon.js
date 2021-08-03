import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/layout/Layout";
import useHttp from "../hooks/use-http";

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

  return <Layout>{pokemon?.name}</Layout>;
};

export default Pokemon;
