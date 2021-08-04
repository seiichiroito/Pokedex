import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/layout/Layout";
import useHttp from "../hooks/use-http";
import Hero from "../components/Pokedex/Hero";
import SearchForm from "../components/Pokedex/SearchForm";
import PokemonList from "../components/Pokedex/PokemonList";
import ToTopButton from "../components/UI/ToTopButton";

// const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";
const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=300";
// const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=494";

const Pokedex = () => {
  const { sendRequest } = useHttp();
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState(null);
  const [searchInput, setsearchInput] = useState("");
  const [sort, setSort] = useState(null);

  const fetchPokemons = useCallback(async () => {
    const localData = JSON.parse(localStorage.getItem("allPokemons"));

    if (localData) {
      setAllPokemons(localData);
      return;
    }
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
        image: {
          default: data.sprites.other.dream_world.front_default,
          icon: data.sprites.front_default,
          art_work: data.sprites.other["official-artwork"].front_default,
        },
        height: data.height,
        weight: data.weight,
        abilities: data.abilities,
      };
    });

    localStorage.setItem("allPokemons", JSON.stringify(pokemonsData));

    setAllPokemons(pokemonsData);
  }, [sendRequest]);

  const modifyPokemons = useCallback(
    (pokemons) => {
      let updatedPokemons = [...pokemons];

      // Sort
      switch (sort) {
        case "lowest":
          updatedPokemons.sort((a, b) => {
            return a.id - b.id;
          });
          break;
        case "highest":
          updatedPokemons.sort((a, b) => {
            return b.id - a.id;
          });
          break;
        case "asc":
          updatedPokemons.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          break;
        case "desc":
          updatedPokemons.sort((a, b) => {
            if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
            return 0;
          });
          break;

        default:
          break;
      }

      // Default Value
      if (!selectedTypes && !searchInput && !sort) {
        updatedPokemons = updatedPokemons.slice(0, 20);
      }
      // Filter by Type
      if (selectedTypes) {
        updatedPokemons = updatedPokemons.filter((pokemon) => {
          return pokemon.types.some(({ type }) => {
            return selectedTypes.has(type.name);
          });
        });
      }

      // Filter by Search Input
      if (searchInput) {
        updatedPokemons = updatedPokemons.filter((pokemon) => {
          // Search by case insensitive
          return pokemon.name.includes(searchInput.toLowerCase());
        });
      }

      return updatedPokemons;
    },
    [searchInput, selectedTypes, sort]
  );

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  useEffect(() => {
    const result = modifyPokemons(allPokemons);
    setFilteredPokemons(result);
  }, [allPokemons, modifyPokemons]);

  const searchInputChangeHandler = (inputValue) => {
    setsearchInput(inputValue);
  };

  const searchTypeChangeHandler = (selectedTypes) => {
    setSelectedTypes(selectedTypes);
  };

  const seeAllHandler = () => {
    setFilteredPokemons(allPokemons);
  };

  const changeSortHandler = (sort) => {
    setSort(sort);
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
          onSortChange={changeSortHandler}
        />

        {/* Move to Top Button */}
        <ToTopButton />
      </div>
    </Layout>
  );
};

export default Pokedex;
