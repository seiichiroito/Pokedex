import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/layout/Layout";
import useHttp from "../hooks/use-http";
import Hero from "../components/Pokedex/Hero";
import SearchForm from "../components/Pokedex/SearchForm";
import PokemonList from "../components/Pokedex/PokemonList";

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

const Pokedex = () => {
  const { sendRequest } = useHttp();
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState(null);

  const fetchPokemons = useCallback(async () => {
    const data = await sendRequest({
      url: API_URL,
    });

    const responses = await Promise.all(
      data.results.map((pokemon) => axios(pokemon.url))
    );

    const pokemonsData = responses.map((response) => {
      const data = response.data;
      return {
        id: data.id,
        name: data.name,
        types: data.types,
        image: data.sprites.other.dream_world.front_default,
        hoverImage: data.sprites.other["official-artwork"].front_default,
      };
    });

    setAllPokemons(pokemonsData);
  }, [sendRequest]);

  const filterByTypes = useCallback(
    (pokemons) => {
      if (!selectedTypes) {
        return pokemons;
      }

      return pokemons.filter((pokemon) => {
        return pokemon.types.some(({ type }) => {
          return selectedTypes.has(type.name);
        });
      });
    },
    [selectedTypes]
  );

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  useEffect(() => {
    setFilteredPokemons(allPokemons.slice(0, 20));
  }, [allPokemons]);

  useEffect(() => {
    if (!selectedTypes) return;

    const result = filterByTypes(allPokemons);
    setFilteredPokemons(result);
  }, [allPokemons, filterByTypes, selectedTypes]);

  const searchInputChangeHandler = (inputValue) => {
    let updatedPokemons;
    if (!inputValue) {
      updatedPokemons = allPokemons.slice(0, 20);
    } else {
      updatedPokemons = allPokemons.filter((pokemon) => {
        return pokemon.name.includes(inputValue);
      });
    }

    setFilteredPokemons(filterByTypes(updatedPokemons));
  };

  const searchTypeChangeHandler = (selectedTypes) => {
    setSelectedTypes(selectedTypes);
  };

  const seeAllHandler = () => {
    setFilteredPokemons(allPokemons);
  };

  return (
    <Layout>
      <div>
        {/* HERO */}
        <Hero pokemons={allPokemons} />

        {/* SEARCH FORM */}
        <SearchForm
          onInputChange={searchInputChangeHandler}
          onTypeChange={searchTypeChangeHandler}
        />

        {/* RESULTS */}
        <PokemonList
          pokemons={filteredPokemons}
          seeAllHandler={seeAllHandler}
        />
      </div>
    </Layout>
  );
};

export default Pokedex;
